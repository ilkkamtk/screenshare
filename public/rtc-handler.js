const video = document.querySelector('video');
const socket = io.connect();
let peer = null;

const init = async () => {
  try {
    // This peer is the initiator and transfering the streaming to the other connected peer

    let stream = await navigator.mediaDevices.getDisplayMedia(
        {video: true, audio: false});
    video.srcObject = stream;
    peer = new SimplePeer({
      initiator: true,
      stream: stream,
    });

    peer.on('signal', (data) => {
      // console.log('signal', JSON.stringify(data));
      socket.emit('signal', data);
    });

    socket.on('startConnection', () => {
      if (peer) peer.destroy();
      peer = new SimplePeer({initiator: true, stream: stream});
      peer.on('signal', data => {
        socket.emit('signal', data);
      });

    });

    socket.on('signal', data => {
      peer.signal(data);
    });
  }
  catch (error) {
    console.log(error);
  }
};

init();
