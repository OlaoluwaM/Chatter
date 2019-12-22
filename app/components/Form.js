import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';
import { handleLogin, handleSignUp } from '../utils/authFunc';
import { motion, AnimatePresence } from 'framer-motion';
import { FormTitle, InputField, SubmitButton } from './Form-Components';
import { validateUserDataIntegrity } from '../utils/authFunc';
import { containerVariant, itemVariant, spring } from '../utils/motionObj';

const FormContainer = styled(motion.form)`
  display: flex;
  color: var(--sub);
  background: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
  flex-basis: 85%;
  height: fit-content;
  position: relative;
  transition: 0.3s ease;
`;

export default function Form({ setAuth, formType }) {
  const [inputFieldError, setInputFieldError] = React.useState(false);
  const formRef = React.useRef();
  const { authed } = React.useContext(AuthContext);

  React.useEffect(() => {
    return () => setInputFieldError(false);
  }, [formType]);

  const handleSubmit = e => {
    if (inputFieldError) return;

    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
    e.preventDefault();

    if (formType === 'login') {
      formRef.current.style.opacity = 0.4;
      setTimeout(() => setAuth(handleLogin(extractedFormData)), 1500);
    } else {
      formRef.current.style.opacity = 0.4;
      setTimeout(() => setAuth(handleSignUp(extractedFormData)), 1500);
    }
  };

  return (
    <FormContainer
      variants={containerVariant}
      ref={formRef}
      onSubmit={handleSubmit}
      initial='hidden'
      animate='visible'
      autoComplete='off'>
      {authed && <Redirect to='/' />}

      {!authed && (
        <AnimatePresence>
          <FormTitle
            key='form-title'
            exit='hidden'
            variants={itemVariant}
            positionTransition={spring}>
            {formType === 'login' ? 'Login' : 'Create An Account'}
          </FormTitle>

          <InputField
            key='id-field'
            MotionProps={{
              variants: itemVariant,
              layoutTransition: spring,
              exit: 'hidden',
            }}
            name='id'
            label='Username'
            formState={{ formType, setInputFieldError }}
          />

          <InputField
            key='password-field'
            MotionProps={{
              variants: itemVariant,
              layoutTransition: spring,
              exit: 'hidden',
            }}
            formState={{ formType, setInputFieldError }}
            name='password'
            type='password'
            label='Password'
          />

          {formType !== 'login' && (
            <InputField
              key='confirmPassword-field'
              MotionProps={{
                variants: itemVariant,
                layoutTransition: spring,
                exit: 'hidden',
              }}
              formState={{ formType, setInputFieldError }}
              name='confirmPassword'
              type='password'
              label='Confirm Password'
            />
          )}

          <SubmitButton
            key='submit-button'
            exit='hidden'
            type='submit'
            name='btn'
            variants={itemVariant}
            layoutTransition={spring}
            disabled={inputFieldError}
            value={formType === 'login' ? 'Login' : 'Sign Up'}
          />
        </AnimatePresence>
      )}
    </FormContainer>
  );
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
