import {createSlice} from '@reduxjs/toolkit';
import { setSelectedZone } from "./selectedZoneSlice";

// Define the slice of the store
const availableDatesSlice = createSlice({
    name: 'availableDates',
    initialState: {},
    reducers: {
        setAvailableDates: (state, action) => {
            let timeSeries = action.payload;
            let dateArray = [];
            if (timeSeries.length > 0) {
                timeSeries.forEach(date => {
                    dateArray.push(new Date(date));
                })
            }
            state.availableDates = dateArray;
        },
        clearAvailableDates: (state) => {
            state.availableDates = [];
        },
    },
});

const {reducer, actions} = availableDatesSlice;

export const {setAvailableDates, clearAvailableDates} = actions
export default reducer;
