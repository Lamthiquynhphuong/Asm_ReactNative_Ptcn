import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const nangCaoTinhThanData = [
  { id: '1', title: 'Nâng cao tinh thần', image: require('../img/6663870.png') },
  // Bạn có thể thêm nhiều mục hơn ở đây
];
const vanDong = [
  { id: '2', title: 'Vận động', image: require('../img/7144840.png') },
  // Bạn có thể thêm nhiều mục hơn ở đây
];
const tinhthan = [
  { id: '3', title: 'Tinh thần', image: require('../img/hhhh.png') },
  // Bạn có thể thêm nhiều mục hơn ở đây
];

const renderItem = ({ item, navigation }) => (
  <TouchableOpacity 
    onPress={() => {
      if (item.id === '1') {
        navigation.navigate('Luyện tập'); // Chuyển đến màn hình "Luyện tập"
      } else if (item.id === '2') {
        navigation.navigate('Buocchay'); // Chuyển đến màn hình "Chạy bộ"
      } else if (item.id === '3') {
        navigation.navigate('Bieton'); // Chuyển đến màn hình "Tinh thần"
      }
    }}
  >
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

const Trangchu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bạn đang ở chế độ tốt</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={nangCaoTinhThanData}
          renderItem={({ item }) => renderItem({ item, navigation })}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={[styles.flatListContainer, styles.marginTop]}>
        <FlatList
          data={vanDong}
          renderItem={({ item }) => renderItem({ item, navigation })}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={[styles.flatListContainer, styles.marginTop]}>
        <FlatList
          data={tinhthan}
          renderItem={({ item }) => renderItem({ item, navigation })}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Trangchu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafad2', // Màu nền của toàn màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    marginTop: -100,
  },
  flatListContainer: {
    width: '90%', // Điều chỉnh chiều rộng nếu cần
    backgroundColor: '#fff', // Màu nền trắng cho container FlatList
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Thêm hiệu ứng bóng cho Android
    shadowColor: '#000', // Màu bóng cho iOS
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng cho iOS
    shadowOpacity: 0.2, // Độ mờ bóng cho iOS
    shadowRadius: 3, // Bán kính mờ bóng cho iOS
  },
  marginTop: {
    marginTop: 40, // Thêm khoảng cách 40 đơn vị giữa các FlatList
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
  },
});
