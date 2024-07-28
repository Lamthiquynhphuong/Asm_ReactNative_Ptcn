import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

// Danh sách nhạc thiền
const meditationMusicList = [
  { id: '1', title: 'Thiền', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
];

// Danh sách nhạc yoga (chỉ chứa một bài nhạc)
const yogaMusicList = [
  { id: '2', title: 'Yoga Relax', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

// Danh sách nhạc thư giãn
const relaxationMusicList = [
  { id: '3', title: 'Thư giãn', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

// Danh sách nhạc chữa lành
const healingMusicList = [
  { id: '4', title: 'Chữa lành', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

// Kết hợp danh sách nhạc
const combinedMusicList = [
  ...meditationMusicList,
  ...yogaMusicList,
  ...relaxationMusicList,
  ...healingMusicList
];

const MusicPlayer = ({ soundUrl, title, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Cleanup sound object on unmount
    return () => {
      if (sound) {
        sound.release();
        console.log('Sound released');
      }
    };
  }, [sound]);

  const togglePlayPause = () => {
    console.log('Toggling play/pause for:', title);
    if (!sound) {
      console.log('Loading sound:', soundUrl);
      const newSound = new Sound(soundUrl, null, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        console.log('Sound loaded successfully');
        newSound.play((success) => {
          if (success) {
            console.log('Successfully played the sound');
          } else {
            console.log('Playback failed due to audio decoding errors');
            setIsPlaying(false);
          }
        });
        setIsPlaying(true);
        setSound(newSound);
      });
    } else if (isPlaying) {
      console.log('Pausing sound');
      sound.pause(() => {
        console.log('Sound paused');
        setIsPlaying(false);
      });
    } else {
      console.log('Resuming sound');
      sound.play(() => {
        console.log('Sound resumed playing');
        setIsPlaying(true);
      });
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.musicPlayerContainer}>

      <View style={styles.rowContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.musicTitle}>{title}</Text>
        <TouchableOpacity onPress={togglePlayPause} style={styles.iconContainer}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Activity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.view}>Danh Sách Phát Nhạc</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {combinedMusicList.map(item => (
          <MusicPlayer
            key={item.id}
            soundUrl={item.url}
            title={item.title}
            imageUrl={
              item.id === '1'
                ? 'https://cdn-icons-png.flaticon.com/256/6663/6663870.png' // Hình ảnh cho thiền
                : item.id === '2'
                  ? 'https://cdn-icons-png.flaticon.com/256/8662/8662372.png' // Hình ảnh cho yoga
                  : item.id === '3'
                    ? 'https://cdn-icons-png.flaticon.com/256/6663/6663869.png' // Hình ảnh cho thư giãn
                    : 'https://cdn-icons-png.flaticon.com/256/8858/8858721.png' // Hình ảnh cho chữa lành
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafad2', // Màu nền của toàn bộ trang
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10, // Thêm khoảng cách dọc nếu cần
  },
  musicPlayerContainer: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    width: '90%',
  },
  rowContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between', // Phân bổ không gian đều giữa các phần tử
    width: '100%', // Đảm bảo rằng các phần tử chiếm toàn bộ chiều rộng của container
  },
  musicTitle: {
    fontSize: 18,
    marginRight: 20, // Khoảng cách giữa tiêu đề và nút play/pause
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Đặt chiều rộng của nút Play/Pause
    height: 50, // Đặt chiều cao của nút Play/Pause
    borderRadius: 25, // Đặt borderRadius để tạo hình tròn cho nút
    backgroundColor: '#eee',
  },
  image: {
    width: 70, // Đặt chiều rộng của hình ảnh
    height: 70, // Đặt chiều cao của hình ảnh
    borderRadius: 25, // Đặt borderRadius để tạo hình tròn cho hình ảnh
    marginRight: 20, // Khoảng cách giữa hình ảnh và tiêu đề
  },
  view: {
    fontSize: 20,
    color: 'black',
    marginLeft: 90,
    padding: 20,
    fontFamily: 'bold'
  }
});

export default Activity;
