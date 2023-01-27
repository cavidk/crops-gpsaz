import {createSlice} from '@reduxjs/toolkit';

// Define the slice of the store
const selectedZoneSlice = createSlice({
    name: 'selectedZone',
    initialState: null,
    reducers: {
        setSelectedZone: (state, action) => {
            return {selectedZone: action.payload};
        },
        clearSelectedZone: () => {
            return {selectedZone: null};
        },
    },
});

const {reducer, actions} = selectedZoneSlice;

export const {setSelectedZone, clearSelectedZone} = actions
export default reducer;
