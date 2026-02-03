import { useEffect } from 'react';

import {
  useSession,
  SessionProvider,
  VideoConference,
} from '@livekit/components-react';
import { TokenSource } from 'livekit-client';

import { config } from '../../../config/AppConfig';

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function MeetPage() {
  const session = useSession(tokenSource, { roomName: livekitRoom });

  // Start the session
  useEffect(() => {
    console.log('Starting meet session...');
    session.start();

    return () => {
      console.log('Ending meet session...');
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={session}>
      <VideoConference data-lk-theme="default" />
    </SessionProvider>
  );
}
