/** socket.io
 * socket.io's main function is to implement communication
 * @author acp21z0-Ziyi Ouyang
 */

exports.init = function(io) {
  io.sockets.on('connection', function (socket) {
    try {


      /** Creating or joining rooms
       * send  message to the user
       *
       */

      socket.on('create or join', function (room, userId) {
        socket.join(room);
        io.sockets.to(room).emit('joined', room, userId);
      });

      socket.on('chat', function (room, userId, chatText) {
        io.sockets.to(room).emit('chat', room, userId, chatText);
      });

      socket.on('disconnect', function(){
        console.log('someone disconnected');
      });

      socket.on('draw', function (room, userId, width, height,prevX,prevY,currX,currY,color,thickness) {
        socket.broadcast.to(room).emit('draw', room, userId, width, height,prevX,prevY,currX,currY,color,thickness);
      });

      socket.on('knowledge graph', function (room, name, id, description, url) {
        socket.broadcast.to(room).emit('knowledge graph', room, name, id, description, url);
      });
    }
    catch (e) {
    }
  });
}
