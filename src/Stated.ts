export default abstract class Stated {
    private endState?: () => void
    setState<T extends keyof {[P in this["constructor"]["states"] as this["constructor"]["states"][P] extends (this: this, socket: _Socket, ...args: any[]) => () => void ? P : never]: User["states"][P]} >
        (state: T, ...args: User["states"][T] extends (socket: _Socket, ...args: infer R) => any ? R : never) {
        if (this.endState) this.endState()
        const endFunc = this.constructor.states[state]
        this.endState = endFunc;
    }
    abstract static states: Record<string, (thisArg: this, ...args: any[]) => () => void>
}
