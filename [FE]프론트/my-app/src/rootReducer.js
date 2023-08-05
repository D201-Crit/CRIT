import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slice/UserSlice";
import {
  challengeSlice,
  myChallengeSlice,
  onGoingChallengeSlice,
} from "./slice/ChallengeSlice";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  challenges: challengeSlice.reducer,
  myChallenges: myChallengeSlice.reducer,
  onGoingChallenges: onGoingChallengeSlice.reducer,
});

export default rootReducer;
