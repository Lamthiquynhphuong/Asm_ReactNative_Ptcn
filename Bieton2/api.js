import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://666035f55425580055b2cd5e.mockapi.io/react';

// Fetch data
export const fetchThuChi = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create new entry
export const createThuChi = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

// Update existing entry
export const updateThuChi = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

// Delete entry
export const deleteThuChi = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

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
