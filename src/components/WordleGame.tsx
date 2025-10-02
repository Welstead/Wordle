import { Button, Center, FocusTrap, Paper, PinInput, SimpleGrid, Stack, Text, TextInput, Title, VisuallyHidden } from '@mantine/core'
import classes from '../assets/styles/PinInput.module.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Letter from './Letter'

const WORDS = [
  "APPLE",
  "BRAVE",
  "CRANE",
  "DREAM",
  "EPOCH",
  "FLOUR",
  "GLASS",
  "HOUSE",
  "INPUT",
  "JUMBO",
  "KNIFE",
  "LIGHT",
  "MONEY",
  "NINTH",
  "OCEAN",
  "PILOT",
  "QUICK",
  "ROAST",
  "SWEET",
  "TIGER",
  "UNITY",
  "VIVID",
  "WHOLE",
  "XENON",
  "YOUNG",
  "ZEBRA",
  ];

function randomAnswer() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const WordleGame = () => {
  const [answer, setAnswer] = useState(randomAnswer())

  const [wordLength, setWordLength] = useState(5)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guessesLength, setGuessesLength] = useState(4)
  const [submittedGuesses, setSubmittedGuesses] = useState<Array<string>>([])
  const currentGuessRef = useRef("")
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toUpperCase()
      if(key === "ENTER"){
        handleEnter()
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    }
  }, [])

useEffect(() => {
  currentGuessRef.current = currentGuess
 
}, [currentGuess])

  
  const handleEnter = () => {
    if(currentGuessRef.current.length == wordLength){
      setSubmittedGuesses((prevGuesses) => [...prevGuesses, currentGuessRef.current])
      setCurrentGuess("")
      return;
    }
    // Show error
  }

  const SubmittedGuess = ({ guess }) => {
    let guessArray : string[] = Array.from(guess.toUpperCase())
    let answerArray : string[] = Array.from(answer.toUpperCase())
    let lettersLeft = [...answerArray]
    const calculateColor = (idx) => {
      if (guessArray[idx] == answerArray[idx]) {
        const index = answerArray.findIndex(letter => letter == guessArray[idx])
        // answerArray.splice(index, 1)
        lettersLeft.splice(index , 1)
        return "#2b8a3e";
      }
      else if(lettersLeft.includes(guessArray[idx])){
          const index = answerArray.findIndex(letter => letter == guessArray[idx])
          lettersLeft.splice(index , 1)

          return "#b59f3b"
      }
      else{
        return "#495057"
      }
    }
    return (
      <>
        {Array.from(guess).map((letter, idx) => <Letter letter={letter} color={calculateColor(idx)} />)}
      </>)
  }

  return (
    <>
    <Title>{answer}</Title>
      <SimpleGrid cols={wordLength} spacing='xs'>
        {submittedGuesses.map(item => <SubmittedGuess guess={item}/>) }
        {Array((guessesLength - submittedGuesses.length) * wordLength).fill({}).map((_, idx) =>

          <Letter letter={currentGuess[idx]} color={""}/>

        )}
      
      </SimpleGrid>


      {/* <VisuallyHidden> */}
      <TextInput autoFocus value={currentGuess} onChange={(e) => setCurrentGuess(e.currentTarget.value)} hidden maxLength={wordLength} />
      {/* </VisuallyHidden> */}




    </>
  )
}

export default WordleGame