import React, { useState } from 'react';
import './index.css';
import { PaginatedList } from './react-paginated-list';
import { Button, ControlContainer, ControlItem, PaginatedListContainer, StyledList } from './styles';

interface AppState {
  isLoading: boolean;
  users: Array<User>;
}

interface User {
  itemName: string;
  itemValue: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    users: [
      { itemName: 'Item 1', itemValue: 'Value 1' },
      { itemName: 'Item 2', itemValue: 'Value 2' },
      { itemName: 'Item 3', itemValue: 'Value 3' },
      { itemName: 'Item 4', itemValue: 'Value 4' },
      { itemName: 'Item 5', itemValue: 'Value 5' },
      { itemName: 'Item 6', itemValue: 'Value 6' },
      { itemName: 'Item 7', itemValue: 'Value 7' },
      { itemName: 'Item 8', itemValue: 'Value 8' },
      { itemName: 'Item 9', itemValue: 'Value 9' },
      { itemName: 'Item 10', itemValue: 'Value 10' },
      { itemName: 'Item 11', itemValue: 'Value 11' },
      { itemName: 'Item 12', itemValue: 'Value 12' },
      { itemName: 'Item 13', itemValue: 'Value 13' },
      { itemName: 'Item 14', itemValue: 'Value 14' },
      { itemName: 'Item 15', itemValue: 'Value 15' },
      { itemName: 'Item 16', itemValue: 'Value 16' },
      { itemName: 'Item 18', itemValue: 'Value 18' },
      { itemName: 'Item 19', itemValue: 'Value 19' },
      { itemName: 'Item 20', itemValue: 'Value 20' },
      { itemName: 'Item 21', itemValue: 'Value 21' },
      { itemName: 'Item 22', itemValue: 'Value 22' },
      { itemName: 'Item 23', itemValue: 'Value 23' },
      { itemName: 'Item 24', itemValue: 'Value 24' },
      { itemName: 'Item 25', itemValue: 'Value 25' },
      { itemName: 'Item 26', itemValue: 'Value 26' },
      { itemName: 'Item 27', itemValue: 'Value 27' },
      { itemName: 'Item 28', itemValue: 'Value 28' },
      { itemName: 'Item 29', itemValue: 'Value 29' },
      { itemName: 'Item 30', itemValue: 'Value 30' },
      { itemName: 'Item 31', itemValue: 'Value 31' },
      { itemName: 'Item 32', itemValue: 'Value 32' },
      { itemName: 'Item 33', itemValue: 'Value 33' },
    ],
  });

  const [counter, setCounter] = useState(15);

  const onPageChange = (items: Array<User>, currentPage: number) => {
    console.log('items are ', items);
    console.log('index is ', currentPage);
  };

  const addItem = () => {
    setState({
      ...state,
      users: [
        ...state.users,
        {
          itemName: `Item ${counter}`,
          itemValue: `Value ${counter}`,
        },
      ],
    });
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React Paginated List</h1>
        <Button onClick={addItem}>Add item</Button>
        <PaginatedList<User>
          list={state.users}
          itemsPerPage={5}
          isLoading={state.isLoading}
          onPageChange={onPageChange}
          currentPage={1}
          displayRange={2}
          leftMargin={1}
          rightMargin={1}
          controlClass={'pagination-control'}
          PaginatedListContainer={PaginatedListContainer}
          ControlContainer={ControlContainer}
          ControlItem={ControlItem}
          breakText={'...'}
          breakClass={'pagination-break'}
          loadingItem={() => <p>Loading...</p>}
          nextText="Next"
          prevText="Prev"
          renderList={(list: Array<User>) => (
            <StyledList>
              {list.map((item: User, id: number) => {
                return (
                  <li key={id}>
                    <span>{item.itemName}</span>
                    <span>{item.itemValue}</span>
                  </li>
                );
              })}
            </StyledList>
          )}
        />
      </div>
      <span id="forkongithub">
        <a href="https://github.com/rigelglen/react-paginated-list">Fork me on GitHub</a>
      </span>
    </div>
  );
}

export default App;
