const socket = io.connect();
const video = document.querySelector('video');


const peer = new SimplePeer();

console.log(peer);

socket.on('offer', (data) => {
  // console.log(data);
  peer.signal(JSON.parse(data));
});

peer.on('stream', (stream) => {
  // got remote video stream, now let's show it in a video tag
  console.log(stream.getVideoTracks());
  video.srcObject = stream;
  video.play();
  console.log(video.readyState);
});

document.querySelector('#plei').addEventListener('click', () => {
  alert('moro');

});
