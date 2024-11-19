import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import { resolveFromIdentity } from '@atcute/oauth-browser-client';
import { createAuthorizationUrl } from '@atcute/oauth-browser-client';

async function login(username: string) {
  const { identity, metadata } = await resolveFromIdentity(username);
  console.log('identity, metadata', identity, metadata);

  const authUrl = await createAuthorizationUrl({
    metadata: metadata,
    identity: identity,
    scope: 'atproto transition:generic transition:chat.bsky',
  });
  console.log('authUrl', authUrl);
  window.location.assign(authUrl);
}

export default function Login() {
  const [username, setUsername] = useState('');

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
    [username, setUsername]
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
