import Cookies from 'js-cookie'
import "./Styles/MainMenu.css"
import { useState } from 'react';
export default function MainMenu(props) {
    let [msg, setMsg] = useState("Welcome !!!")
    return(
        <div className="menu-container">
            <div className="new-game" onClick={() => {props.setPage("new")}}>
                <p>New Game</p>
            </div>
            <div className="continue" onClick={() => {
                if(Cookies.get('fen')) {
                    props.setPage(Cookies.get('fen'))
                } else {
                    setMsg("No Saved Game Found")
                }
            }}>
                <p>Continue</p>
            </div>
            <div className="about" onClick={() => {props.setPage("about")}}>
                <p>About Me</p>
            </div>
            <p id = "message">{msg}</p>
        </div>
    );
}