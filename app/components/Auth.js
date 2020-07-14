import React from 'react';
import styled from 'styled-components';
import logInImage from '../assets/happy-bunch-log-in.png';
import signUpImage from '../assets/happy-bunch-sign-up.png';

import { hexToRgb } from './utils/helpers';
import { ErrorMessage } from '@hookform/error-message';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { signIn, signUp, signOut, validationObj } from './utils/authFunctions';
import {
  authFormHeader,
  authFormVariants,
  authErrorMessage,
  authInputVariants,
} from './utils/framerVariants';

const SectionAuth = styled(motion.section)`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.white};

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
  background: ${({ theme }) => theme.baseColorLighter};
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
  color: ${({ theme }) => theme.baseColorLight};

  & > h2 {
    font-family: var(--primaryFont);
    font-weight: var(--thin);
    margin: 0;
    font-size: 3.6em;
    width: 69%;
    color: inherit;
    margin: -0.6em 0 0.2em 0.1em;
  }

  & > p {
    font-family: var(--primaryFont);
    font-weight: var(--thin);
    font-size: 1.1em;
    color: inherit;
    cursor: pointer;
    position: absolute;
    bottom: 0;
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
    background: ${({ theme }) => hexToRgb(theme.baseColorLight, 0.3)};
    margin: 10px 0 10px 0;
    border-radius: 7px;
    color: ${({ theme }) => theme.baseColor};
    padding: 0.9em;
    text-indent: 0.5em;
    font-size: 1em;
    font-family: var(--secondaryFont);
    font-weight: var(--medium);
    outline: none;
  }

  & > label {
    font-size: 1em;
    color: ${({ theme }) => hexToRgb(theme.baseColorLight, 0.5)};
    font-family: var(--secondaryFont);
    font-weight: var(--medium);
    transition: color 0.3s ease;
  }

  &:focus-within > label {
    color: ${({ theme }) => theme.baseColorLight};
  }
`;

const SubmitButton = styled(motion.button).attrs({
  type: 'submit',
})`
  width: 40%;
  padding: 1em 0;
  margin: 1em auto 0 auto;
  background: ${({ theme }) => theme.baseColorLight};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-family: var(--primaryFont);
  font-weight: var(--thin);
  font-variant: small-caps;
  cursor: pointer;
`;

function onSubmitForm(isLogin, formData) {
  console.log({ isLogin, formData });
}

const Input = props => {
  const { motionProps, name, type, labelName, validationOptions } = props;
  const { register, errors } = useFormContext();

  return (
    <FormItemContainer
      variants={authInputVariants}
      exit='hidden'
      key={name}
      positionTransition={true}
      {...motionProps}>
      <label htmlFor={name}>{labelName}</label>
      <input name={name} type={type} ref={register(validationOptions)} />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <motion.p
            variants={authErrorMessage}
            initial='hidden'
            animate='visible'
            exit='hidden'
            positionTransition={true}
            style={{ color: 'red', margin: 0 }}>
            {message}
          </motion.p>
        )}
      />
    </FormItemContainer>
  );
};

export default function Authenticate() {
  const formStates = ['Log in', 'Sign up'];

  const [formState, setFormState] = React.useState(0);
  const { register, handleSubmit, errors, watch, clearErrors } = useForm();

  const changeFormState = () => {
    setFormState(prevInd => (prevInd >= 1 ? 0 : prevInd + 1));
    clearErrors();
  };

  const isLogin = formState === 0;
  const passwordValue = !isLogin ? watch('password', false) : '';

  return (
    <SectionAuth className='container'>
      <ImageContainer>
        <AnimatePresence>
          <motion.img
            key={isLogin ? logInImage : signUpImage}
            src={isLogin ? logInImage : signUpImage}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          />
        </AnimatePresence>
      </ImageContainer>
      <FormContainer>
        <motion.h2
          variants={authFormHeader}
          initial='hidden'
          animate='visible'
          layoutTransition={{ type: 'tween' }}>
          {formStates[formState]}
        </motion.h2>
        <FormProvider register={register} errors={errors}>
          <Form
            variants={authFormVariants}
            initial='hidden'
            animate='up'
            exit='hidden'
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitForm.bind(null, isLogin))}>
            <Input
              name='username'
              type='text'
              labelName='Username'
              validationOptions={validationObj['username'](isLogin)}
            />

            <Input
              name='password'
              type='password'
              labelName='Password'
              validationOptions={validationObj['password'](isLogin)}
            />

            {!isLogin && (
              <Input
                name='confirmPassword'
                type='password'
                labelName='Confirm Password'
                validationOptions={validationObj['confirmPassword'](
                  passwordValue
                )}
              />
            )}

            <SubmitButton
              variants={authInputVariants}
              positionTransition={true}>
              {formStates[formState]}
            </SubmitButton>
          </Form>
        </FormProvider>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          positionTransition={true}
          transition={{ delay: 0.8 }}
          onClick={changeFormState}>
          {isLogin ? 'Not a member? ' : 'Already a member? '}Click here
        </motion.p>
      </FormContainer>
    </SectionAuth>
  );
}
