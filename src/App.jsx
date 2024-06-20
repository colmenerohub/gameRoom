import './App.css'
import { Board } from './board/Board'

export function App() {
    
    return (
        <>
            <div id='container'>
                <div className='games'>
                    <a href="https://www.minijuegos.com/juego/uno"><img src="/UNO.jpg" alt="" /></a>
                    <a href="https://www.chess.com/es/play/computer"><img src="/chess.jpg" alt="" /></a>
                </div>
            
                <Board></Board>
            
                <div className='games'>
                    <a href="https://www.minijuegos.com/juegos-de-parchis"><img src="/parchis.png" alt="" /></a>
                    <a href="https://solitarios-online.com/"><img src="/solitario.png" alt="" /></a>
                </div>
            </div>

            <div>
            <audio controls autoPlay loop>
                <source src="/kahoot.mp3" type="audio/mp3"></source>
                Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
        </>
        )
}
    
export default App