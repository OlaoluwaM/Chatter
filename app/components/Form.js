import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';
import { handleLogin, handleSignUp } from '../utils/authFunc';
import { motion, AnimatePresence, useInvertedScale } from 'framer-motion';
import { FormTitle, InputField, SubmitButton } from './Form-Components';

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
  const [error, setError] = React.useState(null);
  const formRef = React.useRef();
  const { authed } = React.useContext(AuthContext);

  React.useEffect(() => {
    setError(null);
  }, [formType]);

  const handleSubmit = e => {
    setError(null);
    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
    e.preventDefault();

    if (formType === 'login') {
      if (Object.keys(handleLogin(extractedFormData)).includes('error')) {
        setError(handleLogin(extractedFormData));
      }
      formRef.current.style.opacity = 0.4;
      setTimeout(() => setAuth(handleLogin(extractedFormData)), 1500);
    } else {
      if (Object.keys(handleSignUp(extractedFormData)).includes('error')) {
        setError(handleSignUp(extractedFormData));
      }
      formRef.current.style.opacity = 0.4;
      setTimeout(() => setAuth(handleSignUp(extractedFormData)), 1500);
    }
  };

  const containerVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        dealyChildren: 0.1,
      },
    },

    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const itemVariant = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        mass: 1,
        tension: 180,
        friction: 12,
      },
    },
    hidden: {
      opacity: 0,
      x: 100,
    },
  };

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  };

  // const { scaleX, scaleY } = useInvertedScale();
  return (
    <FormContainer
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      ref={formRef}
      onSubmit={handleSubmit}
      autoComplete='off'>
      {authed && <Redirect to='/' />}

      {!authed && (
        <AnimatePresence>
          <FormTitle
            key='form-title'
            variants={itemVariant}
            exit='hidden'
            positionTransition={spring}>
            {formType === 'login' ? 'Login' : 'Create An Account'}
          </FormTitle>

          <InputField
            key='id-field'
            MotionProps={{
              variants: itemVariant,
              exit: 'hidden',
              layoutTransition: spring,
            }}
            error={error}
            name='id'
            label='Username'
          />

          <InputField
            key='password-field'
            MotionProps={{
              variants: itemVariant,
              layoutTransition: spring,
              exit: 'hidden',
            }}
            error={error}
            name='password'
            type='password'
            label='Password'
            validate={formType !== 'login' ? true : false}
          />

          {formType !== 'login' && (
            <InputField
              key='confirmPassword-field'
              MotionProps={{
                variants: itemVariant,
                layoutTransition: spring,
                exit: 'hidden',
              }}
              error={error}
              name='confirmPassword'
              type='password'
              label='Confirm Password'
            />
          )}

          <SubmitButton
            key='submit-button'
            exit='hidden'
            variants={itemVariant}
            type='submit'
            name='btn'
            layoutTransition={spring}
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
