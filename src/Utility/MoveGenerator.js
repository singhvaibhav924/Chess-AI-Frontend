import Cookies from 'js-cookie'
export default function generateAIMove(board, stateManager, setState) {
    console.log("Generating Move")
    let dict = {
        "state" : stateManager.getState(),
        "turn" : board.turn() === 'w' ? true : false
    }
    let url = process.env.REACT_APP_API_URL
    console.log(url)
    console.log("Sending latest state to server "+ stateManager.getCurrState())
    fetch(url, {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(dict),
        keepalive : true
    }).then((data) => {
        data.text().then((value) => {
            try {
                board.move(value)
                stateManager.push(board.fen())
            } catch(e) {
                console.log(e)
            }
                if(board.turn() === "w") {
                    Cookies.set("fen", stateManager.getState()+"_white")
                } else {
                    Cookies.set("fen", stateManager.getState()+"_black")
                }
                setState({
                    board : board
                })
        })
    }, (rejected) => {
        console.log(rejected)
    })
}