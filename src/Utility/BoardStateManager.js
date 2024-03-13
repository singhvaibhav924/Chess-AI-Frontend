export default class BoardStateManager {
    constructor(state, isNew = true) {
        if(isNew) {
            this.history = ["", "", "", "", ""]
            this.history[4] = state
        } else {
            let board_state = state.split("_")
            this.history = ["", "", "", "", ""]
            for(let i = 0; i<5; i++) {
                this.history[i] = board_state[i]
            }
        }
    }
    push(state) {
        console.log("Pushing new State "+ state)
        for(let i = 1; i<5; i++) {
            this.history[i-1] = this.history[i]
        }
        this.history[4] = state
    }
    getCurrState() {
        return this.history[4]
    }
    getState() {
        let str = ""
        for(let i = 0; i<4; i++) {
            str = str + this.history[i] + "_"
        }
        str = str + this.history[4]
        return str
    }
}