# React Paginated List

A simple react component to render a paginated list.

> This component does not have any included styles, but provides classes to necessary elements so that you can style it the way you like.

![React Paginated List working](https://i.imgur.com/tnwffrN.gif)

## Usage

- Pass in the list items that contain your data in the list prop

- In the renderList prop, pass in the function to render out a single list item.

```
let users = [{'a': 123, 'b': 345}, {'c': 678, 'd': 891}];
return (
<PaginatedList
    list={users}
    itemsPerPage={3}
    renderList={(list) => (
      <>
        {list.map((item, id) => {
          return (
            <div key={id}>
              {item.a} {item.b}
            </div>
          );
        })}
      </>
    )}
  />);
```

## Example Project

To run the example project,

- Clone the repo

```
git clone https://github.com/rigelglen/react-paginated-list
```

- Run example project

```
npm run dev
```

## Props

\* indicates a required prop

|        Prop        |                                                         Description                                                          |                    Type                     |       Default       |
| :----------------: | :--------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------: | :-----------------: |
|       list\*       | This is the list of items managed by the component. This list will be available in the renderList method to render your list |               Array<ListItem>               |          -          |
|    renderList\*    |                                  This is the function that renders each of your list items.                                  |        (list: Array) => JSX.Element         |          -          |
|    itemsPerPage    |                                                   Number of items per page                                                   |                   number                    |        `10`         |
|    onPageChange    |                                  Callback function that is called when the page is changed                                   | (items: Array, currentPage: number) => void |          -          |
|     isLoading      |                                           Sets whether the list is loading or not.                                           |                   boolean                   |       `false`       |
|    loadingItem     |                                        Component to be displayed when list is loading                                        |                 JSX.Element                 | `<p>Loading...</p>` |
|     breakItem      |                                              Item to be shown for the ellipsis                                               |                 JSX.Element                 |   `<li>...</li>`    |
|    displayRange    |                                                 The range of pages displayed                                                 |                   number                    |          3          |
|     leftMargin     |                                   Number of extra pagination items to display on the left                                    |                   number                    |          1          |
|    rightMargin     |                                   Number of extra pagination items to display on the right                                   |                   number                    |          1          |
|    currentPage     |                                                    Sets the initial page                                                     |                   number                    |          1          |
|    controlClass    |                                                 Class of the pagination box                                                  |                   string                    |   `'pagination'`    |
| activeControlClass |                                             Class of the active pagination item                                              |                   string                    |     `'active'`      |
|   displayNumbers   |                                                  Display pagination numbers                                                  |                   boolean                   |       `true`        |
|     loopAround     |                                                  Loop around after the end                                                   |                   boolean                   |       `false`       |
|     nextClass      |                                                   Class of the next button                                                   |                   string                    |       `next`        |
|     prevClass      |                                                   Class of the prev button                                                   |                   string                    |       `prev`        |
|      nextText      |                                                   Text inside next button                                                    |                   string                    |       `'〉'`        |
|      prevText      |                                                   Text inside prev button                                                    |                   string                    |       `'〈'`        |

## TODO

- Use styled-components
- Write baseline styles
- Include screenshots in README
- Improve documentation
