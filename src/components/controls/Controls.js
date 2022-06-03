import './Controls.css';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { resetCtrlState, powerOn, startGame, strictTgl } from '../../redux/reducers/controlsSlice';
import { resetDspState, nextTurn } from '../../redux/reducers/displaySlice';
import { resetClrState, buildSeq, startSeq } from '../../redux/reducers/colorsSlice';
// Icons
import { FaPowerOff } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';

export default function Controls(props) {
  const { power, start, strict } = useSelector((state) => state.controls);
  const dispatch = useDispatch();

  // Handle power button
  const powerHandler = () => {
    if(power) {
      //--- Power off
      // Reset display state
      dispatch(resetDspState());
      // Reset colors state
      dispatch(resetClrState());
      // Reset controls state
      dispatch(resetCtrlState());
    } else {
      //--- Power on
      dispatch(powerOn());
    }
  };

  // Handle start button
  const startHandler = () => {
    if(power) {
      if(start) {
        //--- Reset game
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
        //--- Start game
        dispatch(startGame());
      }
    }
  };

  // Handle strict button
  const strictHandler = () => {
    if(power) {
      if(strict) {
        // Disable mode
        dispatch(strictTgl())
      } else {
        // Enable mode
        dispatch(strictTgl())
      }
    }
  };

  return (
    <div id="controls">
      <div id="game-btns">
        <button id="start" onClick={() => startHandler()}>start</button>
        <button id="strict" onClick={() => strictHandler()}>
          strict<span style={{color: strict ? "#39FF14" : "hsla(0, 0%, 90%, 0.5)"}}><GoPrimitiveDot/></span>
        </button>
      </div>
      <div>
        <button id="power" onClick={() => powerHandler()} style={{color: power ? "#39FF14" : "hsla(0, 0%, 90%, 0.5)"}}><FaPowerOff/></button>
      </div>
    </div>
  );
};