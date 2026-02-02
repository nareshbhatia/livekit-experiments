/**
 * Application configuration
 * Reads from Vite environment variables
 */

interface AppConfig {
  livekitRoom: string;
  livekitSandboxId: string;
}

/**
 * Load configuration from environment variables
 */
function loadConfig(): AppConfig {
  const livekitRoom = import.meta.env.VITE_LIVEKIT_ROOM;
  const livekitSandboxId = import.meta.env.VITE_LIVEKIT_SANDBOX_ID;

  // Validation
  if (!livekitRoom) {
    throw new Error(
      'VITE_LIVEKIT_ROOM is not set. ' +
        'Create a .env.local file with VITE_LIVEKIT_ROOM=livekit-test-room',
    );
  }

  if (!livekitSandboxId) {
    throw new Error(
      'VITE_LIVEKIT_SANDBOX_ID is not set. ' +
        'Create a .env.local file with VITE_LIVEKIT_SANDBOX_ID=your_livekit_sandbox_id',
    );
  }

  return {
    livekitRoom,
    livekitSandboxId,
  };
}

/**
 * Singleton config instance
 */
export const config = loadConfig();

// Log config on startup
if (import.meta.env.MODE === 'development') {
  console.log('[Config] Loaded configuration:', config);
}
