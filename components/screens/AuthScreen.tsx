import React, { useState, useEffect } from 'react';
import { User, Language, languages } from '../../types';
import { GoogleIcon, InfoIcon } from '../icons';
import useLocalStorageState from '../../hooks/useLocalStorageState';

interface AuthScreenProps {
    onLogin: (user: User) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

type AuthView = 'login' | 'register' | 'verify' | 'forgot' | 'reset';
type NotificationType = 'success' | 'error' | 'info';

const OTP_EXPIRATION_MINUTES = 5;

// --- Helper Functions ---
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
const isOtpExpired = (otpExpires?: number) => otpExpires ? otpExpires < Date.now() : true;

// --- Sub-components ---
const InputField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-300 mb-1">{props.label}</label>
        <input {...props} id={props.name} className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
    </div>
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-300 mb-1">{props.label}</label>
        <select {...props} id={props.name} className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500">
            {props.children}
        </select>
    </div>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute left-full ml-4 w-48 p-2 bg-slate-600 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {text}
        </div>
    </div>
);

const Notification: React.FC<{ message: string; type: NotificationType; onDismiss: () => void; }> = ({ message, type, onDismiss }) => {
    const colors = {
        success: 'bg-green-500/20 text-green-300 border-green-500',
        error: 'bg-red-500/20 text-red-300 border-red-500',
        info: 'bg-sky-500/20 text-sky-300 border-sky-500',
    };
    if (!message) return null;
    return (
        <div className={`p-3 rounded-lg border ${colors[type]} flex justify-between items-center mb-6`}>
            <p className="text-sm">{message}</p>
            <button onClick={onDismiss} className="ml-2 text-xl">&times;</button>
        </div>
    );
};

const LanguageSelector: React.FC<{ language: Language, setLanguage: (lang: Language) => void, t: (key: string) => string }> = ({ language, setLanguage, t }) => (
    <div className="mb-6">
        <label htmlFor="language-select-auth" className="block text-sm font-medium text-slate-300 mb-1">{t('language')}</label>
        <select
            id="language-select-auth"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        >
            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
        </select>
    </div>
);

