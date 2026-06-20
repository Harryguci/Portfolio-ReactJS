const listeners = new Set();

export function onSectionReveal(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function emitSectionReveal(payload) {
  listeners.forEach((callback) => callback(payload));
}
