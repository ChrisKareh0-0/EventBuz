
import SliceReducer from '../Redux/slice'
import { configureStore } from '@reduxjs/toolkit'

export const Store = configureStore({
    reducer: {
        data: SliceReducer,
    }
})