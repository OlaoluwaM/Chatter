import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorPicker from './CustomColorPicker';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { extractFormData, hexToRgb } from '../utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { FormTitle, InputField, SubmitButton } from './Form-Components';
import { containerVariant, itemVariant, spring } from '../utils/motionObj';
import { handleLogin, handleSignUp, setAvatarColor } from '../utils/authFunc';


const FormContainer = styled(motion.form)`
  display: flex;
  background: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  flex-basis: 85%;
  height: fit-content;
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  background: ${({ theme }) => theme.main};
  margin-top: 25px;
  border-radius: 50px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;

export default function Form({ setAuth, formType }) {
  const [inputFieldError, setInputFieldError] = React.useState(false);
  const formRef = React.useRef();
  const { authed, color } = React.useContext(AuthContext);

  React.useEffect(() => {
    return () => setInputFieldError(false);
  }, [formType]);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputFieldError) return;

    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
    extractedFormData['color'] = setAvatarColor(extractedFormData, color);
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
            key='name-field'
            MotionProps={{
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

          <ColorPicker
            key='colorInput'
            setAuthColor={setAuth}
            btnText={
              formType === 'login' ? 'Change avatar Color' : 'pick a color'
            }
            MotionProps={{
              variants: itemVariant,
              layoutTransition: spring,
              exit: 'hidden',
            }}
          />

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
