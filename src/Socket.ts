import { Socket as _Socket, Server } from "socket.io";
export class Socket {
	constructor(readonly sock: _Socket, readonly io: Server) {

	}
	init() {
		
	}
}
