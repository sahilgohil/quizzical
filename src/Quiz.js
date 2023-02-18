import React from "react"

export default function Quiz(props)
{

    const choices = props.choices
    const value = props.selectedValue
    const revealed = props.isRevealed
    let answerStyles = []
    let trueResult ={border: '2px solid #06d6a0',
                        color: '#06d6a0'} 
    
    let falseResult = {border: '2px solid #ef476f',
                        color: '#ef476f'}
    if(revealed)
    {
        answerStyles = choices.map(choice=>
        {
            if(value === choice)
            {
                if(props.isTrue)
                {
                    return {
                        backgroundColor: '#06d6a0',
                        border: 'none'
                        
                    }
                }
                else{
                    return {backgroundColor: '#ef476f',
                            border: 'none'}
                }
            }
            else if(props.correctAnswer === choice && value !==choice)
            {
                return {backgroundColor: '#06d6a0',
                        border: 'none'}
            }
            else{
                return{
                    color: '#293264',
                    border: '0.794239px solid #4D5B9E',
                    opacity: '0.5'
                }
            }
            
        })
    }
    
    
    return(
        <main>
            <div className = 'quiz-container'>
                {revealed && <h3 className='result' style={props.isTrue ? trueResult: falseResult}>
                        {props.isTrue ? 'True' : 'False'}
                    </h3>}
                <h1 className ='question'>{props.question}</h1>
                <div className ='answer-container' style={revealed ? {pointerEvents:'none'}:{}}>
                    <div
                         
                        onClick= {() => {props.selectedChoice(props.id,choices[0])}}                 className={value === choices[0] ? 'answers selected':'answers'}
                        style={answerStyles[0]}
                        >
                        {choices[0]}
                    </div>
                    <div
                        
                        onClick= {() => {props.selectedChoice(props.id,choices[1])}} 
                        className={value === choices[1] ? 'answers selected':'answers'}
                        style = {answerStyles[1]}
                        >
                        {choices[1]}
                        
                    </div>
                    <div
                       
                        onClick= {() => {props.selectedChoice(props.id,choices[2])}}
                        className={value === choices[2] ? 'answers selected':'answers'}
                        style = {answerStyles[2]}
                        >
                        {choices[2]}
                        </div>
                    <div
                        
                        onClick= {() => {props.selectedChoice(props.id,choices[3])}}
                        className={value === choices[3] ? 'answers selected':'answers'}
                        style = {answerStyles[3]}
                        >
                        {choices[3]}
                    </div>
                </div>
            </div>
        </main>
    )
}

