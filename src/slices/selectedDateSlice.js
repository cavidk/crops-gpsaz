import {createSlice} from '@reduxjs/toolkit';
import { setSelectedZone } from "./selectedZoneSlice";

// Define the slice of the store
const selectedDateSlice = createSlice({
    name: 'selectedDate',
    initialState: new Date(),
    reducers: {
        setSelectedDate: (state, action) => {
            return {selectedDate: action.payload};
        },
        clearSelectedDate: () => {
            return {selectedDate: null};
        },
    },
});

const {reducer, actions} = selectedDateSlice;

export const {setSelectedDate, clearSelectedDate} = actions
export default reducer;
