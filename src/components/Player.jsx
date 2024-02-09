import { useState ,useRef} from "react";

export default function Player() {
  const [enterPlayerName, setEnterPlayerName] = useState(null);
  const player = useRef();
  function handleClick(event)
  {
    setEnterPlayerName(player.current.value)
    player.current.value = '';
  }
 
  return (
    <section id="player">
      <h2>Welcome { enterPlayerName}</h2>
      <p>
        <input type="text" ref={player}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
