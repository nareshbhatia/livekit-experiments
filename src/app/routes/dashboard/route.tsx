import { useEffect } from 'react';

import {
  useSession,
  SessionProvider,
  useTracks,
  VideoTrack,
  useRoomContext,
} from '@livekit/components-react';
import { TokenSource, Track } from 'livekit-client';

import { config } from '../../../config/AppConfig';

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function Dashboard() {
  const session = useSession(tokenSource, { roomName: livekitRoom });
  console.log('session', session);

  // Start the session
  useEffect(() => {
    console.log('Starting dashboard session...');
    session.start();

    return () => {
      console.log('Ending dashboard session...');
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={session}>
      <CameraTracks />
    </SessionProvider>
  );
}

export function CameraTracks() {
  const room = useRoomContext();
  const cameraTrackRefs = useTracks([Track.Source.Camera], {
    onlySubscribed: true,
  });

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-lg font-bold">{room.name}</h1>
      <p className="text-sm text-muted-foreground">
        Tracks: {cameraTrackRefs.length}
      </p>
      <div className="flex flex-col gap-2 mt-4">
        {cameraTrackRefs.map((trackRef) => (
          <VideoTrack key={trackRef.participant.identity} trackRef={trackRef} />
        ))}
      </div>
    </div>
  );
}
