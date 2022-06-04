import './Colors.css';
// React
import { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { resetClrState, buildSeq, nextClr, nextSeq, restartSeq, startSeq, finishedSeq } from '../../redux/reducers/colorsSlice';
import { resetDspState, nextTurn } from '../../redux/reducers/displaySlice';
// Helpers
import { timeout } from '../../utils/ColorsHelper';

export default function Colors(props) {
  const { power, start, strict } = useSelector((state) => state.controls);
  const { seq, seqIdx, colorIdx, playingSeq } = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  // Trigger on start
  useEffect(() => {
    if(start) {
      // Build sequence
      dispatch(buildSeq());
      // Next turn
      dispatch(nextTurn());
      // Play relevant sequence
      dispatch(startSeq());
    }
  }, [start]);

  // Trigger on "play sequence"
  useEffect(() => {
    if(playingSeq) {
      // Play relevant sequence
      playSeq()
        .then(() => {
          // Finished playing sequence
          dispatch(finishedSeq());
        })
    }
  }, [playingSeq]);

  // Game audio
  const audio1 = new Audio("https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Electronic%20Hits/12[kb]bleep_1.wav.mp3");
  const audio2 = new Audio("https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Electronic%20Hits/46[kb]deepzap.wav.mp3");
  const audioWrong = new Audio("https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Electronic%20Hits/133[kb]big_noise_hit.wav.mp3");
  const audioWin = new Audio("https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/SYNTH%20AND%20ELECTRONIC%20LOOPS/476[kb]086_computer_melody.wav.mp3");

  // Play revelant sequence
  const playSeq = async () => {
    await timeout(1000);
    // Remove existing hover styles
    document.getElementById("red").classList.remove("hover");
    document.getElementById("green").classList.remove("hover");
    document.getElementById("blue").classList.remove("hover");
    document.getElementById("yellow").classList.remove("hover");
    let i = 0
    while(i <= seqIdx) {
      let colorEl = document.getElementById(seq[i]);
      await timeout(500);
      // Play audio
      if(audio1.paused) {
        audio1.play();
      } else {
        audio1.currentTime = 0
      }
      colorEl.classList.add("hover");
      await timeout(2000);
      colorEl.classList.remove("hover");
      i++;
    }
  };

  // Handle color buttons
  const colorHandler = async color => {
    if(power && start && !playingSeq) {
      // Play audio
      if(audio2.paused) {
        audio2.play();
      } else {
        audio2.currentTime = 0
      }
      if(color === seq[colorIdx]) {
        // Correct color
        console.log("Correct");
        if(colorIdx === seqIdx) {
          // End of sequence
          if(seqIdx === seq.length - 1) {
            //--- End of game
            console.log(">> You win <<");
            // Play audio
            audioWin.play();
            await timeout(3000)
            // Reset game state
            dispatch(resetClrState());
            // Reset display state
            dispatch(resetDspState());
            // Build sequence
            dispatch(buildSeq());
            // Next turn
            dispatch(nextTurn());
            // Play relevant sequence
            dispatch(startSeq());
            // Reset game
          } else {
            // Next relevant sequence
            dispatch(nextSeq());
            // Next turn
            dispatch(nextTurn());
            // Play relevant sequence
            dispatch(startSeq());
          }
        } else {
          // Next color
          dispatch(nextClr());
        }
      } else {
        // Incorrect color
        console.log("Incorrect");
        // Play audio
        if(audioWrong.paused) {
          audioWrong.play();
        } else {
          audioWrong.currentTime = 0
        }
        if(strict) {
          //--- Strict enabled
          // Reset game state
          dispatch(resetClrState());
          // Reset display state
          dispatch(resetDspState());
          // Build sequence
          dispatch(buildSeq());
          // Next turn
          dispatch(nextTurn());
          // Play relevant sequence
          dispatch(startSeq());
        } else {
          //--- Strict disabled
          // Restart sequence
          dispatch(restartSeq());
          // Play relevant sequence
          dispatch(startSeq());
        }
      }
    }
  };

  // Add styling on hover
  const colorHover = color => {
    if(power && start && !playingSeq) {
      document.getElementById(color).classList.add("hover");
    }
  };

  // Remove styling on unhover
  const colorUnhover = color => {
    if(power && start) {
      document.getElementById(color).classList.remove("hover");
    }
  };

  return (
    <div id="colors">
      <div>
        <button id="red" 
          onClick={() => colorHandler("red")}
          onMouseEnter={() => colorHover("red")}
          onMouseLeave={() => colorUnhover("red")}></button>
        <button id="green" 
          onClick={() => colorHandler("green")}
          onMouseEnter={() => colorHover("green")}
          onMouseLeave={() => colorUnhover("green")}></button>
      </div>
      <div>
        <button id="blue" 
          onClick={() => colorHandler("blue")}
          onMouseEnter={() => colorHover("blue")}
          onMouseLeave={() => colorUnhover("blue")}></button>
        <button id="yellow" 
          onClick={() => colorHandler("yellow")}
          onMouseEnter={() => colorHover("yellow")}
          onMouseLeave={() => colorUnhover("yellow")}></button>
      </div>
    </div>
  );
};