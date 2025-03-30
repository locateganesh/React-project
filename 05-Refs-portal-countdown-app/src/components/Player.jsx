import { useRef, useState } from "react";

export default function Player() {
  const inputPlayer = useRef();
  const [enteredplayerName, setEnteredPlayerName] = useState('');

  const submitHandler = () => {
    setEnteredPlayerName(inputPlayer.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {enteredplayerName ? enteredplayerName : 'There'}</h2>
      <p>
        <input ref={inputPlayer} type="text" />
        <button onClick={submitHandler}>Set Name</button>
      </p>
    </section>
  );
}
