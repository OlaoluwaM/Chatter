import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { handleLogin, handleSignUp } from '../utils/authFunc';
import { FormTitle, InputField, SubmitButton } from './Form-Components';
import {
  containerVariant,
  itemVariant,
  spring,
  tween,
} from '../utils/motionObj';

const FormContainer = styled(motion.form)`
  display: grid;
  background: inherit;
  width: 45%;
  padding: 2%;
  height: ${({ length }) => (length === 4 ? '58%' : '70%')};
  grid-template-rows: ${({ length }) => `repeat(${length - 2}, 1fr)`} auto 1fr;
  gap: 14px;
  background: transparent;
  margin-top: -10px;
  overflow: hidden;
`;

export default function Form({ setAuth, formType }) {
  const [inputFieldError, setInputFieldError] = React.useState(false);
  const formRef = React.useRef();

  const { isAuthenticated } = React.useContext(AuthContext);

  React.useEffect(() => {
    return () => setInputFieldError(false);
  }, [formType]);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputFieldError) return;

    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
    formRef.current.style.opacity = 0.4;
    if (formType === 'login') {
      setTimeout(() => setAuth(handleLogin(extractedFormData)), 1500);
    } else {
      setTimeout(() => setAuth(handleSignUp(extractedFormData)), 1500);
    }
  };

  return (
    <>
      <FormTitle
        key='form-title'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 1.2 }}
        layoutTransition={spring}>
        {formType === 'login' ? 'Sign In' : 'Sign Up'}
      </FormTitle>

      <FormContainer
        length={formType === 'login' ? 4 : 5}
        variants={containerVariant}
        ref={formRef}
        onSubmit={handleSubmit}
        initial='hidden'
        animate='visible'
        autoComplete='off'>
        {isAuthenticated && <Redirect to='/' />}

        {!isAuthenticated && (
          <AnimatePresence>
            <InputField
              key='name-field'
              motionProps={{
                variants: itemVariant,
                layoutTransition: spring,
                exit: 'hidden',
              }}
              name='name'
              label='Username'
              formState={{ formType, setInputFieldError }}
            />

            <InputField
              key='password-field'
              motionProps={{
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
                motionProps={{
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
              variants={itemVariant}
              key='submit-button'
              exit='hidden'
              type='submit'
              name='btn'
              layoutTransition={spring}
              disabled={inputFieldError}
              value={formType === 'login' ? 'Login' : 'Sign Up'}
            />
          </AnimatePresence>
        )}
      </FormContainer>
    </>
  );
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
