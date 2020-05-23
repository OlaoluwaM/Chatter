import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { handleLogin, handleSignUp } from '../utils/authFunc';
import { extractFormData } from '../utils/helper';
import { containerVariant, itemVariant, spring } from '../utils/motionObj';
import { FormTitle, InputField, SubmitButton } from './Form-Components';

const FormContainer = styled(motion.form)`
  display: flex;
  background: inherit;
  width: 50%;
  padding: 1%;
  height: 57%;
  justify-content: space-evenly;
  flex-direction: column;
  background: transparent;
  margin-top: 27px;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;

  @media screen and (max-width: 870px) {
    width: 80%;
  }
`;

export default function Form({ setAuth, formType }) {
  const [inputFieldError, setInputFieldError] = React.useState('[]');
  const { isAuthenticated } = React.useContext(AuthContext);
  const [authenticating, setAuthenticating] = React.useState(false);

  React.useEffect(() => {
    const initialLength = formType === 'login' ? 2 : 3;
    const initialArray = JSON.stringify(new Array(initialLength).fill(true));
    setInputFieldError(initialArray);
  }, [formType]);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputFieldError.includes(true)) return;

    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
    setAuthenticating(true);

    if (formType === 'login') {
      setTimeout(() => setAuth(handleLogin(extractedFormData)), 1500);
    } else {
      setTimeout(() => setAuth(handleSignUp(extractedFormData)), 1500);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/chat' />;
  } else if (authenticating) {
    return <p>Authenticating</p>;
  } else {
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
          onSubmit={handleSubmit}
          initial='hidden'
          animate='visible'
          autoComplete='off'>
          <AnimatePresence>
            <InputField
              key='username'
              index={0}
              motionProps={{
                variants: itemVariant,
                positionTransition: true,
                exit: 'hidden',
              }}
              name='username'
              label='Username'
              formState={{ formType, setInputFieldError }}
            />

            <InputField
              key='password-field'
              index={1}
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
                key='confirmPassword-field-2'
                index={2}
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
              disabled={inputFieldError.includes(true)}
              value={formType === 'login' ? 'Login' : 'Sign Up'}
            />
          </AnimatePresence>
        </FormContainer>
      </>
    );
  }
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
