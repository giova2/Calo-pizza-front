import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";

export const rootReducer = combineReducers({
  orderReducer: orderReducer,
  auth: authReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
