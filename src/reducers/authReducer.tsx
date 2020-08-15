import { SIGN_IN, SIGN_OUT, reduxAction } from "../actions/types";
const INITIAL_STATE: {
  isSignedIn: boolean | null;
  userId: string | null;
  email: string | null;
} = {
  isSignedIn: null,
  userId: null,
  email: null,
};

export default (state = INITIAL_STATE, action: reduxAction) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, email: null };
    default:
      return state;
  }
};
