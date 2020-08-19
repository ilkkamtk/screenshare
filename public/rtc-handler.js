const video = document.querySelector('video');
const socket = io.connect();
/*
const sender = Math.round(Math.random() * 999999999) + 999999999;
const channel = 'ilkkamtk';

const startCapture = async (displayMediaOptions) => {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia({video:true, audio:false});
    socket.emit('initiate');
  } catch (err) {
    console.error('Error: ' + err);
  }
  return captureStream;
};

document.querySelector('#initiateBtn').addEventListener('click', async () => {
  const stream = await startCapture();
  // console.log(stream);
  var peer = new SimplePeer({
    initiator: true,
    stream: stream,
  });

  peer.on('signal', (data) => {
    console.log('signal');
    socket.emit('offer', JSON.stringify(data));
  });

  video.srcObject = stream;
  video.play();
});
*/
let peer = null;
const init = async () => {
  try {
    // This peer is the initiator and transfering the streaming to the other connected peer
    if (location.hash === '#init') {
      let stream = await navigator.mediaDevices.getDisplayMedia(
          {video: true, audio: false});
      peer = new SimplePeer({
        initiator: location.hash === '#init',
        stream: stream,
      });
    } else {
      peer = new SimplePeer();
    }

    // triggers when signal is sent from remote
    peer.on('signal', function(data) {
      console.log('signal', JSON.stringify(data));
      socket.emit('offer', JSON.stringify(data));
    });

    peer.on('data', (data) => {
      console.log('Received Data: ' + data);
    });

    peer.on('stream', (stream) => {
      console.log('stream');
      // got remote video stream, now let's show it in a video tag
      video.srcObject = stream;
    });
  } catch (error) {
    console.log(error);
  }
};

init();

document.querySelector('#initiateBtn').addEventListener('click', () => {
  peer.signal('ilkkamtk');
});
