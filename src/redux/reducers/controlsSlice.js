import { createSlice } from '@reduxjs/toolkit';

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    power: false,
    start: false,
    strict: false
  },
  reducers: {
    //----- Reset controls
    resetCtrlState: state => {
      state.power = false;
      state.start = false;
      state.strict = false;
      console.log("Power off");
    },
    //----- Power on
    powerOn: state => {
      state.power = true;
      console.log("Power on");
    },
    //----- Start game
    startGame: state => {
      state.start = true;
      console.log("Start game");
    },
    //----- Toggle strict mode
    strictTgl: state => {
      state.strict = !state.strict;
      console.log(`Strict mode: ${state.strict}`);
    }
  }
});

export const { resetCtrlState, powerOn, startGame, strictTgl } = controlsSlice.actions;

export default controlsSlice.reducer;