import {
  useContext,
  useMemo,
} from 'react';
import type { XRPC } from '@atcute/client';
import { AuthContext } from './context';

export function useAuthState() {
  const {isAuthed, loading, error} = useContext(AuthContext);

  return useMemo(() => ({
    isAuthed,
    loading,
    error,
  }), [error, isAuthed, loading]);
}

export function useIdentity(): [string, boolean] {
  const context = useContext(AuthContext);
  return [context.username, context.isAuthed];
}

export function useFinalizeAuth(params?: URLSearchParams): void {
  const { finalizeAuth } = useContext(AuthContext);

  if (!params) return;

  finalizeAuth(params);
}

export function useRpc(): XRPC | undefined {
  return useContext(AuthContext).rpc
}
