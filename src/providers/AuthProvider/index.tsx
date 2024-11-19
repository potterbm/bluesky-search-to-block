import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  configureOAuth,
  finalizeAuthorization,
  OAuthUserAgent,
} from '@atcute/oauth-browser-client';
import { XRPC } from '@atcute/client';
import { AuthContext, type AuthContextType } from './context';

configureOAuth({
  metadata: {
    client_id: `${import.meta.env.VITE_APP_URL}/oauth/client-metadata.json`,
    redirect_uri: `${import.meta.env.VITE_APP_URL}`,
  },
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [rpc, setRpc] = useState<XRPC>();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalizeAuth = useCallback(async (params: URLSearchParams) => {
    setLoading(true);
    const session = await finalizeAuthorization(params);

    // now you can start making requests!
    const agent = new OAuthUserAgent(session);

    setRpc(new XRPC({ handler: agent }));
    setIsAuthed(true);
    setLoading(false);

    // const { data } = await rpc.get('com.atproto.identity.resolveHandle', {
    // 	params: {
    // 		handle: 'mary.my.id',
    // 	},
    // });
  }, []);

  // TODO: resume session

  const value: AuthContextType = useMemo(
    () => ({
      rpc,
      isAuthed,
      loading,
      finalizeAuth,
      username: '',
    }),
    [finalizeAuth, isAuthed, loading, rpc]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
