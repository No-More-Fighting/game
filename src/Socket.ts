// @ts-check

import { Socket as _Socket, Server } from "socket.io";
import { User } from "models/User"
import { createHash } from 'crypto';
import { UserCreationError } from "../common/Enums";
import * as C from "./config";
import Stated from "./Stated";

export default class Socket extends Stated {
    endState?: () => void
    boundUser!: User

    constructor(readonly sock: _Socket, readonly io: Server) {
        this.endState = User.states.loggingIn(this.sock)
    }
    init() {
        
    }
    static states = {
        loggingIn(socket: Socket) {
            let { sock } = socket;
            sock.on("login", (username: string, password: string, callback: (user: User | null) => void) => {
                let user;
                if (typeof username !== "string" || typeof password !== "string" || typeof callback !== "function") return;
                if (user = await User.findOne({ "where": { username }})) {
                    let hash = createHash("sha256");
                    hash.update(password);
                    let passwordHash = hash.digest("hex")
                    if (passwordHash === user.password) {
                        socket.boundUser = user;
                        socket.setState("game")
                        callback(user.toJSON());
                    } else {
                        return callback(null)
                    }
                } else {
                    return callback(null);
                }
            })

            sock.on("createAccount", (
                username: string,
                password: string,
                email: string,
                nick?: string,
                callback: (user: string | UserCreationError) => void
            ) => {
                let foundUser = await User.findOne({ "where": { username } });
                if (foundUser) {
                    return callback("unique")
                } else {
                    if (username.match(C.USERNAME_REGEX)) {
                        if (email.match(C.EMAIL_REGEX)) {
                            // actually create the user now
                            let hash = createHash("sha256");
                            hash.update(password);
                            let passwordHash = hash.digest("hex");
                            const newUser = User.create({
                                username,
                                nick: nick || username,
                                password: passwordHash
                            })
                            return callback(newUser.toJSON());
                        } else {
                            return callback("invalid_mail")
                        }
                    } else {
                        return callback("invalid_user")
                    }
                }
            })

            return () => {
                sock.off("login")
                sock.off("createAccount")
            }
        },

        game(socket: Socket) {
            socket.on("")
        },
    }
}
