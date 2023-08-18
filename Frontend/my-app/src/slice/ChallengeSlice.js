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
export const onGoingMyChallengeSlice = createSlice({
  name: "onGoingChallenges",
  initialState: [],
  reducers: {
    setOnGoingMyChallenge: (state, action) => {
      return action.payload;
    },
  },
});

export const plannedMyChallengeSlice = createSlice({
  name: "plannedMyChallenges",
  initialState: [],
  reducers: {
    setPlannedMyChallenge: (state, action) => {
      return action.payload;
    },
  },
});

export const completeMyChallengeSlice = createSlice({
  name: "completeMyChallenges",
  initialState: [],
  reducers: {
    setCompleteMyChallenge: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChallenge } = challengeSlice.actions;
export const { setMyChallenge } = myChallengeSlice.actions;
export const { setOnGoingMyChallenge } = onGoingMyChallengeSlice.actions;
export const { setCompleteMyChallenge } = completeMyChallengeSlice.actions;
export const { setPlannedMyChallenge } = plannedMyChallengeSlice.actions;
