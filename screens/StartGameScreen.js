import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('')

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }
    
    function resetInputHandler(){
        setEnteredNumber('')
    }
    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99){
            Alert.alert(
                'Invalid Input', 
                'Need positive number between 0 and 99', 
                [{text: 'Fine', style:'destructive', onPress: resetInputHandler}])
            return;
        }
        onPickNumber(chosenNumber);
        // this step is how we pass paremeter from a child page to its parent page,
        // very important
    }
    return (
        <View style={styles.rootContainer}>
            <Title >Guess My Number</Title>
            <Card>
            <InstructionText>Input a Number</InstructionText>
            <TextInput 
                style={styles.numberInput} 
                maxLength = {2} 
                // pass in number using {}
                keyboardType="number-pad" 
                value={enteredNumber}
                onChangeText={numberInputHandler}/> 

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
            
        </Card>
        </View>
        
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    numberInput:{
        height: 50,
        width: '35%',
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign:'center'
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    }
})