import { useEffect } from 'react';

import {
  useSession,
  SessionProvider,
  useRoomContext,
} from '@livekit/components-react';
import { TokenSource } from 'livekit-client';

import { config } from '../../../config/AppConfig';

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function VideoPublisherPage() {
  const session = useSession(tokenSource, { roomName: livekitRoom });
  console.log('session', session);

  // Start the session
  useEffect(() => {
    session.start();

    return () => {
      session.end();
    };
  }, [session]);

  return (
    <SessionProvider session={session}>
      <PublisherComponent />
    </SessionProvider>
  );
}

export function PublisherComponent() {
  const room = useRoomContext();
  room.localParticipant.setCameraEnabled(true);

  return (
    <div className="p-4">
      Room {room.name.length > 0 ? room.name : 'unknown'}: camera is enabled
    </div>
  );
}
