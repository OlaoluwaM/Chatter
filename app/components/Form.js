import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { handleLogin, handleSignUp } from '../utils/authFunc';
import { FormTitle, InputField, SubmitButton } from './Form-Components';
import { containerVariant, itemVariant, spring } from '../utils/motionObj';

const FormContainer = styled(motion.form)`
  display: flex;
  background: inherit;
  width: 45%;
  padding: 1%;
  height: 51%;
  justify-content: space-evenly;
  flex-direction: column;
  background: transparent;
  margin-top: 22px;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
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

  if (isAuthenticated) {
    return <Redirect to='/' />;
  } else
    return (
      <>
        <FormTitle
          key='form-title'
          exit='hidden'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.2 }}
          positionTransition={true}>
          {formType === 'login' ? 'Sign In' : 'Sign Up'}
        </FormTitle>

        <FormContainer
          variants={containerVariant}
          ref={formRef}
          onSubmit={handleSubmit}
          initial='hidden'
          animate='visible'
          autoComplete='off'>
          <AnimatePresence>
            <InputField
              key='name-field'
              motionProps={{
                variants: itemVariant,
                positionTransition: true,
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
                positionTransition: true,
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
                  positionTransition: true,
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
              positionTransition={true}
              disabled={inputFieldError}
              value={formType === 'login' ? 'Login' : 'Sign Up'}
            />
          </AnimatePresence>
        </FormContainer>
      </>
    );
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
