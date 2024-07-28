import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Buocchay() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState(null); 
  const [advice, setAdvice] = useState('');
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Dangnhap');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  const updateProfile = () => {
    if (!name || !weight || !height || !gender) {
      Alert.alert('Lỗi', 'Không được để trống');
      return;
    }
 
    Alert.alert('Profile Updated', `Name: ${name}, Weight: ${weight}, Height: ${height}, Gender: ${gender}`);
  };

  const calculateBmi = () => {
    if (!weight || !height || !gender) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin cân nặng, chiều cao và giới tính để tính chỉ số BMI.');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    let bmiAdvice = '';
    if (gender.toLowerCase() === 'nam') {
      if (bmiValue < 18.5) {
        bmiAdvice = 'Bạn đang thiếu cân. Nên ăn uống đầy đủ dưỡng chất và tập luyện nhẹ nhàng.';
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiAdvice = 'Bạn có chỉ số BMI bình thường. Hãy duy trì chế độ ăn uống và tập luyện hiện tại.';
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiAdvice = 'Bạn đang thừa cân. Nên ăn uống ít chất béo và tăng cường tập luyện.';
      } else {
        bmiAdvice = 'Bạn đang béo phì. Cần có chế độ ăn uống và tập luyện nghiêm ngặt hơn.';
      }
    } else if (gender.toLowerCase() === 'nu') {
      if (bmiValue < 18.5) {
        bmiAdvice = 'Bạn đang thiếu cân. Nên ăn uống đầy đủ dưỡng chất và tập luyện nhẹ nhàng.';
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiAdvice = 'Bạn có chỉ số BMI bình thường. Hãy duy trì chế độ ăn uống và tập luyện hiện tại.';
      } else if (bmiValue >= 24.5 && bmiValue < 29.9) {
        bmiAdvice = 'Bạn đang thừa cân. Nên ăn uống ít chất béo và tăng cường tập luyện.';
      } else {
        bmiAdvice = 'Bạn đang béo phì. Cần có chế độ ăn uống và tập luyện nghiêm ngặt hơn.';
      }
    }

    setAdvice(bmiAdvice);

    Alert.alert(
      'Chỉ số BMI của bạn',
      `${bmiValue.toFixed(2)} - ${bmiAdvice}`
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: 'https://cdn-icons-png.flaticon.com/256/4825/4825112.png' }} />
      <TextInput
        style={styles.inputField}
        placeholder="Họ và tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Cân nặng (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Chiều cao (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Giới tính"
        value={gender}
        onChangeText={setGender}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Out" color="#f44336" onPress={signOut} />
        <Button title="Update" color="#4CAF50" onPress={updateProfile} />
      </View>
      <Button title="Calculate BMI" onPress={calculateBmi} style={styles.bmiButton} />
      {bmi && (
        <View style={styles.resultContainer}>
          <Text>Chỉ số BMI của bạn: {bmi}</Text>
          <Text>Lời khuyên: {advice}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafad2',
    paddingBottom: 100, // Adjust this value to move the content up
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 70,
    backgroundColor: '#cccccc',
    marginBottom: 10,
  },
  inputField: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  bmiButton: {
    // marginBottom: 10, // Adjust this value if needed
    // marginTop:50
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
