import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThuChiAsync, addThuChiAsync, deleteThuChiAsync, updateThuChiAsync } from '../Bieton2/gratitudeSlice';

const Bieton = () => {
    const [moTa, setMoTa] = useState('');
    const [ngay, setNgay] = useState('');
    const [localError, setLocalError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    const listThuChi = useSelector(state => state.thuchi.listThuChi);

    useEffect(() => {
        dispatch(fetchThuChiAsync());
    }, [dispatch]);

    const handleAddThuChi = () => {
        if (!moTa.trim() || !ngay.trim()) {
            setLocalError('Không được để trống!');
        } else {
            let duLieuThem = { moTa, ngay };
            dispatch(addThuChiAsync(duLieuThem))
                .then(() => {
                    Alert.alert('Thành công', 'Đã thêm biết ơn thành công!');
                    resetInputs();
                })
                .catch(() => {
                    Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm biết ơn.');
                });
            setLocalError('');
        }
    };

    const handleUpdateThuChi = () => {
        if (!selectedItem) {
            setLocalError('Chưa chọn item để sửa!');
            return;
        }
        if (!moTa.trim() || !ngay.trim()) {
            setLocalError('Không được để trống!');
        } else {
            let updatedItem = { ...selectedItem, moTa, ngay };
            dispatch(updateThuChiAsync({ id: selectedItem.id, data: updatedItem }))
                .then(() => {
                    Alert.alert('Thành công', 'Đã sửa biết ơn thành công!');
                    resetInputs();
                })
                .catch(() => {
                    Alert.alert('Lỗi', 'Có lỗi xảy ra khi sửa biết ơn.');
                });
            setLocalError('');
        }
    };

    const handleDeleteThuChi = (id) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        dispatch(deleteThuChiAsync(id))
                            .then(() => {
                                Alert.alert('Thành công', 'Đã xóa biết ơn thành công!');
                            })
                            .catch(() => {
                                Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa biết ơn.');
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setMoTa(item.moTa);
        setNgay(item.ngay);
    };

    const resetInputs = () => {
        setMoTa('');
        setNgay('');
        setSelectedItem(null);
    };

    const filteredThuChi = listThuChi.filter(item =>
        item.moTa && item.moTa.toLowerCase().includes(moTa.toLowerCase())
    );

    const ThuChiItem = ({ tc }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectItem(tc)}>
            <View style={styles.ngang}>
                <Text style={styles.ngay}>Ngày: {tc.ngay}</Text>
            </View>
            <View style={styles.ngang}>
                <Text style={styles.mieuTa}>Biết ơn: {tc.moTa}</Text>
                <TouchableOpacity onPress={() => handleDeleteThuChi(tc.id)} style={styles.deleteButton}>
                    <Image source={require('../img/delete24.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Biết Ơn</Text> */}
            <Image source={require('../img/gratitude.png')} style={styles.img}/>
            <TextInput placeholder='Nhập ngày' onChangeText={setNgay} value={ngay} style={styles.input} />
            <TextInput multiline={true} placeholder='Nhập biết ơn' onChangeText={setMoTa} value={moTa} style={styles.input} />
            <Text style={styles.error}>{localError}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddThuChi} style={styles.button}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdateThuChi} style={styles.button}>
                    <Text style={styles.buttonText}>Sửa</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredThuChi}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ThuChiItem tc={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fafad2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    ngang: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ngay: {
        fontSize: 18,
    },
    mieuTa: {
        fontSize: 16,
    },
    deleteButton: {
        alignSelf: 'flex-end',
    },
    deleteIcon: {
        width: 24,
        height: 24,
    },
    img:{
        width:120,
        height:120,
        marginLeft:130,
        padding:10,
        marginBottom:30
    }
});

export default Bieton;
