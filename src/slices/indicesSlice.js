import {createSlice} from '@reduxjs/toolkit';

// Define the slice of the store
const indicesSlice = createSlice({
    name: 'indices',
    initialState: {},
    reducers: {
        setIndices: (state, action) => {
            state.indices = action.payload;
        },
        clearIndices: (state) => {
            state.indices = [];
        },
    },
});

const {reducer, actions} = indicesSlice;

export const {setIndices, clearIndices} = actions
export default reducer;
