import {configureStore} from '@reduxjs/toolkit'
import { nonSerializableValueMiddleware } from './middleware';
import zoneReducer from "../slices/selectedZoneSlice";
import searchTextReducer from "../slices/searchTextSlice";
import selectedDateReducer from "../slices/selectedDateSlice";
import availableDatesReducer from "../slices/availableDatesSlice";

const reducer = {
    selectedZone: zoneReducer,
    searchText: searchTextReducer,
    selectedDate: selectedDateReducer,
    availableDates: availableDatesReducer,
}

const store = configureStore({
    middleware: [nonSerializableValueMiddleware],
    reducer: reducer,
    devTools: true,
})

export default store;
