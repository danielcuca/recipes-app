import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  const emailIsValid = (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue); // Regex para checar o campo de email

  const validateForm = (emailValue, passwordValue) => {
    const sizePassword = 6; // Inserido para evitar magic number
    const isValid = emailIsValid(emailValue) && passwordValue.length > sizePassword;
    setFormValid(isValid);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateForm(value, password);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validateForm(email, value);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            value={ email }
            onChange={ handleEmailChange }
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            value={ password }
            onChange={ handlePasswordChange }
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />
        </label>

        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !formValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
