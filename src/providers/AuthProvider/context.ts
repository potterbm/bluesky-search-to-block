import type { Agent } from '@atproto/api';
import { createContext } from 'react';
// import type { XRPC } from '@atcute/client';

export interface AuthContextType {
  agent?: Agent;
  // rpc?: XRPC;
  isAuthed: boolean;
  error?: string;
  did: string;
  // finalizeAuth: (params: URLSearchParams) => void;
  login: (username: string) => Promise<void>;
}

export const emptyContext: AuthContextType = {
  agent: undefined,
  // rpc: undefined,
  isAuthed: false,
  did: '',

  // finalizeAuth: () => {},
  login: () => Promise.resolve(undefined),
};

export const AuthContext = createContext(emptyContext);
