$(document).ready(function () {
  var socket = io.connect();

  // get canvas element and create context
  var canvas = document.getElementById('matrix');
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

      context.fillStyle = `rgba(${r},${g},${b},${a})`;
      context.fillRect(x, y, 1, 1);

      // if (r !== 0) {
      //   context.fillStyle = `rgb(${r},${g},${b})`;
      //   context.fillRect(x, y, 1, 1);
      // }

      x++;
      if (x % 64 === 0) {
        x = 0;
        y++;
      }
    }
  });
});
