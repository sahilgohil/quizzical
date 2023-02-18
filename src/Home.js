import React from "react"

export default function Home(props){
    
    return(
        <div className= {props.startQuiz ? 'display':'home--container'} >
            <h1 className='home--title'>Quizzical</h1>
            <p className='home--body'>The quiz questions about your favourite anime</p>
            <button className='home--button' onClick={() => props.render()}>Start quiz</button>
        </div>
    )
}