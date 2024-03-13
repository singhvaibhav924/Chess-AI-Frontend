import './App.css';
import Header from './Components/Header';
import PlayArea from './Components/PlayArea';
import MainMenu from './Components/MainMenu';
import AboutPage from './Components/AboutPage';
import { useState } from 'react';
function App() {
  let [page, setPage] = useState("")
  return (
    <div className="App">
      <Header setPage = {setPage}/>
      <div className='Container'>
      {
  (() => {
    if(page === "") {
      return <MainMenu setPage = {setPage} />
    } else if(page === "about") {
      return <AboutPage setPage = {setPage} />
    } else {
      return <PlayArea fen = {page} setPage = {setPage} />
    }
  })()
}
      </div>
    </div>
  );
}

export default App;

