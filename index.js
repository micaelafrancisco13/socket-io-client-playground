const { io } = require('socket.io-client');
const config = require('config');

const SERVER_URL = process.env.SERVER_URL || config.get('SERVER_URL');

/**
 * Create the socket instance
 * The options below are examples of good default configurations.
 * - reconnectionAttempts: how many times to try to reconnect
 * - reconnectionDelay: how many ms to wait before each reconnection attempt
 */
const socket = io(SERVER_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

// ─────────────────────────────────────────────────────────────
// Connection Events
// ─────────────────────────────────────────────────────────────

socket.on('connect', () => {
    console.group('Socket Connected');
    console.log('Connected to server:', SERVER_URL);
    console.log('Socket ID:', socket.id);
    console.groupEnd();
});

socket.on('connect_error', (err) => {
    console.group('Connection Error');
    console.error('Failed to connect to server:', err.message);
    console.groupEnd();
});

socket.on('connect_timeout', () => {
    console.warn('Connection attempt to server timed out.');
});

socket.on('reconnecting', (attemptNumber) => {
    console.log(`Reconnecting... Attempt #${attemptNumber}`);
});

socket.on('reconnect_error', (err) => {
    console.warn('Reconnection error:', err.message);
});

socket.on('reconnect_failed', () => {
    console.error('Reconnection failed after maximum attempts.');
});

socket.on('disconnect', (reason) => {
    console.group('Socket Disconnected');
    console.log('Disconnected from server. Reason:', reason);
    console.groupEnd();
});

// ─────────────────────────────────────────────────────────────
// Custom Events
// ─────────────────────────────────────────────────────────────

/**
 * Listen for 'test-socket' event from the server.
 * This is where we receive data that the server broadcasts or emits.
 */
socket.on('test-socket', (data) => {
    console.group('test-socket event');
    console.log('Received data from server:', data);
    console.groupEnd();
});

/**
 * If you ever need to cleanly shut down your connection,
 * you can do so with socket.close() or socket.disconnect().
 */
// function cleanup() {
//   socket.disconnect();
// }

module.exports = {
    socket,
    // cleanup,
};
