import React from 'react';

import { useFormContext } from 'react-hook-form';
import { NotificationContext } from './context/context';
import { Input, ResendButton } from './Auth';
import { resendConfirmationCode, validationObj } from './utils/authFunctions';

export function ConfirmationForm() {
  const { getValues } = useFormContext();
  const { createNotification } = React.useContext(NotificationContext);

  let timerId = React.useRef();
  const [canResend, setCanResend] = React.useState(true);

  React.useEffect(() => {
    if (canResend) return;
    timerId = setTimeout(() => {
      console.info('Can resend code');
      setCanResend(true);
    }, 240000);

    return () => clearTimeout(timerId);
  }, [canResend]);

  console.count('rendered');

  const resendConfirmationEmail = async () => {
    const username = getValues('username');
    try {
      await resendConfirmationCode(username);
      createNotification('Confirmation code has been resent', 'success', 5000);
      setCanResend(false);
    } catch (error) {
      createNotification(
        'There was an error confirming your sign up',
        'error',
        5000
      );
    }
  };

  return (
    <>
      <Input
        name='code'
        type='text'
        labelName='Confirmation Code'
        validationOptions={validationObj['confirmCode']()}
      />

      <ResendButton onClick={resendConfirmationEmail} disabled={!canResend}>
        Resend Code
      </ResendButton>
    </>
  );
}

export function RegularForm({ isLogin = true }) {
  const { getValues } = useFormContext();
  const passwordValue = !isLogin && getValues('password');

  return (
    <>
      {!isLogin && (
        <Input
          name='email'
          type='email'
          labelName='Email'
          validationOptions={validationObj['email'](passwordValue)}
        />
      )}

      <Input
        name='password'
        type='password'
        labelName='Password'
        validationOptions={validationObj['password'](isLogin)}
      />
      {isLogin && <ResendButton>Forgot Password?</ResendButton>}
      {!isLogin && (
        <Input
          name='confirmPassword'
          type='password'
          labelName='Confirm Password'
          validationOptions={validationObj['confirmPassword'](passwordValue)}
        />
      )}
    </>
  );
}

export function ForgotPasswordForm() {
  return <></>;
}
