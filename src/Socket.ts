// @ts-

import { Socket as _Socket, Server } from "socket.io";
import { User } from "models/User"
import { createHash } from 'crypto';

export class Socket {
    endState: () => void
    constructor(readonly sock: _Socket, readonly io: Server) {
        this.endState = User.states.loggingIn(this.sock)
    }
    init() {
        
    }
    setState<T extends keyof this["states"]>(state: T, ...args: User["states"][T]) {

    }
    static states = {
        loggingIn(socket) {
            socket.on("login", (username: string, password: string, callback: (user: User | null) => void) => {
                let user;
                if (typeof username !== "string" || typeof password !== "string" || typeof callback !== "function") return;
                if (user = User.findOne({ "where": { username }, attributes: ["password"] })) {
                    let hash = createHash("sha256");
                    hash.update(password);
                    let passwordHash = hash.digest("hex")
                    if (passwordHash === user.password) {
                        user.reload();
                        callback(user.toJSON())
                    } else {
                        return callback(null)
                    }
                } else {
                    return callback(null);
                }
            })

            socket.on("createAccount", (
                username: string,
                password: string,
                email: string,
                nick: string,
                callback: (error?: string) => void
            ) => {
                let foundUser = 
            }

            return () => {
                socket.off("login")
                socket.off("createAccount")
            }
        }
    }
}
