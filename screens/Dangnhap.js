import { ActivityIndicator, Alert, Button, StyleSheet, View,Text,TextInput,KeyboardAvoidingView,Image, Pressable} from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_APP, FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // **Add this import**
const Dangnhap = ({navigation}) => {

  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const[loading,setLoading]=useState(false);
  const auth=FIREBASE_AUTH;
const signIn=async ()=>{
  setLoading(true);
  try{
    const reponse=await signInWithEmailAndPassword(auth, email,password);
    console.log(reponse);
    Alert.alert('Đăng nhập thành công');
   navigation.navigate('Home'); // **Navigate to Home**
  }catch(error){
    console.log(error);
    Alert.alert('Sign in failed:' + error.message);
  }finally{
    setLoading(false);
  }
}
const signUp=async()=>{
  setLoading(true);
  try {
    const reponse=await createUserWithEmailAndPassword(auth,email,password);
    console.log(reponse);
    Alert.alert('Đăng ký thành công');

  } catch (error) {
    console.log(error);
    Alert.alert('Sign in failed:' + error.message);

  }finally{
    setLoading(false);
  }
}
  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/256/7138/7138235.png'}} style={styles.image} />
      <KeyboardAvoidingView behaivior='padding'>
     <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text)=> setEmail(text)}></TextInput>
     <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="password" autoCapitalize="none" onChangeText={(text)=> setPassword(text)}></TextInput>
     
{ loading ?(
  <ActivityIndicator size="large" color="#0000ff"/>
) :(
<>
<View style={styles.buttonContainer}>
            <Pressable onPress={signIn} style = {styles.button} >
              <Text style = {{color: 'white', fontSize: 18}}>Login</Text>
            </Pressable>
            <View style={styles.space}>
            <Pressable onPress={signUp}  style = {styles.button} >
              <Text style = {{color: 'white', fontSize: 18}}>Create Account</Text>
            </Pressable>
            </View>
          </View>
  </>
)}
</KeyboardAvoidingView>
    </View>
    
  )
}


export default Dangnhap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fafad2',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    
 
  },
  button: {
  backgroundColor: '#FDDD65',
  borderRadius:10,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop:30,
    borderRadius:30
  },
  space: {
    // height: 20, // Adjust the height to set the space between the buttons
    marginTop:20,
  },
  image: {
    width: 200, // Adjust the width of the image
    height: 200, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginTop:-200,
  },
});