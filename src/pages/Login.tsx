import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import { useLogin } from '../providers/AuthProvider/hooks';

export default function Login() {
  const [username, setUsername] = useState('');
  const login = useLogin();

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setUsername(event.currentTarget.value),
    [setUsername]
  );

  const handleLogin: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();

      // TODO: check that username has an @ (or doesn't have one)

      const loginUsername = username;
      setUsername('');

      void login(loginUsername);
    },
    [username, login]
  );

  return (
    <div>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
