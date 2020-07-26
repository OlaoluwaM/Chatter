import React from 'react';

import styled from 'styled-components';
import Loading from './Loading';
import logInImage from '../assets/happy-bunch-log-in.png';
import signUpImage from '../assets/happy-bunch-sign-up.png';

import { hexToRgb } from './utils/helpers';
import { Redirect } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { authPageVariants } from './utils/framerVariants';
import { RegularForm, ConfirmationForm } from './Forms';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { CurrentUserContext, NotificationContext } from './context/context';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import {
  signIn,
  signUp,
  confirmSignUp,
  validationObj,
} from './utils/authFunctions';

const {
  formVariants,
  inputVariants,
  imageVariants,
  sectionVariants,
  formHeaderVariants,
  switchTextVariants,
  errorMessageVariants,
} = authPageVariants;

const SectionAuth = styled(motion.section)`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.whiteOrBlack};

  & > div {
    height: 100%;
  }
`;

const ImageContainer = styled(motion.div)`
  flex-basis: 48%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.backgroundLighter};
  position: relative;

  & > img {
    display: block;
    width: 55%;
    margin: auto;
    position: absolute;
  }
`;

const FormContainer = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.background};

  & > h2 {
    font-family: var(--primaryFont);
    font-weight: var(--bold);
    margin: 0;
    font-size: 3.6em;
    width: 68%;
    color: ${({ theme }) => theme.background};
    text-transform: capitalize;
    margin: -0.6em 0 0.2em 0.1em;
  }

  & > p {
    color: ${({ theme }) => theme.gray};
    font-family: var(--primaryFont);
    font-weight: var(--thin);
    font-size: 1.1em;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    transition: color 0.3s ease;

    &:hover,
    &:active {
      color: ${({ theme }) => theme.background};
    }
  }
`;

const Form = styled(motion.form)`
  width: 70%;
  padding: 0.5em;
  min-height: 42%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
`;

const FormItemContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0.7em;
  position: relative;
  font-family: var(--primaryFont);

  & > input {
    border: none;
    background: transparent;
    margin: 10px 0 10px 0;
    border-radius: 7px;
    color: ${({ theme }) => theme.background};
    border: ${({ theme }) => hexToRgb(theme.backgroundLighter, 0.4)} 3px solid;
    padding: 0.9em;
    text-indent: 0.5em;
    font-size: 1em;
    font-family: var(--secondaryFont);
    font-weight: var(--medium);
    outline: none;
    transition: border-color 0.3s ease;
  }

  & > input:disabled {
    border-color: ${({ theme }) => theme.gray};
    background: ${({ theme }) => theme.gray};
    color: ${({ theme }) => hexToRgb(theme.whiteOrBlack, 0.4)};
  }

  & > label {
    font-size: 1em;
    color: ${({ theme }) => hexToRgb(theme.backgroundLighter, 0.4)};
    font-family: var(--secondaryFont);
    font-weight: var(--medium);
    transition: color 0.3s ease;
  }

  &:focus-within {
    label {
      color: ${({ theme }) => hexToRgb(theme.backgroundLighter, 0.9)};
    }
    input {
      border-color: ${({ theme }) => hexToRgb(theme.backgroundLighter, 0.9)};
    }
  }
`;

const SubmitButton = styled(motion.button).attrs({
  type: 'submit',
})`
  width: 12em;
  padding: 1em;
  margin: 1em 1em 0 1em;
  margin: 0 auto;
  background: ${({ theme }) => theme.baseColor};
  color: #fffffe;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-family: var(--primaryFont);
  font-weight: var(--thin);
  font-variant: small-caps;
  cursor: pointer;
`;

export const ResendButton = styled(motion.button)`
  display: block;
  border: none;
  background: transparent;
  margin: 4px 0 2.3rem 1rem;
  padding: 0;
  text-decoration: underline;
  font-family: var(--secondaryFont);
  font-weight: var(--thin);
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  color: ${({ theme }) => theme.gray};
  transition: color 0.3s ease;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.background};
  }

  &:disabled {
    color: ${({ theme }) => hexToRgb(theme.gray, 0.4)};
    &:hover,
    &:active {
      color: ${({ theme }) => hexToRgb(theme.gray, 0.4)};
    }
  }
`;

