import { useContext, useMemo } from 'react';
// import type { XRPC } from '@atcute/client';
import { AuthContext } from './context';
import type { Agent } from '@atproto/api';

export function useAuthState() {
  const { isAuthed, did, error } = useContext(AuthContext);

  return useMemo(
    () => ({
      isAuthed,
      did,
      error,
    }),
    [did, error, isAuthed]
  );
}

export function useLogin() {
  return useContext(AuthContext).login;
}

export function useIdentity(): [string, boolean] {
  const context = useContext(AuthContext);
  return [context.did, context.isAuthed];
}

// export function useFinalizeAuth(params?: URLSearchParams): void {
//   const { finalizeAuth } = useContext(AuthContext);

//   if (!params) return;

//   finalizeAuth(params);
// }

export function useAgent(): Agent | undefined {
  return useContext(AuthContext).agent;
}
