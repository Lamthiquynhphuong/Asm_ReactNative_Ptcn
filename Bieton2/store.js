import { configureStore } from '@reduxjs/toolkit';
import thuChiReducer from './gratitudeSlice';

export default configureStore({
    reducer: {
        thuchi: thuChiReducer,  // Đảm bảo tên này khớp với slice
    }
});
