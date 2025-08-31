import React from 'react';
import { TutorialModule, User } from '../../types';
import { tutorialModules } from '../../data/mockData';

interface HomeScreenProps {
    user: User;
    learningProgress: number;
    onStartTutorial: (moduleId: string) => void;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const ProgressBar: React.FC<{ progress: number, t: (key: string, replacements?: { [key: string]: string | number }) => string }> = ({ progress, t }) => (
    <div className="relative">
        <div className="flex mb-2 items-center justify-between">
            <div>
                <span className="text-xs font-semibold inline-block text-slate-300">
                    {t('learning_journey')}
                </span>
            </div>
            <div className="text-right">
                <span className="text-xs font-semibold inline-block text-sky-400">
                    {t('progress_complete', { progress })}
                </span>
            </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-700">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-500 transition-all duration-500"></div>
        </div>
    </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ user, learningProgress, onStartTutorial, t }) => {
    return (
        <div className="p-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('welcome_user', { name: user.name })}</h1>
                <p className="text-md text-slate-400">{t('welcome_subtitle')}</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
                <ProgressBar progress={learningProgress} t={t} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">{t('key_topics')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tutorialModules.slice(0, 3).map((module) => (
                        <div key={module.id} className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-md hover:bg-slate-700/50 hover:border-sky-500 transition-all cursor-pointer" onClick={() => onStartTutorial(module.id)}>
                            {/* FIX: Property 'title' does not exist on type 'TutorialModule'. Use 'titleKey' with the translation function. */}
                            <h3 className="text-lg font-bold text-sky-400">{t(module.titleKey)}</h3>
                            {/* FIX: Property 'description' does not exist on type 'TutorialModule'. Use 'descriptionKey' with the translation function. */}
                            <p className="text-slate-400 mt-2">{t(module.descriptionKey)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-amber-400">{t('daily_quiz')}</h3>
                <p className="text-slate-400 mt-2">{t('daily_quiz_subtitle')}</p>
            </div>
        </div>
    );
};

export default HomeScreen;