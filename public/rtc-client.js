const socket = io.connect();
const video = document.querySelector('video');

const attendee = new SimplePeer();
attendee.on('signal', data => {
  socket.emit('signal', data);
});

socket.on('signal', data => {
  attendee.signal(data);
});

// Get remote video stream and display it
attendee.on('stream', stream => {
  video.srcObject = stream;
});

// Ask broadcaster to start his connection
socket.emit('startConnection');
