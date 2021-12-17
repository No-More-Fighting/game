/// <reference path="globals.d.ts">
// @ts-check

/**
 * Creates a promise that resolves with the next occurence of the specified event.
 * @param {Element} el
 * @param {string} ev
 */

function waitForEvent(el, ev) {
    return new Promise((res, rej) => {
        function fun(ev) {
            res(ev)
            el.removeEventListener(ev, fun)
        }
        el.addEventListener(ev, fun)
    })
}

(async () => {
    alert("turkey")

    const SERVER = location.hostname === "nmfs.herokuapp.com" ? "nmfs.herokuapp.com" : location.hostname + ":3000";
    console.log(SERVER);

    const socket = io(SERVER)

    const playerMap = {};

    socket.on("join", (id, name) => {
        playerMap[id] = {
            name,
            x: 0,
            y: 0,
            el: document.createElement("div")
        }
        document.body.appendChild(playerMap[id].el)
    });

    socket.on("move", (id, x, y) => {
        playerMap[id].x = x
        playerMap[id].y = y
    });

    socket.on("message", (id, msg) => {
        alert(`${playerMap[id].name}: ${msg}`)
    });

    socket.on("hurt", (id, damage) => {
        // not implemented
    });

    socket.on("leave", (id) => {
        delete playerMap[id]
    });


    function mainLoop() {
        requestAnimationFrame(mainLoop)
    }
    //mainLoop()

    alert("rabbit")
})()
