import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slice/UserSlice";
import {
  challengeSlice,
  myChallengeSlice,
  onGoingMyChallengeSlice,
  completeMyChallengeSlice,
  plannedMyChallengeSlice,
} from "./slice/ChallengeSlice";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  challenges: challengeSlice.reducer,
  myChallenges: myChallengeSlice.reducer,
  onGoingMyChallenges: onGoingMyChallengeSlice.reducer,
  completeMyChallenges: completeMyChallengeSlice.reducer,
  plannedMyChallenges: plannedMyChallengeSlice.reducer,
});

export default rootReducer;
