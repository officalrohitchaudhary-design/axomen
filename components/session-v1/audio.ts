"use client";

/**
 * Plays the zen-tone sound effect on user interactions (Continue button, Card selection).
 * Reuses or creates an Audio element safely on client-side.
 */
export function playZenTone() {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio("/music/zen-tone.mp3");
    audio.volume = 0.85;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Fallback or ignore browser policy errors
        console.log("Audio playback note:", err.message);
      });
    }
  } catch (error) {
    // Graceful silent fallback
    console.error("Audio error:", error);
  }
}
