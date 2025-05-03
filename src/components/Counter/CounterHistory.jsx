import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count, id }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} data-id={id} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} id={count.id} count={count.value} />
      ))}
    </ol>
  );
}