export const Input = props => {
  const {
    motionProps,
    name,
    type,
    labelName,
    validationOptions,
    ...rest
  } = props;
  const { register, errors } = useFormContext();

  return (
    <FormItemContainer
      variants={inputVariants}
      exit='hidden'
      {...motionProps}
      layout>
      {!!labelName && <label htmlFor={`${name}-id`}>{labelName}</label>}
      <input
        id={`${name}-id`}
        name={name}
        type={type}
        ref={register(validationOptions)}
        {...rest}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <motion.p
            variants={errorMessageVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            data-testid={`${name}-id`}
            className='error'>
            {message}
          </motion.p>
        )}
      />
    </FormItemContainer>
  );
};

export default function Authenticate({ onSubmit, authUser }) {
  const { authenticated } = React.useContext(CurrentUserContext);
  const { createNotification } = React.useContext(NotificationContext);
  const formStates = ['Log in', 'Sign up', 'Confirm Sign Up'];

  const [formState, setFormState] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    getValues,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const changeFormState = () => {
    setFormState(prevInd => (prevInd >= 1 ? 0 : prevInd + 1));
    clearErrors();
  };

  const isLogin = formState === 0;
  const shouldConfirmUser = formState === 2;

  const submitLogicObj = {
    [formStates[0]]: async formData => {
      return signIn(formData);
    },
    [formStates[1]]: async formData => {
      await signUp(formData);
      setFormState(2);
      reset({ username: formData.username });
    },
    [formStates[2]]: async formData => {
      await confirmSignUp(formData);
    },
  };

  const submitForm = async formData => {
    setIsLoading(true);
    const currentFormState = formStates[formState];
    try {
      await submitLogicObj[currentFormState](formData);
    } catch (error) {
      if (error.errorData.message.search(/not confirmed/i) > -1) {
        reset({ username: formData.username });
        setFormState(2);
        createNotification('Please confirm your account', 'warning', 4000);
      } else {
        createNotification(error.errorData.message, 'error', 4000);
      }
      console.error(error);
    }
  };

  if (authenticated) {
    return <Redirect to='/' />;
  }

  return (
    <SectionAuth className='container' variants={sectionVariants}>
      <ImageContainer>
        <AnimatePresence>
          <motion.img
            key={isLogin ? logInImage : signUpImage}
            src={isLogin ? logInImage : signUpImage}
            variants={imageVariants}
            animate='visible'
            initial='hidden'
            exit='hidden'
          />
        </AnimatePresence>
      </ImageContainer>

      <FormContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <AnimateSharedLayout>
              <motion.h2
                key='FormHeader'
                variants={formHeaderVariants}
                initial='hidden'
                animate='visible'
                layout>
                {formStates[formState]}
              </motion.h2>

              <FormProvider
                register={register}
                errors={errors}
                getValues={getValues}>
                <Form
                  key='Form'
                  data-testid='authForm'
                  variants={formVariants}
                  initial='hidden'
                  animate='up'
                  exit='hidden'
                  onSubmit={handleSubmit(submitForm)}
                  layout>
                  <Input
                    name='username'
                    type='text'
                    labelName={formState === 2 ? null : 'Username'}
                    validationOptions={validationObj['username'](isLogin)}
                    disabled={formState === 2}
                  />
                  {!shouldConfirmUser ? (
                    <RegularForm isLogin={isLogin} />
                  ) : (
                    <ConfirmationForm />
                  )}
                  <SubmitButton
                    variants={inputVariants}
                    positionTransition={true}>
                    {formStates[formState]}
                  </SubmitButton>
                </Form>
              </FormProvider>
            </AnimateSharedLayout>

            {formState < 2 && (
              <motion.p
                variants={switchTextVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                transition={{ delay: 0.4 }}
                onClick={changeFormState}>
                {isLogin ? 'Not a member? ' : 'Already a member? '}Click here
              </motion.p>
            )}
          </>
        )}
      </FormContainer>
    </SectionAuth>
  );
}
