import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import { useLogin } from '../providers/AuthProvider/hooks';
import { Button, Heading, Input, VStack } from '@chakra-ui/react';

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
    <VStack width="100%" justifyContent="center" alignItems="center">
      <VStack
        padding={2}
        border="1px solid rgba(0, 0, 0, 0.1)"
        borderRadius="1em"
      >
        <Heading>Username</Heading>
        <Input
          type="text"
          id="atproto-handle"
          placeholder="user.bsky.social"
          value={username}
          onChange={handleUsernameChange}
          data-1p-ignore
          data-lpignore="true"
          autoComplete="off"
          autoCapitalize="off"
        />
        <Button onClick={handleLogin}>Login</Button>
      </VStack>
    </VStack>
  );
}
