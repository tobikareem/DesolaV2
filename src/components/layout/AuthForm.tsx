import React, { ReactNode } from 'react';
import {
    FaApple,
    FaEye,
    FaEyeSlash,
    FaFacebook,
    FaGoogle,
    FaWindows,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthHero } from '../../pages/auth/AuthHero';
import { Btn } from '../ui/Button';
import { Input } from '../ui/InputField';
import { Logo } from './Logo';
import { Text } from '../ui/TextComp';

interface PasswordFieldProps {
    label: string;
    placeholder: string;
    revealed: boolean;
    setRevealed: (value: boolean) => void;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    label,
    placeholder,
    revealed,
    setRevealed,
    value,
    onChange,
    disabled = false,
    className = '',
}) => (
    <div className={`relative w-full ${className}`}>
        <Input
            type={revealed ? 'text' : 'password'}
            label={label}
            placeholder={placeholder}
            className="text-sm w-full rounded-lg"
            value={value}
            onChange={onChange}
            disabled={disabled}
            name='password'
        />
        {disabled ? null : (
            revealed ? (
                <FaEyeSlash
                    className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                    onClick={() => setRevealed(false)}
                />
            ) : (
                <FaEye
                    className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                    onClick={() => setRevealed(true)}
                />
            )
        )}
    </div>
);

interface SocialLoginProps {
    className?: string;
    onSocialLogin?: (provider: 'google' | 'facebook' | 'apple' | 'microsoft') => void;
    disabled?: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
    className = '',
    onSocialLogin,
    disabled = false
}) => (
    <div className={`flex justify-center gap-8 ${className}`}>
        <FaGoogle
            className={`text-xl text-red-500 ${disabled ? 'opacity-50' : 'cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'}`}
            onClick={disabled ? undefined : () => onSocialLogin?.('google')}
        />
        <FaFacebook
            className={`text-xl text-blue-600 ${disabled ? 'opacity-50' : 'cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'}`}
            onClick={disabled ? undefined : () => onSocialLogin?.('facebook')}
        />
        <FaApple
            className={`text-xl text-black ${disabled ? 'opacity-50' : 'cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'}`}
            onClick={disabled ? undefined : () => onSocialLogin?.('apple')}
        />
        <FaWindows
            className={`text-xl text-blue-500 ${disabled ? 'opacity-50' : 'cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'}`}
            onClick={disabled ? undefined : () => onSocialLogin?.('microsoft')}
        />
    </div>
);

interface AuthFormProps {
    title: string;
    buttonText: string;
    children: ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
    onSubmit: (e: FormData) => void;
    isSubmitting?: boolean;
    errorMessage?: string | null;
    onSocialLogin?: (provider: 'google' | 'facebook' | 'apple' | 'microsoft') => void;
}


export const AuthForm: React.FC<AuthFormProps> = ({
    title,
    buttonText,
    children,
    footerText,
    footerLinkText,
    footerLinkTo,
    onSubmit,
    isSubmitting = false,
    errorMessage = null,
    onSocialLogin,
}) => {

    return (
        <>
            <Link to={'/'} className="cursor-pointer fixed m-2 bg-white">
                <Logo />
            </Link>
            <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 p-6 flex-grow flex justify-center md:p-10">
                    <div className="w-full md:max-w-md mt-10">
                        <Text
                            as="h1"
                            size="2xl"
                            weight="bold"
                            className="mb-8 text-center font-grotesk"
                        >
                            {title}
                        </Text>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            onSubmit(formData);
                        }}>
                            {errorMessage && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            {children}

                            <Btn
                                type="submit"
                                className={`w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mb-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {buttonText}
                            </Btn>
                        </form>

                        <div className="flex items-center mb-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <Text size="sm" className="mx-3 text-gray-500">
                                Or
                            </Text>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <SocialLogin
                            className="mb-6"
                            onSocialLogin={onSocialLogin}
                            disabled={isSubmitting}
                        />

                        <div className="text-center">
                            <Text size="sm">
                                {footerText}{' '}
                                <Link
                                    to={footerLinkTo}
                                    className="text-blue-600 hover:font-semibold"
                                >
                                    {footerLinkText}
                                </Link>
                            </Text>
                        </div>
                    </div>
                </div>
                <AuthHero />
            </div>
        </>
    );
};

export { PasswordField, SocialLogin };