/**acp21zo */
exports.init = function(io) {
  io.sockets.on('connection', function (socket) {
    try {
      // insert here your event

      /** Creating or joining rooms
       * send  message to the user
       *
       */

      socket.on('create or join', function (room, userId) {
        socket.join(room);
        io.socket.to(room).emit('joined', room, userId);
        console.log('somebody joining');
      });
      socket.on('chat', function (room, userId, chatText) {
        io.socket.to(room).emit('chat', room, userId, chatText);
      });
      socket.on('disconnect', function () {
        console.log('somebody disconnect');
      });
      socket.on('draw', function (room, userId, width, height,preX,preY,curX,curY,color,thickness) {
        io.sockets.to(room).emit('draw', room, userId, width, height,preX,preY,curX,curY,color,thickness)
      });/**preX,preY,curX,curY are the status of the annotation in previous and current */
      socket.on('knowledge graph', function (room, name, id, desc, url) {
        socket.broadcast.to(room).emit('knowledgegraph', room, name, id, desc, url);
      });
    }catch (e) {
    }
  });
}
