import React from "react"
import Home from './Home'
import Quiz from './Quiz'
import data from './data'
import shuffle from './utils'

export default function App(){
    let quizType = 'ANIME quiz time'
    
    

    const ANIME = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple'
    
    
     const[preScore,setPreScore] = React.useState('')   
     const [startQuiz, setStartQuiz] = React.useState(false)
     const [fetchData, setData] = React.useState(()=>{
                const fetch = data.map((item,index)=>{
                            return {id:index+1,question: (item.question.replaceAll(`&quot;`,` " `)).replaceAll('&#039;'," ` "),choices: [...item.incorrect_answers,item.correct_answer],
                            correctAnswer: item.correct_answer,selectedValue: '',isSelected:false,isTrue:false,isReveal: false}
                        })
                
                return fetch
                }
        )
    const [playAgainQuiz, setPlayAgainQuiz] = React.useState(0)
   
        
    React.useEffect(()=>{
        
        fetch(ANIME)
                    .then(res => res.json())
                    .then(data => setData(data.results.map((item,index)=>{
                            return {id:index+1,question: item.question.replaceAll(`&quot;`,` " `),choices: shuffle( [...item.incorrect_answers,item.correct_answer]),
                            correctAnswer: item.correct_answer,selectedValue: '',isSelected:false,isTrue:false,isReveal: false}
                        })))
     
         setPreScore(localStorage.getItem('score') ||'' )   
    },[playAgainQuiz])
     

    function selectedChoice(id,value)
    {
        // console.log(id + value)
        setData(preData => {
            return preData.map(data=>{
                if(data.id === id && !data.selectedValue)
                {
                    return {...data,
                            selectedValue:value,
                            isSelected: true,
                            isTrue: data.correctAnswer === value ? true:false
                            }
                }
                else if(data.id === id && data.selectedValue)
                {
                    return{
                            ...data,
                            selectedValue:value,
                            isSelected: true,
                            isTrue: data.correctAnswer === value ? true: false

                    }
                }
                else{
                    return data
                }
            })
        })
    }
   
    const quizElements = fetchData.map(quiz=>{
        return <Quiz selectedChoice={(id,value)=> selectedChoice(id,value)} key={quiz.id} id = {quiz.id} question={quiz.question} choices={quiz.choices} 
        correctAnswer = {quiz.correctAnswer} selectedValue={quiz.selectedValue} isSelected={quiz.isSelected} isTrue = {quiz.isTrue} isRevealed = {quiz.isReveal} />
    })
    
    function checkAnswers()
    {
        const allSelected = fetchData.every(data=> data.isSelected)
        const trueAnswers = fetchData.filter(data => data.isTrue).length
       
        
        if(allSelected)
        {
            
            setData(preData =>{
                return preData.map(quiz=>{
                    return {...quiz,
                            isReveal: true
                            }
                })
            })
            if(preScore)
            {
                if(preScore < trueAnswers)
                {localStorage.setItem('score',JSON.stringify(trueAnswers))}
                   
            }
            else{
                localStorage.setItem('score',JSON.stringify(trueAnswers))
            }
            
        }
        else{
            alert('please select all the answers')
        }
    }


    function playAgain()
    {
        //fetch the data again..
        setPlayAgainQuiz((pre)=>pre+1)
       
    }
    function render()
    {
        setStartQuiz(true)
    }
 
    return(
        <div className='app-container'>
            <Home render={render} startQuiz = {startQuiz}/>
            <div className={startQuiz ? '':'display'}>
                <h1 className='quiz-title'>{quizType}</h1>
                {preScore && <h3 className='best-score'>Your best score is : {preScore}</h3>}
                {quizElements}
                <div className='btn-container'>
                {fetchData[0].isReveal && <h2 className='score'>You scored {fetchData.filter(data => data.isTrue).length}/{fetchData.length} correct answers</h2>} <button className='btn-answers' onClick={fetchData[0].isReveal ? playAgain  : checkAnswers }>{fetchData[0].isReveal ? 'Play again': 'Check answers'} </button>
                </div>
            </div>
        </div>        
    )
}