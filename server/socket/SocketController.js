const connectToSocket = async (io) => {
    io.on("connect", (socket) => {
        console.log(`the user is now connected by socket.io...`);

        // Listen for the 'join' event from client-side and execute callback with  room name
        socket.on('join', onUserJoin);
        socket.on('leaveRoom' , onLeaveRoom);
        // Adds a disconnection listener that
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

const onLeaveRoom = async(roomName , callback) => {
    
}

const onUserJoin = async(roomName, callback) => {
    let error = false;
    
    if (!roomName || typeof roomName !== "string"){
        error = true;
    } else {
        roomName = roomName.trim();
    }

    if (error) {
        return callback({success:false, message:"Invalid data"});
    }

    // Check if room already exists
    if (io.sockets.adapter.rooms.get(roomName)){
        callback({success : false, message : `Room ${roomName} already exists.`})
    } else {
        socket.join(roomName, ()=>callback({ success : true, message : `You have joined room ${roomName}.`, room}))
    }
}

module.exports = {connectToSocket}