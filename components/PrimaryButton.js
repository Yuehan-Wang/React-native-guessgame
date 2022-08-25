import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function PrimaryButton({children, onPress}){
    return (
        <View style={styles.buttonOuterContainer}>
        <Pressable 
            style={({pressed}) => pressed? 
                [styles.buttonInnterContainer, styles.pressed]: styles.buttonInnterContainer}
                //styles can be an array
            onPress={onPress}
            android_ripple={{color: Colors.primary600}}
            >
            
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            
        </Pressable>
        </View>
        // we move the View outside Pressable so that the ripple effect does not 
        // go below/around the button but on top of it as intended
       
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnterContainer:{
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText:{
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    } 
});