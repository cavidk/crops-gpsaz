import {createSlice} from '@reduxjs/toolkit';
import { setSelectedZone } from "./selectedZoneSlice";

// Define the slice of the store
const searchTextSlice = createSlice({
    name: 'searchText',
    initialState: '',
    reducers: {
        setSearchText: (state, action) => {
            return {searchText: action.payload};
        },
        clearSearchInput: () => {
            return {searchText: null};
        },
    },
});

const {reducer, actions} = searchTextSlice;

export const {setSearchText, clearSearchInput} = actions
export default reducer;
