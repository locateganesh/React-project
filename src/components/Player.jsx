import { useState } from 'react';

export default function Player({name: intialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(intialName);

    const handleEditClick = () => {
        // setIsEditing(!isEditing); // Don't use this way because react schedules the state.
        setIsEditing(editing => !editing) // always better to use this way.
        if (isEditing) {
          onChangeName(symbol, playerName);
        }
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let editPlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = 'EDIT';
    if (isEditing) {
        editPlayerName = <input type='text' required value={playerName} onChange={handleChange} />
        buttonCaption = 'SAVE';
    }

    return <li className={isActive ? 'active' : undefined}>
    <span className="player">
      {editPlayerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{buttonCaption}</button>
  </li>
}