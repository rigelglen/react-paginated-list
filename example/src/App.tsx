import React from 'react';
import { useState } from 'react';

import { PaginatedList } from './react-paginated-list';

interface AppState {
  isLoading: boolean;
  users: Array<User>;
}

interface User {
  first_name: string;
  last_name: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    users: [
      { first_name: 'fdsfsdf1', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf2', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf3', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf4', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf5', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf6', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf7', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf8', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf9', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf10', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf11', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf12', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf13', last_name: 'dfgsdfdsf' },
      { first_name: 'fdsfsdf14', last_name: 'dfgsdfdsf' },
    ],
  });

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
          first_name: 'fdsfsdfnew',
          last_name: 'new_last_name',
        },
      ],
    });
  };

  return (
    <div className="App">
      <button className="add-btn" onClick={addItem}>
        Add item
      </button>
      <PaginatedList<User>
        list={state.users}
        itemsPerPage={3}
        isLoading={state.isLoading}
        onPageChange={onPageChange}
        currentPage={1}
        displayRange={2}
        leftMargin={1}
        rightMargin={1}
        breakItem={() => <li>...</li>}
        loadingItem={() => <p>Loading...</p>}
        nextText="Next"
        prevText="Prev"
        renderList={(list: Array<User>) => (
          <>
            {list.map((item: User, id: number) => {
              return (
                <div key={id}>
                  {item.first_name} {item.last_name}
                </div>
              );
            })}
          </>
        )}
      />
    </div>
  );
}

export default App;
