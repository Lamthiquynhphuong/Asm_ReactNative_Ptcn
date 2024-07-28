import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchThuChi, createThuChi, updateThuChi, deleteThuChi } from './api';

const initialState = {
    listThuChi: [],
    status: 'idle',
    error: null,
};

// Thunks
export const fetchThuChiAsync = createAsyncThunk('thuchi/fetchThuChi', async () => {
    const response = await fetchThuChi();
    return response;
});

export const addThuChiAsync = createAsyncThunk('thuchi/addThuChi', async (data) => {
    const response = await createThuChi(data);
    return response;
});

export const updateThuChiAsync = createAsyncThunk('thuchi/updateThuChi', async ({ id, data }) => {
    const response = await updateThuChi(id, data);
    return response;
});

export const deleteThuChiAsync = createAsyncThunk('thuchi/deleteThuChi', async (id) => {
    await deleteThuChi(id);
    return id;
});

const thuChiSlice = createSlice({
    name: 'thuchi',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchThuChiAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchThuChiAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listThuChi = action.payload;
            })
            .addCase(fetchThuChiAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addThuChiAsync.fulfilled, (state, action) => {
                state.listThuChi.push(action.payload);
            })
            .addCase(updateThuChiAsync.fulfilled, (state, action) => {
                const index = state.listThuChi.findIndex((item) => item.id === action.payload.id);
                if (index >= 0) {
                    state.listThuChi[index] = action.payload;
                }
            })
            .addCase(deleteThuChiAsync.fulfilled, (state, action) => {
                state.listThuChi = state.listThuChi.filter((item) => item.id !== action.payload);
            });
    },
});

export default thuChiSlice.reducer;
