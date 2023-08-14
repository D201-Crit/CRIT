import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slice/UserSlice";
import {
  challengeSlice,
  myChallengeSlice,
  onGoingChallengeSlice,
  completeMyChallengeSlice,
} from "./slice/ChallengeSlice";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  challenges: challengeSlice.reducer,
  myChallenges: myChallengeSlice.reducer,
  onGoingChallenges: onGoingChallengeSlice.reducer,
  completeMyChallenges: completeMyChallengeSlice.reducer,
});

export default rootReducer;
