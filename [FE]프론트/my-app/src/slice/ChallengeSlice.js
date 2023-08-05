import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
  name: "challenges",
  initialState: [],
  reducers: {
    setChallenge: (state, action) => {
      return action.payload;
    },
  },
});

export const myChallengeSlice = createSlice({
  name: "myChallenges",
  initialState: [],
  reducers: {
    setMyChallenge: (state, action) => {
      return action.payload;
    },
  },
});
export const onGoingChallengeSlice = createSlice({
  name: "onGoingChallenges",
  initialState: [],
  reducers: {
    setOnGoingChallenge: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChallenge } = challengeSlice.actions;
export const { setMyChallenge } = myChallengeSlice.actions;
export const { setOnGoingChallenge } = onGoingChallengeSlice.actions;
