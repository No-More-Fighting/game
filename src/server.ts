import { Server } from "socket.io";
import { Socket } from "./Socket.js"
const io = new Server(+(process.env.PORT || 3000));

io.on("connection", sock => {
	new Socket(sock, io).init();
});
