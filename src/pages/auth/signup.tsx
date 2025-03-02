import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm, PasswordField } from '../../components/AuthForm';
import { Input } from '../../components/InputField';
import { Text } from '../../components/TextComp';
import { useAuth } from '../../hooks/useAuthInfo';
import { WEB_PAGES } from '../../utils/constants';

const Signup: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealPassword2, setRevealPassword2] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    if (!agreeToTerms) {
      setErrorMessage('You must agree to the terms and policy');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signUp(email, password, firstName, lastName);
      navigate(WEB_PAGES.chat);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.errorCode === 'AADB2C99002') {
        setErrorMessage('An account with this email already exists.');
      } else {
        setErrorMessage(error.message || 'Failed to sign up. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Create An Account"
      buttonText="Signup"
      footerText="Have an account?"
      footerLinkText="Sign In"
      footerLinkTo="/signin"
      onSubmit={handleSignUp}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-2">
          <Input
            label="First Name"
            placeholder="First Name"
            className="w-full rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            className="w-full rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <Input
          label="Email"
          placeholder="Please Enter your email"
          className="text-sm mb-2 w-full rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />

        <PasswordField
          label="Password"
          placeholder="Enter Password"
          revealed={revealPassword}
          setRevealed={setRevealPassword}
          className="mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm Password"
          revealed={revealPassword2}
          setRevealed={setRevealPassword2}
          className="mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
        />

        <div className="flex items-center mb-4">
          <Input
            type="checkbox"
            className="mr-2 mt-1"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            disabled={isSubmitting}
          />
          <Text size="sm">I agree to the terms & policy</Text>
        </div>
      </>
    </AuthForm>
  );
};

export default Signup;