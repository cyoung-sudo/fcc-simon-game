import './Display.css';
// Redux
import { useSelector } from 'react-redux';

export default function Display(props) {
  const { display } = useSelector((state) => state.display);
  const { power, start } = useSelector((state) => state.controls);

  return (
    <div id="display">
      {power ? (start ? display : "--") : ""}
    </div>
  );
};