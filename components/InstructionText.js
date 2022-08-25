import { StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";
function InstructionText({children, style}){//cascading styles
    return <Text style={[styles.instructionText, style]}>{children}</Text> //second element style overwrite the first one
}
export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily:'open-sans',
        color: Colors.accent500,
        fontSize: 24
    },
})