import React from 'react';
import Authenticate from '../components/Auth';

import { act } from 'react-dom/test-utils';
import { themeObj } from '../components/context/context';
import { ThemeProvider } from 'styled-components';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const onSubmit = jest.fn();
beforeEach(() => {
  render(
    <ThemeProvider theme={themeObj}>
      <Authenticate onSubmit={onSubmit} />
    </ThemeProvider>
  );
});

describe('Auth Component state tests', () => {
  test('Should render as a login first', () => {
    expect(
      screen.getByText((content, elem) => {
        return elem.tagName.toLowerCase() === 'h2' && content === 'Log in';
      })
    ).toBeInTheDocument();
  });

  test('Should switch to sign up', () => {
    // Arrange
    const switchText = screen.getByText(/not a member/i);
    // Act
    fireEvent.click(switchText);
    //Assert
    expect(
      screen.getByText((content, elem) => {
        return elem.tagName.toLowerCase() === 'h2' && content === 'Sign up';
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm Password/i)).toBeInTheDocument();
  });

  test('Error messages should be displayed', async () => {
    // Arrange
    const authForm = screen.getByTestId('authForm');
    // Act
    await act(async () => {
      fireEvent.submit(authForm);
    });
    // Assert
    expect(
      Array.isArray(Array.from(authForm.querySelectorAll('.error')))
    ).toBeTruthy();
  });
});

const testData = {
  validUsername: 'Olaoluwa222',
  validPassword: 'ThisIs@SafePass()rd111',
  invalidUsername: 'ola',
  invalidPassword: '123',
};

async function generalElements(sc) {
  const usernameInput = await sc.findByLabelText(/username/i);
  const passwordInput = await sc.findByLabelText(/^password/i);
  const submitButton = await sc.findByRole('button');
  return { usernameInput, passwordInput, submitButton };
}

describe('Login tests', () => {
  test('With valid inputs', async () => {
    // Arrange
    const {
      usernameInput,
      passwordInput,
      submitButton,
    } = await generalElements(screen);
    const { validPassword, validUsername } = testData;
    // Act
    await act(async () => {
      fireEvent.input(usernameInput, {
        target: { value: validUsername },
      });
      fireEvent.input(passwordInput, {
        target: { value: validPassword },
      });
      fireEvent.submit(submitButton);
    });
    // Assert
    expect(onSubmit).toHaveBeenCalled();
  });

  describe('With invalid inputs', () => {
    test('Invalid username', async () => {
      // Arrange
      const { usernameInput, submitButton } = await generalElements(screen);
      const { invalidUsername } = testData;
      // Act
      await act(async () => {
        fireEvent.input(usernameInput, { target: { value: invalidUsername } });
        fireEvent.submit(submitButton);
      });
      // Assert;
      const correspondingError = await screen.findByTestId(/Username-id/i, {
        selector: 'p',
      });
      expect(correspondingError).toBeDefined();
      expect(correspondingError).toBeInTheDocument();
    });

    test('Invalid password', async () => {
      // Arrange
      const submitButton = await screen.findByRole('button');
      // Act
      await act(async () => {
        fireEvent.submit(submitButton);
      });
      // Assert;
      const correspondingError = await screen.findByTestId(/password-id/i, {
        selector: 'p',
      });
      expect(correspondingError).toBeDefined();
      expect(correspondingError).toBeInTheDocument();
    });
  });
});

describe('Sign up tests', () => {
  beforeEach(() => {
    const switchText = screen.getByText(/not a member/i);

    fireEvent.click(switchText);
  });

  test('With valid inputs', async () => {
    // Arrange
    const {
      usernameInput,
      passwordInput,
      submitButton,
    } = await generalElements(screen);
    const confirmPasswordInput = await screen.findByLabelText(
      /confirm password/i
    );
    const { validPassword, validUsername } = testData;
    // Act
    await act(async () => {
      fireEvent.input(usernameInput, {
        target: {
          value: validUsername,
        },
      });
      fireEvent.input(passwordInput, {
        target: {
          value: validPassword,
        },
      });
      fireEvent.input(confirmPasswordInput, {
        target: {
          value: validPassword,
        },
      });
      fireEvent.submit(submitButton);
    });
    // Assert
    expect(onSubmit).toHaveBeenCalled();
  });

  describe('With invalid inputs', () => {
    test('Invalid username', async () => {
      // Arrange
      const { usernameInput, submitButton } = await generalElements(screen);
      const { invalidUsername } = testData;
      // Act
      await act(async () => {
        fireEvent.input(usernameInput, { target: { value: invalidUsername } });
        fireEvent.submit(submitButton);
      });
      // Assert
      const correspondingError = await screen.findByTestId(/username-id/i, {
        selector: 'p',
      });
      expect(correspondingError).toBeDefined();
      expect(correspondingError).toBeInTheDocument();
    });

    test('Invalid password', async () => {
      // Arrange
      const { passwordInput, submitButton } = await generalElements(screen);
      const { invalidPassword } = testData;
      // Act
      await act(async () => {
        fireEvent.input(passwordInput, {
          target: {
            value: invalidPassword,
          },
        });
        fireEvent.submit(submitButton);
      });
      // Assert
      const correspondingError = await screen.findByTestId(/^password-id/i, {
        selector: 'p',
      });
      expect(correspondingError).toBeDefined();
      expect(correspondingError).toBeInTheDocument();
    });

    test('Invalid confirm password input', async () => {
      // Arrange
      const { passwordInput, submitButton } = await generalElements(screen);
      const confirmPasswordInput = await screen.findByLabelText(
        /confirm password/i
      );
      const { invalidPassword, validPassword } = testData;
      // Act
      await act(async () => {
        fireEvent.input(passwordInput, {
          target: {
            value: validPassword,
          },
        });
        fireEvent.input(confirmPasswordInput, {
          target: { value: invalidPassword },
        });
        fireEvent.submit(submitButton);
      });
      // Assert
      const correspondingError = await screen.findByTestId(
        /confirmPassword-id/i,
        {
          selector: 'p',
        }
      );
      expect(correspondingError).toBeDefined();
      expect(correspondingError).toBeInTheDocument();
    });
  });
});
