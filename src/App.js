import './App.css';
// Components
import Display from './components/display/Display';
import Colors from './components/colors/Colors';
import Controls from './components/controls/Controls';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div id="app">
      <div id="game-wrapper">
        <div id="game-case">
          <h1>Simon</h1>
          <Display />
          <Colors />
          <Controls />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
