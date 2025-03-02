import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm, PasswordField } from '../../components/AuthForm';
import { Input } from '../../components/InputField';
import { useAuth } from '../../hooks/useAuthInfo';
import { WEB_PAGES } from '../../utils/constants';

const SignIn: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignIn = async () => {

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signIn(email, password);
      navigate(WEB_PAGES.chat);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.errorCode === 'AADB2C90118') {
        setErrorMessage('Your password has expired. Please reset it.');
      } else {
        setErrorMessage(error.message || 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Get Started Now"
      buttonText={isSubmitting ? "Signing In..." : "Sign In"}
      footerText="Don't Have an account?"
      footerLinkText="Sign Up"
      footerLinkTo="/signup"
      onSubmit={handleSignIn}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    >
      <>
        <Input
          label="Email"
          placeholder="Please Enter your email"
          className="text-sm mb-2 w-full rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          name='email'
        />

        <div className="mb-4">
          <PasswordField
            label="Password"
            placeholder="Enter Password"
            revealed={revealPassword}
            setRevealed={setRevealPassword}
            className="mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <Link
            to={'/reset'}
            className="mb-3 flex justify-end text-sm text-neutral-500 cursor-pointer hover:font-semibold"
          >
            Forget Password?
          </Link>
        </div>
      </>
    </AuthForm>
  );
};

export default SignIn;