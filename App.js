import { StatusBar, StyleSheet,ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  function gameOverhandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }
  function startNewGameHandler(){
    setUserNumber(null); //this sends the screen back to start screen 
    //since the confitions for GameScreen and GameOverScreen (below) depends on valid userNumber
    setGameIsOver(true);
    setGuessRounds(0)
  }
  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverhandler}/>
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler}/>
  }

  return (
  <LinearGradient colors={[Colors.primary700,Colors.accent500]} style = {styles.rootScreen}>
    <ImageBackground 
      source={require('./assets/images/background.png')} 
      resizeMode='cover'
      style = {styles.rootScreen}
      imageStyle={styles.backGroundImage}>
      <View style = {styles.screenContainer}>{screen}</View>
      
      {/* render different screen based on input value, interesting */}
    </ImageBackground>
  </LinearGradient>)
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1,
  },
  backGroundImage: {
    opacity: 0.15
  },
  screenContainer:{
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  }
});
