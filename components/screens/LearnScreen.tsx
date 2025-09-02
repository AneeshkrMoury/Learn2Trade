import React, { useState, useCallback } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { TutorialModule, Quiz, UserProgress, ContentBlock } from '../../types';
import { tutorialModules, quizzes } from '../../data/mockData';
import { LightbulbIcon, ChecklistIcon, ChartBarIcon } from '../icons';

<<<<<<< HEAD
=======

>>>>>>> 5821c01 (Update project: Vite config, global CSS, Netlify support)
type TFunction = (key: string, replacements?: { [key: string]: string | number }) => string;


const AnalogyBlock: React.FC<{ textKeys: string[], t: TFunction }> = ({ textKeys, t }) => (
    <div className="bg-amber-500/10 border-l-4 border-amber-400 p-4 rounded-r-lg my-4">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightbulbIcon className="h-6 w-6 text-amber-400" />
            </div>
            <div className="ml-3">
                <h3 className="font-bold text-amber-300">{t('analogy')}</h3>
                <div className="mt-2 text-sm text-slate-300 space-y-2">
                    {textKeys.map((key) => <p key={key}>{t(key)}</p>)}
                </div>
            </div>
        </div>
    </div>
);

const TakeawaysBlock: React.FC<{ itemKeys: string[], t: TFunction }> = ({ itemKeys, t }) => (
    <div className="bg-sky-500/10 border-l-4 border-sky-400 p-4 rounded-r-lg my-4">
        <div className="flex">
            <div className="flex-shrink-0">
                <ChecklistIcon className="h-6 w-6 text-sky-400" />
            </div>
            <div className="ml-3">
                <h3 className="font-bold text-sky-300">{t('key_takeaways')}</h3>
                <ul className="mt-2 text-sm text-slate-300 space-y-2 list-disc list-inside">
                    {itemKeys.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

const TableComponent: React.FC<{ data: { headerKeys: string[], rows: (string|number)[][] }, t: TFunction }> = ({ data, t }) => (
    <div className="my-4 overflow-x-auto">
        <table className="w-full min-w-max text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-slate-600">
                    {data.headerKeys.map((key) => (
                        <th key={key} className="p-3 text-sm font-semibold text-sky-400 uppercase tracking-wider">{t(key)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`p-3 text-slate-300 ${cellIndex === 0 ? 'font-semibold text-white' : ''}`}>
                                {typeof cell === 'string' ? t(cell) : cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const BarChartComponent: React.FC<{ data: { data: any[], colors: string[] }, t: TFunction }> = ({ data, t }) => {
    const translatedData = data.data.map(item => ({...item, name: t(item.nameKey), label: t(item.labelKey)}));
    return (
        <div className="my-6 p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><ChartBarIcon className="w-5 h-5 mr-2 text-sky-400"/> {t('chart_market_cap_title')}</h3>
            <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={translatedData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8' }} width={80} />
                        <Tooltip cursor={{fill: 'rgba(14, 165, 233, 0.1)'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                        <Bar dataKey="value" barSize={30} radius={[0, 10, 10, 0]}>
                            {translatedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={data.colors[index % data.colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-around mt-2 text-xs text-slate-400">
                {translatedData.map((entry, index) => <span key={index}><span className="font-bold" style={{color: data.colors[index]}}>■</span> {entry.label}</span>)}
            </div>
        </div>
    );
};

const PieChartComponent: React.FC<{ data: { data: any[], colors: string[] }, t: TFunction }> = ({ data, t }) => {
    const translatedData = data.data.map(item => ({...item, name: t(item.nameKey)}));
    return (
        <div className="my-6 p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><ChartBarIcon className="w-5 h-5 mr-2 text-sky-400"/> {t('chart_portfolio_title')}</h3>
            <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={translatedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {translatedData.map((entry, index) => <Cell key={`cell-${index}`} fill={data.colors[index % data.colors.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const DiagramComponent: React.FC<{ data: any, t: TFunction }> = ({ data, t }) => (
    <div className="my-6 p-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center"><ChartBarIcon className="w-5 h-5 mr-2 text-sky-400"/> {t(data.titleKey)}</h3>
        <div className="flex flex-col md:flex-row justify-around gap-4">
            {data.lanes.map((lane: any, index: number) => (
                <div key={index} className="w-full bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-center text-sky-400 mb-4">{t(lane.titleKey)}</h4>
                    <div className="space-y-4">
                        {lane.steps.map((step: any, stepIndex: number) => (
                            <div key={stepIndex} className="text-center">
                                <div className="font-semibold bg-slate-600 rounded-md p-2">{t(step.from)}</div>
                                <div className="text-sky-300 my-1 text-sm font-mono">
                                    ↓ <span className="text-white bg-sky-600/50 px-2 rounded-full">{t(step.itemKey)}</span> ↓
                                </div>
                                <div className="font-semibold bg-slate-600 rounded-md p-2">{t(step.to)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Tutorial Viewer ---

interface TutorialViewerProps {
    module: TutorialModule;
    onComplete: (moduleId: string) => void;
    onBack: () => void;
    t: TFunction;
}

const TutorialViewer: React.FC<TutorialViewerProps> = ({ module, onComplete, onBack, t }) => {

    const renderContentBlock = (block: ContentBlock, index: number) => {
        switch(block.type) {
            case 'header':
                return <h2 key={index} className="text-2xl font-bold text-sky-400 mt-6 border-b-2 border-slate-700 pb-2">{t(block.textKey)}</h2>;
            case 'explanation':
                return <div key={index} className="text-slate-300 space-y-3 prose prose-invert max-w-none">{block.textKeys.map((key) => <p key={key}>{t(key)}</p>)}</div>;
            case 'analogy':
                return <AnalogyBlock key={index} textKeys={block.textKeys} t={t} />;
            case 'takeaways':
                return <TakeawaysBlock key={index} itemKeys={block.itemKeys} t={t} />;
            case 'table':
                return <TableComponent key={index} data={block.data} t={t} />;
            case 'barChart':
                return <BarChartComponent key={index} data={{ data: block.data, colors: block.colors }} t={t} />;
            case 'pieChart':
                return <PieChartComponent key={index} data={{ data: block.data, colors: block.colors }} t={t} />;
            case 'diagram':
                return <DiagramComponent key={index} data={block.data} t={t} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="p-4">
            <button onClick={onBack} className="self-start text-sky-400 mb-4 hover:text-sky-300">&larr; {t('back_to_modules')}</button>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h1 className="text-3xl font-bold text-white mb-1">{t(module.titleKey)}</h1>
                <p className="text-md text-slate-400 mb-6">{t(module.descriptionKey)}</p>
                <div className="space-y-4">
                    {module.content.map(renderContentBlock)}
                </div>
                <button 
                    onClick={() => { onComplete(module.id); onBack(); }} 
                    className="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    {t('mark_as_complete')}
                </button>
            </div>
        </div>
    );
};

// --- Quiz Viewer ---

interface QuizViewerProps {
    quiz: Quiz;
    onComplete: (quizId: string, score: number) => void;
    onBack: () => void;
    t: TFunction;
}

const QuizViewer: React.FC<QuizViewerProps> = ({ quiz, onComplete, onBack, t }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const currentQuestion = quiz.questions[questionIndex];
    const correctAnswer = t(currentQuestion.correctAnswerKey);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === correctAnswer) {
            setFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        if (questionIndex < quiz.questions.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            onComplete(quiz.id, score);
            onBack();
        }
    };
    
    if (questionIndex >= quiz.questions.length) {
        return (
            <div className="p-4 bg-slate-800 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-sky-400">{t('quiz_complete')}</h2>
                <p className="text-xl mt-4">{t('your_score', { score, total: quiz.questions.length })}</p>
                <button onClick={() => { onComplete(quiz.id, score); onBack(); }} className="mt-6 bg-sky-600 px-4 py-2 rounded-md hover:bg-sky-500">
                    {t('back_to_quizzes')}
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-slate-800 rounded-lg">
            <button onClick={onBack} className="text-sky-400 mb-4 hover:text-sky-300">&larr; {t('back_to_quizzes')}</button>
            <h2 className="text-xl font-bold mb-4">{t(currentQuestion.questionKey)}</h2>
            <div className="space-y-3">
                {currentQuestion.optionKeys.map(optionKey => {
                    const option = t(optionKey);
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === correctAnswer;
                    let buttonClass = 'w-full text-left p-3 rounded-md transition-all ';
                    
                    if (feedback) {
                        if (isCorrect) {
                            buttonClass += 'bg-green-500 ring-2 ring-green-400';
                        } else if (isSelected && !isCorrect) {
                            buttonClass += 'bg-red-500 ring-2 ring-red-400';
                        } else {
                            buttonClass += 'bg-slate-700 opacity-50';
                        }
                    } else {
                        buttonClass += 'bg-slate-700 hover:bg-slate-600 hover:ring-2 hover:ring-sky-500';
                    }

                    return (
                        <button key={optionKey} onClick={() => handleAnswer(option)} disabled={!!feedback} className={buttonClass}>
                            {option}
                        </button>
                    );
                })}
            </div>
            {feedback && (
                <div className="mt-4 text-center">
                    <p className={`text-xl font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                        {feedback === 'correct' ? t('correct') : t('incorrect')}
                    </p>
                    <button onClick={handleNextQuestion} className="mt-2 bg-sky-600 px-6 py-2 rounded-md hover:bg-sky-500">
                        {questionIndex === quiz.questions.length - 1 ? t('finish_quiz') : t('next_question')}
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Main Learn Screen Component ---

interface LearnScreenProps {
    userProgress: UserProgress;
    setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
    activeTutorial: string | null;
    setActiveTutorial: (id: string | null) => void;
    t: TFunction;
}

const LearnScreen: React.FC<LearnScreenProps> = ({ userProgress, setUserProgress, activeTutorial, setActiveTutorial, t }) => {
    const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

    const handleCompleteTutorial = useCallback((moduleId: string) => {
        setUserProgress(prev => ({
            ...prev,
            completedTutorials: [...new Set([...prev.completedTutorials, moduleId])]
        }));
    }, [setUserProgress]);

    const handleCompleteQuiz = useCallback((quizId: string, score: number) => {
        setUserProgress(prev => ({
            ...prev,
            quizScores: { ...prev.quizScores, [quizId]: score }
        }));
    }, [setUserProgress]);
    
    const selectedTutorial = tutorialModules.find(m => m.id === activeTutorial);
    const selectedQuiz = quizzes.find(q => q.id === activeQuiz);

    if (selectedTutorial) {
        return <TutorialViewer module={selectedTutorial} onComplete={handleCompleteTutorial} onBack={() => setActiveTutorial(null)} t={t} />;
    }

    if (selectedQuiz) {
        return <QuizViewer quiz={selectedQuiz} onComplete={handleCompleteQuiz} onBack={() => setActiveQuiz(null)} t={t} />;
    }

    return (
        <div className="p-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">{t('learn_title')}</h1>
                <p className="text-md text-slate-400">{t('learn_subtitle')}</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('tutorials')}</h2>
                {tutorialModules.map(module => {
                    const isCompleted = userProgress.completedTutorials.includes(module.id);
                    return (
                        <div key={module.id} className="bg-slate-800 border border-slate-700 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-sky-400">{t(module.titleKey)}</h3>
                                <p className="text-slate-400">{t(module.descriptionKey)}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                {isCompleted && <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded-full text-xs font-bold">✓ {t('completed')}</span>}
                                <button
                                    onClick={() => setActiveTutorial(module.id)}
                                    className={`px-4 py-2 rounded-md transition-colors font-semibold ${
                                        isCompleted
                                            ? 'bg-slate-600 hover:bg-slate-500'
                                            : 'bg-sky-600 hover:bg-sky-500'
                                    }`}
                                >
                                    {isCompleted ? t('review') : t('start')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('quizzes')}</h2>
                {quizzes.map(quiz => (
                    <div key={quiz.id} className="bg-slate-800 border border-slate-700 p-4 rounded-lg flex justify-between items-center">
                         <div>
                            <h3 className="text-lg font-bold text-amber-400">{t(quiz.titleKey)}</h3>
                            {userProgress.quizScores[quiz.id] !== undefined && <p className="text-slate-400">{t('last_score', { score: userProgress.quizScores[quiz.id], total: quiz.questions.length })}</p>}
                        </div>
                        <button onClick={() => setActiveQuiz(quiz.id)} className="bg-amber-500 px-4 py-2 rounded-md hover:bg-amber-400 font-semibold">
                            {t('take_quiz')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearnScreen;