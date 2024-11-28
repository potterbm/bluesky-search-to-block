import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import {
//   configureOAuth,
//   finalizeAuthorization,
//   OAuthUserAgent,
// } from '@atcute/oauth-browser-client';
// import { XRPC } from '@atcute/client';
import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import { Agent } from '@atproto/api';
import { AuthContext, type AuthContextType } from './context';
import { resultHasState } from './utils';

const client = new BrowserOAuthClient({
  clientMetadata: {
    client_id: 'https://search-to-block.bryan.town/oauth/client-metadata.json',
    redirect_uris: ['https://search-to-block.bryan.town'],
    response_types: ['code'],
    grant_types: ['authorization_code', 'refresh_token'],
    scope: 'atproto',
    application_type: 'web',
    client_name: 'search-to-block',
    client_uri: 'https://search-to-block.bryan.town',
    token_endpoint_auth_method: 'none',
    dpop_bound_access_tokens: true,
  },
  handleResolver: 'https://bsky.social',
});

// configureOAuth({
//   metadata: {
//     client_id: `${import.meta.env.VITE_APP_URL}/oauth/client-metadata.json`,
//     redirect_uri: `${import.meta.env.VITE_APP_URL}`,
//   },
// });

let isClientInitialized = false;

export default function AuthProvider({ children }: PropsWithChildren) {
  // const [rpc, setRpc] = useState<XRPC>();
  const [agent, setAgent] = useState<Agent>();
  const [isAuthed, setIsAuthed] = useState(false);
  const [did, setDid] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isClientInitialized) return;
    isClientInitialized = true;

    void (async () => {
      const result = await client.init();
      if (!result) {
        console.error('No result from oauth client init');
        return;
      }

      if (resultHasState(result) && result.state !== null) {
        console.log(
          `${result.session.sub} was successfully authenticated (state: ${result.state})`
        );
      } else {
        console.log(`${result.session.sub} was restored (last active session)`);
      }

      setIsAuthed(true);
      setDid(result.session.did);
      setAgent(new Agent(result.session));
    })();
  }, []);

  const login = useCallback(async (username: string) => {
    try {
      await client.signIn(username, {
        state: '',
        prompt: 'login', // Attempt to sign in without user interaction (SSO)
        ui_locales: 'en', // Only supported by some OAuth servers (requires OpenID Connect support + i18n support)
        // signal: new AbortController().signal, // Optional, allows to cancel the sign in (and destroy the pending authorization, for better security)
      });
    } catch (err) {
      console.warn(
        'The user aborted the authorization process by navigating "back"',
        err
      );
      setError(
        'The user aborted the authorization process by navigating "back"'
      );
    }
  }, []);

  // const finalizeAuth = useCallback(async (params: URLSearchParams) => {
  //   setLoading(true);
  //   const session = await finalizeAuthorization(params);

  //   // now you can start making requests!
  //   const agent = new OAuthUserAgent(session);

  //   setRpc(new XRPC({ handler: agent }));
  //   setIsAuthed(true);
  //   setLoading(false);

  //   // const { data } = await rpc.get('com.atproto.identity.resolveHandle', {
  //   // 	params: {
  //   // 		handle: 'mary.my.id',
  //   // 	},
  //   // });
  // }, []);

  // TODO: resume session

  const value: AuthContextType = useMemo(
    () => ({
      agent,
      isAuthed,
      did,
      error,
      login,
    }),
    [agent, did, error, isAuthed, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
