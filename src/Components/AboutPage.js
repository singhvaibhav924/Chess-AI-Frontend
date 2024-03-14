import ig from "./Assets/ig.jpg"
import gmail from "./Assets/gmail.svg"
import lnkdn from "./Assets/lnkdn.png"
import github from "./Assets/github.svg"
import "./Styles/AboutPage.css"
export default function AboutPage(props) {
    return(
        <div id = "about-page">
            <h2 className="main-heading">About the Project -</h2>
            <p className="para">This is a Deep Reinforcement Learning Model. It uses the Actor-Critic process to learn. It learns by self-play where it plays against itself in a simulated chess environment and learns as per the experience collected.</p>
            <p className="para">The Underlying Brain is a complex Convolutional Neural Network with 5 Millions+ trainable parameters. The Neural Network works with Non-Markovian State taking two inputs of dimensions 8X8X60 and 8X8X10 which contains information about current board positions as well as last 4 positions and the valid moves to play respectively and outputs two things first is a single tensor known as Value Head predicting the likelyhood of winning from that position(value/quality of state) ranging from 1 to -1 and second is Policy Head which is 8X8X10 tensor containing probabilities of all the valid moves to play.</p>
            <p className="para">During the training process for each state thousands of Iterations of Temporal Difference Lambda Tree Search (TDTS) Simulations are run to accurately calculate the value as well as optimal policy for all encountered states. In which for each iteration the search tree is expanded using the Network Policy and upon reaching a new state random moves are played to ensure proper exploration until the terminal state is reached(Checkmate or Draw) or if certain threshold move limit is crossed(because of lack of hardware in this case the limit was 256). After this the values of nodes in the tree are updated as per the rewards collected during the simulation using TD lambda Algorithm. After completing thousands of TDTS simulations the tree data is sent to the Model for training where appropriate errors are calculated as per standard Actor-Critic RL Algorithm for both Policy and Value Heads and very tightely controlled Backpropagation is applied using Keras Custom Training Loop.</p>
            <h2 className="main-heading">About Me -</h2>
            <p className="para"> I am Vaibhav Singh, currently pursuing my B.Tech from School of Engineering, Jawaharlal Nehru University, New Delhi in the field of Electronics and Communications Engineering.</p>
            <p className="para">My Area of Interests and Expertise are in the field of Artificial Intelligence(especially Deep Learning and Reinforcement Learning), Digital Signal Processing and Web Development</p>
            <p className="para">Catch me on below Social Handles</p>
            <div id = 'socials-container'>
                <a href="https://www.instagram.com/i_m_d_vaibhav/" target="black" className="logo">
                    <img src= {ig} alt="ig" />
                </a>
                <a href="https://www.linkedin.com/in/i-m-d-vaibhav/" target="black" className="logo">
                    <img src= {lnkdn} alt="Linkedin" />
                </a>
                <a href="mailto:singhvaibhav924@gmail.com" target="black" className="logo">
                    <img src= {gmail} alt="Email" />
                </a>
                <a href="https://github.com/singhvaibhav924" target="black" className="logo">
                    <img src= {github} alt="Github" />
                </a>
                
            </div>
            <div id="return" onClick={() => { props.setPage("") }}><p>Return</p></div>
            <p className="para">&nbsp;</p>
        </div>
    )
}