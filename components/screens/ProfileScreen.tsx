import React, { useMemo } from 'react';
import { UserProgress, Portfolio, Stock, User, Language, languages } from '../../types';
import { tutorialModules, quizzes } from '../../data/mockData';
import { INITIAL_VIRTUAL_CASH } from '../../constants';

const formatIndianCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


interface ProfileScreenProps {
    user: User;
    userProgress: UserProgress;
    portfolio: Portfolio;
    stocks: Stock[];
    onLogout: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const CircularProgress: React.FC<{ progress: number; size?: number; strokeWidth?: number; }> = ({ progress, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="absolute" width={size} height={size}>
                <circle
                    className="text-slate-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-sky-500"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 0.5s ease-in-out',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-white">{`${progress}%`}</span>
        </div>
    );
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, userProgress, portfolio, stocks, onLogout, language, setLanguage, t }) => {

    const portfolioValue = useMemo(() => {
        const holdingsValue = portfolio.holdings.reduce((total, holding) => {
            const stock = stocks.find(s => s.ticker === holding.ticker);
            return total + (stock ? stock.price * holding.quantity : 0);
        }, 0);
        return portfolio.cash + holdingsValue;
    }, [portfolio, stocks]);
    
    const totalSimulatedProfitLoss = portfolioValue - INITIAL_VIRTUAL_CASH;
    const totalSimulatedProfitLossPercent = INITIAL_VIRTUAL_CASH > 0 ? (totalSimulatedProfitLoss / INITIAL_VIRTUAL_CASH) * 100 : 0;
    const learningProgress = Math.round((userProgress.completedTutorials.length / tutorialModules.length) * 100);

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{t('profile_title')}</h1>
                    <p className="text-md text-slate-400">{user.name}</p>
                </div>
                <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    {t('logout')}
                </button>
            </div>


            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                    <CircularProgress progress={learningProgress} />
                </div>
                <div className="flex-grow w-full">
                    <h2 className="text-2xl font-semibold mb-4 text-sky-400">{t('learning_progress')}</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                            <span className="text-slate-300">{t('completed_lessons')}:</span>
                            <span className="font-bold text-lg">{userProgress.completedTutorials.length} / {tutorialModules.length}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                            <span className="text-slate-300">{t('quizzes_taken')}:</span>
                            <span className="font-bold text-lg">{Object.keys(userProgress.quizScores).length} / {quizzes.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-green-400">{t('simulator_performance')}</h2>
                <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-slate-300">{t('portfolio_value')}:</span>
                        <span className="font-bold text-lg">{formatIndianCurrency(portfolioValue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">{t('virtual_cash')}:</span>
                        <span className="font-bold text-lg">{formatIndianCurrency(portfolio.cash)}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-300">{t('total_pl')}:</span>
                        <span className={`font-bold text-lg ${totalSimulatedProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {totalSimulatedProfitLoss >= 0 ? '+' : ''}{formatIndianCurrency(totalSimulatedProfitLoss)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">{t('total_return')}:</span>
                         <span className={`font-bold text-lg ${totalSimulatedProfitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {totalSimulatedProfitLossPercent.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg">
                 <h2 className="text-2xl font-semibold mb-4 text-slate-300">{t('settings')}</h2>
                 <div>
                    <label htmlFor="language-select-profile" className="block text-sm font-medium text-slate-300 mb-1">{t('language')}</label>
                    <select
                        id="language-select-profile"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    >
                        {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;