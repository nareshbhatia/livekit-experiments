import { useEffect } from 'react';

import {
  useSession,
  SessionProvider,
  useTracks,
  VideoTrack,
} from '@livekit/components-react';
import { TokenSource, Track } from 'livekit-client';

import { config } from '../../../config/AppConfig';

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function VideoViewerPage() {
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
      <ViewerComponent />
    </SessionProvider>
  );
}

export function ViewerComponent() {
  const cameraTrackRefs = useTracks([Track.Source.Camera]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">
        Track count: {cameraTrackRefs.length}
      </h1>
      {cameraTrackRefs.map((trackRef) => (
        <VideoTrack key={trackRef.participant.identity} trackRef={trackRef} />
      ))}
    </div>
  );
}
