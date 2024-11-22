import { OAuthSession } from '@atproto/oauth-client-browser';

export function resultHasState(
  result:
    | { session: OAuthSession; state: string | null }
    | { session: OAuthSession }
    | undefined
): result is { session: OAuthSession; state: string | null } {
  if (result === undefined) return false;
  // @ts-expect-error i don't want to deal with this right now
  return result.state !== undefined;
}
