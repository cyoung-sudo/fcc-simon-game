import { createSlice } from '@reduxjs/toolkit';

export const colorsSlice = createSlice({
  name: 'colors',
  initialState: {
    seq: [],
    seqIdx: 0,
    colorIdx: 0,
    playingSeq: false
  },
  reducers: {
    //----- Reset colors state
    resetClrState: state => {
      state.seq = [];
      state.seqIdx = 0;
      state.colorIdx = 0;
      state.playingSeq = false;
      console.log("Reset colors state");
    },
    //----- Build full color sequence
    buildSeq: state => {
      let seq = [];
      let seqLength = 20;
      let colors = ["red", "green", "blue", "yellow"];
      for(let i=0; i<seqLength; i++) {
        // Store random color
        let min = 0;
        let max = colors.length - 1;
        let i = Math.floor(Math.random() * (max - min + 1) + min);
        seq.push(colors[i]);
      }
      state.seq = seq;
      console.log(`Seq built: ${state.seq}`);
    },
    //----- Move index to next color
    nextClr: state => {
      state.colorIdx = state.colorIdx + 1;
      console.log("Next color");
    },
    //----- Start next relevant sequence
    nextSeq: state => {
      state.colorIdx = 0;
      state.seqIdx = state.seqIdx + 1;
      console.log("Next sequence");
    },
    //----- Restart current relevant sequence
    restartSeq: state => {
      state.colorIdx = 0;
      console.log("Restart sequence");
    },
    //----- Start playing sequence colors
    startSeq: state => {
      state.playingSeq = true;
      console.log("Start playing sequence...");
    },
    //----- Finished playing sequence colors
    finishedSeq: state => {
      state.playingSeq = false;
      console.log("Finished playing sequence");
    }
  }
});

export const { resetClrState, buildSeq, nextClr, nextSeq, restartSeq, startSeq, finishedSeq } = colorsSlice.actions;

export default colorsSlice.reducer;