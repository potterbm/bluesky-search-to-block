import {
  createContext,
} from 'react';
import type { XRPC } from '@atcute/client';

export interface AuthContextType {
  rpc?: XRPC;
  isAuthed: boolean;
  loading: boolean;
  error?: string;
  username: string;
  finalizeAuth: (params: URLSearchParams) => void;
}

export const emptyContext: AuthContextType = {
  rpc: undefined,
  isAuthed: false,
  loading: false,
  username: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  finalizeAuth: () => {},
};

export const AuthContext = createContext(emptyContext);
