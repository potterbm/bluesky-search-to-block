import { useEffect } from 'react';
import { useFinalizeAuth } from '../providers/AuthProvider/hooks';

export default function LoginCallback() {
  // `createAuthorizationUrl` asks for the server to redirect here with the
  // parameters assigned in the hash, not the search string.
  const params = new URLSearchParams(location.hash.slice(1));

  // this is optional, but after retrieving the parameters, we should ideally
  // scrub it from history to prevent this authorization state to be replayed,
  // just for good measure.
  useEffect(() => {
    history.replaceState(null, '', location.pathname + location.search);
  }, []);

  useFinalizeAuth(params);

  return <div>Logging in</div>;
}
