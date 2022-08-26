import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect, useInsertionEffect } from "react";
import Title from "../components/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width, height} = useWindowDimensions()
    useEffect(() => {
        if (currentGuess === userNumber) {
          onGameOver(guessRounds.length);
        }
      }, [currentGuess, userNumber, onGameOver]);
    // if any of the [currentGuess, userNumber,onGameOver] changes, useEffect will check the logic

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100
    },[]);//this reset bounds everytime we start a new game

    function nextGuessHandler(direction){
        if ((direction === 'lower' && currentGuess < userNumber) || 
        (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert('Shut up', 'You lying pig!',[
                {text: 'I am a lying big', style:'cancel'}
            ])
            return;
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRandNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRandNumber);
        setGuessRounds(prevGuessRounds => [newRandNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (<>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white"/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white"/>
            </PrimaryButton>
          </View>
        </View>
        </Card>
        </>
    );
    if(width > 500){
      content = (<>
      <View style={styles.buttonsContainerWide}>
      <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white"/>
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white"/>
            </PrimaryButton>
          </View>
      </View>
      </>
        
      )
    }
    return (
    <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        {content}
        <View style={styles.listContainer}>
            <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
                <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
                />
            )}
            keyExtractor={(item) => item}
            />
        </View>
    </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 24,
      alignItems:'center'
    },
    instructionText: {
      marginBottom: 12,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      flex: 1,
    },
    listContainer:{
        flex: 1,
    },
    buttonsContainerWide:{
      flexDirection:'row',
      alignItems:'center'
    }
  });