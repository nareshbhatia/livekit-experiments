import { useEffect, useState } from 'react';

import {
  useSession,
  SessionProvider,
  useRoomContext,
} from '@livekit/components-react';
import { TokenSource } from 'livekit-client';

import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { config } from '../../../config/AppConfig';

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function CameraPage() {
  const session = useSession(tokenSource, { roomName: livekitRoom });
  console.log('session', session);

  // Start the session
  useEffect(() => {
    console.log('Starting camera session...');
    session.start();

    return () => {
      console.log('Ending camera session...');
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={session}>
      <CameraComponent />
    </SessionProvider>
  );
}

export function CameraComponent() {
  const room = useRoomContext();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

  useEffect(() => {
    room.localParticipant.setCameraEnabled(cameraEnabled);
  }, [room, cameraEnabled]);

  useEffect(() => {
    room.localParticipant.setMicrophoneEnabled(microphoneEnabled);
  }, [room, microphoneEnabled]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-bold">{room.name}</h1>

      {/* Camera Toggle */}
      <div className="flex items-center gap-2">
        <Label htmlFor="camera-toggle">Camera</Label>
        <Switch
          id="camera-toggle"
          checked={cameraEnabled}
          onCheckedChange={(checked) => {
            setCameraEnabled(checked);
          }}
        />
      </div>

      {/* Microphone Toggle */}
      <div className="flex items-center gap-2">
        <Label htmlFor="microphone-toggle">Microphone</Label>
        <Switch
          id="microphone-toggle"
          checked={microphoneEnabled}
          onCheckedChange={(checked) => {
            setMicrophoneEnabled(checked);
          }}
        />
      </div>
    </div>
  );
}
