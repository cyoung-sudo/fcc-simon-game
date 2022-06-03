import { createSlice } from '@reduxjs/toolkit';

export const displaySlice = createSlice({
  name: 'controls',
  initialState: {
    display: "00"
  },
  reducers: {
    //----- Reset display state
    resetDspState: state => {
      state.display = "00";
      console.log("Reset display state");
    },
    //----- Display next turn
    nextTurn: state => {
      if(state.display[0] === "0") {
        // Single digit
        let num = parseInt(state.display[1]) + 1;
        state.display = "0" + num;
      } else {
        // Double digit
        let num = parseInt(state.display) + 1;
        state.display = num.toString();
      }
      console.log(`Turn ${state.display}`);
    }
  }
});

export const { resetDspState, nextTurn } = displaySlice.actions;

export default displaySlice.reducer;