import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import { reducer as formReducer } from "redux-form";

export const rootReducer = combineReducers({
  orderReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
