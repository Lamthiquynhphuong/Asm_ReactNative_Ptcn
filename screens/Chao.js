import { StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const Chao = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Dangnhap');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Welcome to Our App!</Text> */}
      <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5CS-YbnZjtIQfVgL_XGAeHfkYte-afmOrw&s'}} style={styles.image} />
      
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};


export default Chao

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor:'white'
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200, // Adjust the width of the image
    height: 200, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginTop:-200,
   
  },
});