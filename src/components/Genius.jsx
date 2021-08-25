import { useState } from 'react';
import '../styles/styles.css';
import { ColoredButton } from './ColoredButton';
import { MainButton } from './MainButton';

export function Genius() {
    const [state, setState] = useState('Jogar')
    const [memory, setMemory] = useState([])
    const [counter, setCounter] = useState(0)
    const [playerTurn, setPlayerTurn] = useState(false)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function gameOver(color) {
        document.querySelector(`#${color}`).style.opacity = '1.0'
        await sleep(2000)
        document.querySelector(`#${color}`).style.opacity = '0.5'
        setState('Jogar')
        document.querySelector('#main').style.backgroundColor = 'green'
        setMemory([])
        setCounter(0)
        setPlayerTurn(false)
    }

    async function blinkLight(color) {
        let colorElement = document.querySelector(`#${color}`)
        if (color === 'green') {
            colorElement.style.opacity = '1.0'
            await sleep(200)
            colorElement.style.opacity = '0.5'
        } else if (color === 'red') {
            colorElement.style.opacity = '1.0'
            await sleep(200)
            colorElement.style.opacity = '0.5'
        } else if (color === 'yellow') {
            colorElement.style.opacity = '1.0'
            await sleep(200)
            colorElement.style.opacity = '0.5'
        } else {
            colorElement.style.opacity = '1.0'
            await sleep(200)
            colorElement.style.opacity = '0.5'
        }
    }

    async function raffleColor() {
        let colors = ['green', 'red', 'yellow', 'blue']
        let color = colors[Math.floor(Math.random() * colors.length)]
        setMemory(memory => [...memory, color])
        
        for (let i = 0; i < memory.length; i++) {
            blinkLight(memory[i])
            await sleep(500)
        }
        blinkLight(color)
        setCounter(0)
        setPlayerTurn(true)
    }

    async function checkOrder(event) {
        if (playerTurn === false) {
            return
        } else {
            setCounter(counter + 1)
            if (memory[counter] !== event.target.id) {
                gameOver(event.target.id)
            } else {
                blinkLight(event.target.id)
                if (counter === memory.length - 1) {
                    await sleep(700)
                    raffleColor()
                    setPlayerTurn(false)
                }
            }
        }
    }

    function startGame() {
        if (state === 'Jogar') {
            setState('Parar')
            document.querySelector('#main').style.backgroundColor = 'red'
            raffleColor()
        } else if (state === 'Parar') {
            setState('Jogar')
            document.querySelector('#main').style.backgroundColor = 'green'
            setMemory([])
            setCounter(0)
            setPlayerTurn(false)
        }
    }

    return (
        <div>
            <h1 className="text-light">Genius</h1>
            <table className="genius">
                <tbody>
                    <tr>
                        <td>
                            <ColoredButton onclick={checkOrder} id="green" style={{
                                backgroundColor: 'green'
                            }} />
                        </td>
                        <td>
                            <ColoredButton onclick={checkOrder} id="red" style={{
                                backgroundColor: 'red'
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ColoredButton onclick={checkOrder} id="yellow" style={{
                                backgroundColor: 'yellow'
                            }} />
                        </td>
                        <td>
                            <ColoredButton onclick={checkOrder} id="blue" style={{
                                backgroundColor: 'blue'
                            }} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="start-div">
                <MainButton onclick={startGame}>{state}</MainButton>
            </div>
        </div>
    );
}