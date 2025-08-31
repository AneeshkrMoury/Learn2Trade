import React, { useState, useEffect, useCallback } from 'react';
import { Tab, UserProgress, Portfolio, Stock, User, Language, languages } from './types';
import { HomeIcon, LearnIcon, TradeIcon, ProfileIcon } from './components/icons';
import HomeScreen from './components/screens/HomeScreen';
import LearnScreen from './components/screens/LearnScreen';
import TradeScreen from './components/screens/TradeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import AuthScreen from './components/screens/AuthScreen';
import useLocalStorageState from './hooks/useLocalStorageState';
import { mockStocks, tutorialModules, generateMarketDepth } from './data/mockData';
import { INITIAL_VIRTUAL_CASH } from './constants';
import { translations } from './translations';

interface TabNavigatorProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    t: (key: string) => string;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, setActiveTab, t }) => {
    const tabs = [
        { name: Tab.Home, icon: HomeIcon, label: t('tab_home') },
        { name: Tab.Learn, icon: LearnIcon, label: t('tab_learn') },
        { name: Tab.Trade, icon: TradeIcon, label: t('tab_trade') },
        { name: Tab.Profile, icon: ProfileIcon, label: t('tab_profile') },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700">
            <div className="flex justify-around max-w-2xl mx-auto">
                 {tabs.map((tab) => {
                    const isActive = activeTab === tab.name;
                    return (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex flex-col items-center justify-center p-3 w-full text-xs transition-all duration-200 ${
                                isActive ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <div className={`relative p-2 rounded-full transition-all duration-200 ${isActive ? 'bg-sky-500/10' : ''}`}>
                                <tab.icon className="w-6 h-6" />
                                {isActive && <div className="absolute -top-1 -right-1 w-2 h-2 bg-sky-400 rounded-full"></div>}
                            </div>
                            <span className={`mt-1 font-semibold ${isActive ? 'text-sky-400' : ''}`}>{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [user, setUser] = useLocalStorageState<User | null>('invetSmart-user', null);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
    const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
    const [language, setLanguage] = useLocalStorageState<Language>('invetSmart-language', 'en');

    const [userProgress, setUserProgress] = useLocalStorageState<UserProgress>('invetSmart-progress', {
        completedTutorials: [],
        quizScores: {},
    });

    const [portfolio, setPortfolio] = useLocalStorageState<Portfolio>('invetSmart-portfolio', {
        cash: INITIAL_VIRTUAL_CASH,
        holdings: [],
    });

    const [stocks, setStocks] = useState<Stock[]>(mockStocks);
    
    const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
        const langDict = translations[language] || translations.en;
        let translation = langDict[key as keyof typeof langDict] || key;
    
        if (replacements) {
            Object.entries(replacements).forEach(([placeholder, value]) => {
                translation = translation.replace(`{${placeholder}}`, String(value));
            });
        }
        return translation;
    }, [language]);


    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prevStocks => 
                prevStocks.map(stock => {
                    const change = (Math.random() - 0.5) * (stock.price * 0.005);
                    const newPrice = parseFloat((stock.price + change).toFixed(2));
                    
                    const newHistory = [...stock.history.slice(1), { date: new Date().toISOString().split('T')[0], price: newPrice }];
                    
                    return { 
                        ...stock, 
                        price: newPrice,
                        high: Math.max(stock.high, newPrice),
                        low: Math.min(stock.low, newPrice),
                        volume: stock.volume + Math.floor(Math.random() * 1000),
                        marketDepth: generateMarketDepth(newPrice),
                        history: newHistory 
                    };
                })
            );
        }, 2000); // Update prices every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const handleStartTutorial = (moduleId: string) => {
        setActiveTutorial(moduleId);
        setActiveTab(Tab.Learn);
    };
    
    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
        // Optional: Reset progress and portfolio on logout
        // setUserProgress({ completedTutorials: [], quizScores: {} });
        // setPortfolio({ cash: INITIAL_VIRTUAL_CASH, holdings: [] });
    };

    const learningProgress = tutorialModules.length > 0 ? Math.round((userProgress.completedTutorials.length / tutorialModules.length) * 100) : 0;
    
    if (!user) {
        return <AuthScreen onLogin={handleLogin} language={language} setLanguage={setLanguage} t={t} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case Tab.Home:
                return <HomeScreen user={user} learningProgress={learningProgress} onStartTutorial={handleStartTutorial} t={t} />;
            case Tab.Learn:
                return <LearnScreen userProgress={userProgress} setUserProgress={setUserProgress} activeTutorial={activeTutorial} setActiveTutorial={setActiveTutorial} t={t}/>;
            case Tab.Trade:
                return <TradeScreen stocks={stocks} portfolio={portfolio} setPortfolio={setPortfolio} t={t} />;
            case Tab.Profile:
                return <ProfileScreen user={user} userProgress={userProgress} portfolio={portfolio} stocks={stocks} onLogout={handleLogout} language={language} setLanguage={setLanguage} t={t} />;
            default:
                return <HomeScreen user={user} learningProgress={learningProgress} onStartTutorial={handleStartTutorial} t={t} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <main className="pb-24 max-w-4xl mx-auto">
                {renderContent()}
            </main>
            <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
        </div>
    );
};

export default App;