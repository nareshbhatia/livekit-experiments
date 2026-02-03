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

export function TracksPage() {
  const session = useSession(tokenSource, { roomName: livekitRoom });

  // Start the session
  useEffect(() => {
    console.log('Starting tracks session...');
    session.start();

    return () => {
      console.log('Ending tracks session...');
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

  // Get active camera tracks
  const cameraTrackRefs = useTracks([Track.Source.Camera], {
    onlySubscribed: true,
  });
  const activeCameraTrackRefs = cameraTrackRefs.filter(
    (trackRef) => trackRef.publication && !trackRef.publication.isMuted,
  );

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-lg font-bold">{room.name}</h1>
      <p className="text-sm text-muted-foreground">
        Tracks: {activeCameraTrackRefs.length}
      </p>
      <div className="flex flex-col gap-2 mt-4">
        {activeCameraTrackRefs.map((trackRef) => (
          <VideoTrack key={trackRef.participant.identity} trackRef={trackRef} />
        ))}
      </div>
    </div>
  );
}
