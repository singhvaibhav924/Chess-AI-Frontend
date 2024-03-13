import "./Styles/PawnPromotion.css"
import knight from "./Assets/knight.jpg"
import queen from "./Assets/queen.jpg"
import rook from "./Assets/rook.jpg"
import bishop from "./Assets/bishop.jpg"
export default function PawnPromotion(props) {
    const style = {
        width : `${Math.round(props.dim)}px`,
        height : `${Math.round(props.dim)}px`
        }
    return(
        <div id = 'promotion-container' style={style}>
            <div id = 'promotion-seleciton'>
                <div className="logo" onClick={() => {
                    props.applyMove(props.square, 'b')
                }}>
                    <img src= {bishop} alt="Bishop" />
                </div>
                <div className="logo" onClick={() => {
                    props.applyMove(props.square, 'n')
                }}>
                    <img src= {knight} alt="Knight" />
                </div>
                <div className="logo" onClick={() => {
                    props.applyMove(props.square, 'q')
                }}>
                    <img src= {queen} alt="Queen" />
                </div>
                <div className="logo" onClick={() => {
                    props.applyMove(props.square, 'r')
                }}>
                    <img src= {rook} alt="Rook" />
                </div>
            </div>
        </div>
    );
}