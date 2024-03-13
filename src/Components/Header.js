import "./Styles/Header.css"
import logo from "./Assets/logo.png"
export default function Header(props) {
    return(
        <div id = "header">
            <div id = "icon-holder">
                <img id = "icon" src = {logo} alt="Logo"/>
            </div>
            <div id="app-name">
                <p>CHESS AI</p>
            </div>
            <div id="info-page" onClick={() => {props.setPage("about")}}>
                <p>About Me</p>
            </div>
        </div>
    )
}