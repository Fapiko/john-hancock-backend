import {configureStore, createStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export default createStore(rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
