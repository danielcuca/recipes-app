import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name=""
          id="email"
          placeholder="Digite seu email"
        />
      </label>

      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name=""
          id="password"
          placeholder="Digite sua senha"
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="submit"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
