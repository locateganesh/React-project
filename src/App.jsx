
import Player from './components/Player.jsx';
import Timer from './components/Timer.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <Timer title="Easy" time={1} />
        <Timer title="Not Easy" time={5} />
        <Timer title="Getting Tough" time={10} />
        <Timer title="Pros Only" time={15} />
      </div>
    </>
  );
}

export default App;
