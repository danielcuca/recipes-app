import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login', () => {
  const emailInputTestId = 'email-input';
  const passwordInputTestId = 'password-input';
  const submitButtonTestId = 'login-submit-btn';
  const emailExample = 'example@example.com';

  it('deve atualizar o estado do email corretamente', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId(emailInputTestId);

    fireEvent.change(emailInput, { target: { value: emailExample } });

    expect(emailInput.value).toBe(emailExample);
  });

  it('deve atualizar o estado da senha corretamente', () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId(passwordInputTestId);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('deve habilitar o botão de submit quando o formulário é válido', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId(emailInputTestId);
    const passwordInput = getByTestId(passwordInputTestId);
    const submitButton = getByTestId(submitButtonTestId);

    fireEvent.change(emailInput, { target: { value: emailExample } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton.disabled).toBe(false);
  });

  it('deve desabilitar o botão de submit quando o formulário é inválido', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId(emailInputTestId);
    const passwordInput = getByTestId(passwordInputTestId);
    const submitButton = getByTestId(submitButtonTestId);

    fireEvent.change(emailInput, { target: { value: emailExample } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(submitButton.disabled).toBe(true);
  });

  it('deve chamar a função de submissão do formulário quando o botão é clicado', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Login onSubmit={ handleSubmit } />);
    const submitButton = getByTestId(submitButtonTestId);

    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
