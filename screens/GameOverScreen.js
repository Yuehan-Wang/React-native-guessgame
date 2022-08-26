import { Text, Image, View, StyleSheet, useWindowDimensions } from "react-native"
import PrimaryButton from "../components/PrimaryButton"
import Title from "../components/Title"
import Colors from "../constants/colors"
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    const { width, height } = useWindowDimensions();

    let imageSize = 300;
    
    if(width < 380){
        imageSize = 150;
    }

    if(height < 400){
        imageSize = 80;
    }
    
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return (
    <View style = {styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
        <Image style={styles.image} source={require('../assets/images/success.png')}></Image>
        </View>
        <Text style={styles.summaryText}>Your phone used <Text style={styles.highlight}>{roundsNumber}</Text> round to guess the 
        number <Text style={styles.highlight}>{userNumber}</Text> </Text>
        <PrimaryButton onPress = {onStartNewGame}>Start New Game</PrimaryButton>
    </View>
)}
export default GameOverScreen


// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        padding: 24,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        // borderRadius: deviceWidth < 380 ? 75 : 150, 
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden', //act as a musk so that it looks like a circle, the outside part just gets hidden
        margin: 36
    },
    image:{
        width: '100%',
        height: '100%'
        //percentage is referring to how much the element take up the container it's in
    },
    summaryText:{
        marginBottom: 24,
        fontFamily:'open-sans',
        fontSize: 24,
        textAlign:'center'
    },
    highlight:{
        fontFamily:'open-sans-bold',
        color: Colors.primary500
    }
})