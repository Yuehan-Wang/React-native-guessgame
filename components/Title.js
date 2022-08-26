import { Text,StyleSheet, Platform } from "react-native";


function Title({children}){
    return(
        <Text style = {styles.title}>{children}</Text>
    )
}
export default Title;

const styles = StyleSheet.create({
    title:{
        fontFamily:'open-sans-bold',
        fontSize: 24,
        color:'white',
        textAlign:'center',

        //platform specific code
        //can also create new files Title.android.js and Tit;e.ios.js
        //no need to import two files when using them since the components should
        //still be exported as Title
        borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderColor: Platform.select({ios: 'beige', android:'white'}),

        padding: 12,
        maxWidth: '80%',
        width: 300
    }
})