// --- Main Component ---
const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, language, setLanguage, t }) => {
    const [view, setView] = useState<AuthView>('login');
    const [users, setUsers] = useLocalStorageState<Record<string, User>>('invetSmart-users', {});
    const [emailForFlow, setEmailForFlow] = useState('');
    const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
    const [formData, setFormData] = useState({
        name: '', dob: '', email: '', password: '', confirmPassword: '', mobile: '', gender: '', workingStatus: '', otp: '',
    });

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (message: string, type: NotificationType) => setNotification({ message, type });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const sendOtp = (email: string, forPurpose: 'verification' | 'reset') => {
        const user = users[email];
        if (!user && forPurpose === 'reset') return; // For password reset, user must exist

        const otp = generateOtp();
        const otpExpires = Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000;
        
        const updatedUser = { ...(user || {}), otp, otpExpires };
        setUsers(prev => ({ ...prev, [email]: { ...prev[email], ...updatedUser } }));

        showNotification(t('otp_simulation', { otp }), 'info');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (users[formData.email]) {
            return showNotification(t('error_email_exists'), 'error');
        }
        if (formData.password.length < 6) {
             return showNotification(t('error_password_length'), 'error');
        }
        if (formData.password !== formData.confirmPassword) {
            return showNotification(t('error_password_mismatch'), 'error');
        }

        const otp = generateOtp();
        const newUser: User = {
            name: formData.name, email: formData.email, password: formData.password, dob: formData.dob, mobile: formData.mobile,
            gender: formData.gender, workingStatus: formData.workingStatus, isVerified: false, otp,
            otpExpires: Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000,
        };

        setUsers(prev => ({ ...prev, [formData.email]: newUser }));
        setEmailForFlow(formData.email);
        setView('verify');
        showNotification(t('register_success_otp', { otp }), 'info');
    };
    
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users[emailForFlow];
        if (!user || isOtpExpired(user.otpExpires) || user.otp !== formData.otp) {
            return showNotification(t('error_invalid_otp'), 'error');
        }
        setUsers(prev => ({
            ...prev,
            [emailForFlow]: { ...prev[emailForFlow], isVerified: true, otp: undefined, otpExpires: undefined }
        }));
        setView('login');
        showNotification(t('verify_success'), 'success');
    };
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users[formData.email];
        if (!user || user.password !== formData.password) {
            return showNotification(t('error_invalid_credentials'), 'error');
        }
        if (!user.isVerified) {
            sendOtp(formData.email, 'verification');
            setEmailForFlow(formData.email);
            setView('verify');
            return showNotification(t('error_not_verified'), 'info');
        }
        onLogin(user);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users[formData.email];
        if (user) {
            sendOtp(formData.email, 'reset');
            setEmailForFlow(formData.email);
            setView('reset');
        }
        showNotification(t('forgot_password_email_sent'), 'info');
    };
    
    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users[emailForFlow];
        if (!user || isOtpExpired(user.otpExpires) || user.otp !== formData.otp) {
             return showNotification(t('error_invalid_otp'), 'error');
        }
        if (formData.password.length < 6) {
             return showNotification(t('error_password_length'), 'error');
        }
        if (formData.password !== formData.confirmPassword) {
            return showNotification(t('error_password_mismatch'), 'error');
        }
        
        setUsers(prev => ({
            ...prev,
            [emailForFlow]: { ...prev[emailForFlow], password: formData.password, otp: undefined, otpExpires: undefined }
        }));
        setView('login');
        showNotification(t('reset_password_success'), 'success');
    };
    
    const renderContent = () => {
        switch (view) {
            case 'register':
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('create_account')}</h2>
                        <p className="text-center text-slate-400 mb-8">{t('get_started')}</p>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <InputField label={t('full_name')} name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                            <InputField label={t('email_address')} name="email" type="email" value={formData.email} onChange={handleInputChange} required autoComplete="email" />
                            <div className="flex items-center space-x-2">
                                <InputField label={t('dob')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                                <Tooltip text={t('dob_tooltip')}><InfoIcon className="w-5 h-5 text-slate-400 mt-6" /></Tooltip>
                            </div>
                            <InputField label={t('password')} name="password" type="password" value={formData.password} onChange={handleInputChange} required autoComplete="new-password" />
                            <InputField label={t('confirm_password')} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required autoComplete="new-password" />
                            <InputField label={t('mobile_number')} name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} />
                            <div className="flex items-center space-x-2">
                                <SelectField label={t('gender')} name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="">{t('select')}</option>
                                    <option value="male">{t('male')}</option>
                                    <option value="female">{t('female')}</option>
                                    <option value="other">{t('other')}</option>
                                    <option value="prefer-not-to-say">{t('prefer_not_to_say')}</option>
                                </SelectField>
                                <Tooltip text={t('gender_tooltip')}><InfoIcon className="w-5 h-5 text-slate-400 mt-6" /></Tooltip>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SelectField label={t('working_status')} name="workingStatus" value={formData.workingStatus} onChange={handleInputChange}>
                                    <option value="">{t('select')}</option>
                                    <option value="student">{t('student')}</option>
                                    <option value="full-time-job">{t('full_time_job')}</option>
                                    <option value="part-time-job">{t('part_time_job')}</option>
                                    <option value="unemployed">{t('unemployed')}</option>
                                    <option value="other">{t('other')}</option>
                                </SelectField>
                                <Tooltip text={t('working_status_tooltip')}><InfoIcon className="w-5 h-5 text-slate-400 mt-6" /></Tooltip>
                            </div>
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('sign_up')}</button>
                            <p className="text-center text-slate-400 text-sm">{t('already_have_account')} <button onClick={() => setView('login')} className="font-semibold text-sky-400 hover:text-sky-300">{t('login')}</button></p>
                        </form>
                    </>
                );
            case 'verify':
                 return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('verify_account')}</h2>
                        <p className="text-center text-slate-400 mb-8">{t('enter_otp', { email: emailForFlow })}</p>
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <InputField label={t('otp')} name="otp" type="text" value={formData.otp} onChange={handleInputChange} required />
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('verify')}</button>
                            <p className="text-center text-slate-400 text-sm">{t('didnt_receive_it')} <button onClick={() => sendOtp(emailForFlow, 'verification')} className="font-semibold text-sky-400 hover:text-sky-300">{t('resend_otp')}</button></p>
                        </form>
                    </>
                 );
            case 'forgot':
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('forgot_password')}</h2>
                        <p className="text-center text-slate-400 mb-8">{t('forgot_password_prompt')}</p>
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <InputField label={t('email_address')} name="email" type="email" value={formData.email} onChange={handleInputChange} required autoComplete="email" />
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('send_reset_otp')}</button>
                            <p className="text-center text-slate-400 text-sm"><button onClick={() => setView('login')} className="font-semibold text-sky-400 hover:text-sky-300">{t('back_to_login')}</button></p>
                        </form>
                    </>
                );
            case 'reset':
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('reset_password')}</h2>
                        <p className="text-center text-slate-400 mb-8">{t('reset_password_prompt')}</p>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <InputField label={t('otp')} name="otp" type="text" value={formData.otp} onChange={handleInputChange} required />
                            <InputField label={t('new_password')} name="password" type="password" value={formData.password} onChange={handleInputChange} required autoComplete="new-password" />
                            <InputField label={t('confirm_new_password')} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required autoComplete="new-password" />
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('reset_password')}</button>
                            <p className="text-center text-slate-400 text-sm"><button onClick={() => setView('login')} className="font-semibold text-sky-400 hover:text-sky-300">{t('back_to_login')}</button></p>
                        </form>
                    </>
                );
            case 'login':
            default:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('welcome_back')}</h2>
                        <p className="text-center text-slate-400 mb-8">{t('sign_in_prompt')}</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <InputField label={t('email_address')} name="email" type="email" value={formData.email} onChange={handleInputChange} required autoComplete="email" />
                            <InputField label={t('password')} name="password" type="password" value={formData.password} onChange={handleInputChange} required autoComplete="current-password" />
                            <div className="text-right">
                                <button type="button" onClick={() => setView('forgot')} className="text-sm font-semibold text-sky-400 hover:text-sky-300">{t('forgot_password_link')}</button>
                            </div>
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">{t('login')}</button>
                        </form>
                        <div className="my-6 flex items-center">
                            <div className="flex-grow border-t border-slate-600"></div><span className="flex-shrink mx-4 text-slate-400 text-sm">{t('or')}</span><div className="flex-grow border-t border-slate-600"></div>
                        </div>
                        <button onClick={() => showNotification('Google Sign-In is not implemented in this demo.', 'info')} className="w-full flex items-center justify-center bg-white hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                            <GoogleIcon className="w-6 h-6 mr-3" /> {t('sign_in_with_google')}
                        </button>
                        <p className="text-center text-slate-400 mt-8">{t('dont_have_account')} <button onClick={() => setView('register')} className="font-semibold text-sky-400 hover:text-sky-300 ml-2">{t('sign_up')}</button></p>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
                    {notification && <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;