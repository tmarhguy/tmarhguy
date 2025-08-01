// Simple event system for triggering the time capsule from anywhere
export const openTimeCapsule = () => {
  window.dispatchEvent(new CustomEvent('openTimeCapsule'));
};
