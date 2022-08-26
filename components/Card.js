import { View,StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/colors";

function Card({children}){
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}
export default Card;

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    card:{
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        borderRadius: 8,
        //justifyContent: 'center',
        alignItems:'center', //default to "stretch" which fills up the whole space

        elevation: 10, //shadow for andriod

        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.5, //shadow for ios

        backgroundColor: Colors.primary800
    },
})