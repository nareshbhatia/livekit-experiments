import { useEffect, useRef, useState } from 'react';

import {
  useSession,
  SessionProvider,
  useRoomContext,
} from '@livekit/components-react';
import { ConnectionState, TokenSource, Track } from 'livekit-client';

import {
  Field,
  FieldDescription,
  FieldLabel,
} from '../../../components/ui/field';
import { config } from '../../../config/AppConfig';

/** Video element with captureStream (not in all TypeScript libs) */
type VideoElementWithCapture = HTMLVideoElement & {
  captureStream(): MediaStream;
};

const { livekitRoom, livekitSandboxId } = config;

// Create the TokenSource
const tokenSource = TokenSource.sandboxTokenServer(livekitSandboxId);

export function ShareVideoPage() {
  const session = useSession(tokenSource, { roomName: livekitRoom });

  // Start the session
  useEffect(() => {
    console.log('Starting share video session...');
    session.start({ tracks: { microphone: { enabled: false } } });

    return () => {
      console.log('Ending share video session...');
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={session}>
      <ShareVideoComponent />
    </SessionProvider>
  );
}

export function ShareVideoComponent() {
  const room = useRoomContext();

  const sourceVideoRef = useRef<HTMLVideoElement>(null);
  const publicationRef = useRef<Awaited<
    ReturnType<typeof room.localParticipant.publishTrack>
  > | null>(null);

  const [videoFileUrl, setVideoFileUrl] = useState<string | undefined>();
  const [capturedStream, setCapturedStream] = useState<
    MediaStream | undefined
  >();
  const [isPublished, setIsPublished] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Create a blob URL pointing to the file object
    const blobUrl = file ? URL.createObjectURL(file) : undefined;
    setVideoFileUrl(blobUrl);
    setCapturedStream(undefined);
  };

  const handleVideoPlaying = () => {
    const videoElement = sourceVideoRef.current;
    if (!videoElement) return;
    const stream = (videoElement as VideoElementWithCapture).captureStream();
    setCapturedStream(stream);
  };

  // Revoke the current videoFileUrl when it changes or the component unmounts
  useEffect(() => {
    return () => {
      if (videoFileUrl) {
        URL.revokeObjectURL(videoFileUrl);
      }
    };
  }, [videoFileUrl]);

  // Stop the previous stream when it changes or the component unmounts
  useEffect(() => {
    return () => {
      if (capturedStream) {
        capturedStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [capturedStream]);

  // Publish the captured video track to LiveKit when capturedStream is set; unpublish the track in cleanup
  useEffect(() => {
    if (!capturedStream) return;

    const videoTrack = capturedStream.getVideoTracks()[0];
    if (!videoTrack) return;

    let cancelled = false;
    let connectionStateListener: ((state: ConnectionState) => void) | null =
      null;

    const startPublish = async () => {
      if (room.state !== ConnectionState.Connected) {
        await new Promise<void>((resolve) => {
          connectionStateListener = (state: ConnectionState) => {
            if (state === ConnectionState.Connected) {
              room.off('connectionStateChanged', connectionStateListener!);
              connectionStateListener = null;
              resolve();
            }
          };
          room.on('connectionStateChanged', connectionStateListener);
        });
      }
      if (cancelled) {
        videoTrack.stop();
        return;
      }
      try {
        const pub = await room.localParticipant.publishTrack(videoTrack, {
          source: Track.Source.Camera,
          name: 'file-video',
        });
        if (!cancelled) {
          publicationRef.current = pub;
          setIsPublished(true);
        } else {
          pub.track?.stop();
        }
      } catch {
        videoTrack.stop();
      }
    };

    startPublish();

    return () => {
      cancelled = true;
      setIsPublished(false);
      if (connectionStateListener) {
        room.off('connectionStateChanged', connectionStateListener);
      }
      const pub = publicationRef.current;
      if (pub) {
        const track = pub.track;
        publicationRef.current = null;
        if (track) {
          try {
            room.localParticipant.unpublishTrack(track, true);
          } finally {
            track.stop();
          }
        }
      }
    };
  }, [capturedStream, room]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-bold">{room.name}</h1>

      {/* Video file input */}
      <Field>
        <FieldLabel htmlFor="share-video-input">Share video</FieldLabel>
        <input
          id="share-video-input"
          type="file"
          accept="video/*"
          className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          onChange={handleFileChange}
        />
        <FieldDescription>Choose a video to share.</FieldDescription>
      </Field>

      {isPublished && (
        <p className="text-sm text-muted-foreground">
          Video published to room. Open the Meet page in another tab to see it.
        </p>
      )}

      {/* Local preview */}
      {videoFileUrl && (
        <video
          ref={sourceVideoRef}
          src={videoFileUrl}
          className="max-w-xs rounded-md border bg-muted"
          autoPlay
          controls
          loop
          playsInline
          onPlaying={handleVideoPlaying}
        />
      )}
    </div>
  );
}
