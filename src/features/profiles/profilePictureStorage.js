const STORAGE_PREFIX = "profilePicture_";

const isBrowser = typeof window !== "undefined";

/**
 * Get a saved profile picture for a given profile ID.
 * @param {string} profileId
 * @returns {string|null} Base64 image string or null
 */
export function getProfilePicture(profileId) {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${profileId}`);
  } catch (e) {
    console.warn("profilePictureStorage: read failed", e);
    return null;
  }
}

/**
 * Save a profile picture (base64) to localStorage.
 * Handles QuotaExceededError gracefully.
 * @param {string} profileId
 * @param {string} base64
 */
export function setProfilePicture(profileId, base64) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${profileId}`, base64);
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.warn(
        "profilePictureStorage: localStorage quota exceeded — image not persisted"
      );
    } else {
      console.warn("profilePictureStorage: write failed", e);
    }
  }
}

/**
 * Remove a saved profile picture from localStorage.
 * @param {string} profileId
 */
export function removeProfilePicture(profileId) {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${profileId}`);
  } catch (e) {
    console.warn("profilePictureStorage: remove failed", e);
  }
}
