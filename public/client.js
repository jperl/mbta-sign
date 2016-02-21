var pitch = 20;

$(document).ready(function () {
  var socket = io.connect();

  // get canvas element and create context
  var canvas = document.getElementById('matrix');
  canvas.width = 64 * pitch;
  canvas.height = 32 * pitch;

  var context = canvas.getContext('2d');

  // draw canvas received from server
  socket.on('draw', function (pixels) {
    var x = 0;
    var y = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < pixels.length; i = i + 4) {
      var r = pixels[i];
      var g = pixels[i + 1];
      var b = pixels[i + 2];
      var a = Math.round((pixels[i + 3] / 256) * 100) / 100;

      // Plate color
      context.fillStyle = 'rgba(0,0,0,1)';
      context.fillRect(x, y, pitch, pitch);

      context.beginPath();
      context.arc(x + (pitch / 2), y + (pitch / 2), pitch / 3, 0, 2 * Math.PI, false);
      context.fillStyle = `rgba(${r},${g},${b},${a})`;

      context.fill();

      x += pitch;
      if (x % canvas.width === 0) {
        x = 0;
        y += pitch;
      }
    }
  });
});
