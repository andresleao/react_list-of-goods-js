import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const ALPHABETICALLY = 'alphabetically';
const BY_LENGTH = 'byLenght';

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isInitialOrder = sortedGoods.every(
    (item, index) => item === goodsFromServer[index],
  );

  const applySorting = type => {
    const sorted = [...goodsFromServer];

    if (type === ALPHABETICALLY) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === BY_LENGTH) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setSortedGoods(sorted);
    setSortType(type);
  };

  const reverseList = () => {
    setSortedGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetList = () => {
    setSortedGoods([...goodsFromServer]);
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => applySorting(ALPHABETICALLY)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => applySorting(BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseList}
          className={cn('button', 'is-success', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isInitialOrder ? (
          <button type="button" onClick={resetList} className="button">
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedGoods.map(g => (
          <li key={g} data-cy="Good">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
