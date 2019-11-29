export const getNumberOfPages = <ListItem>(list: Array<ListItem>, itemsPerPage: number): Array<number> => {
  if (itemsPerPage <= 0) {
    return [];
  }
  if (!Array.isArray(list)) new Error('Invalid supplied Lists.'); // Use array slice to create Paginated lists...
  const numberOfPages = Math.ceil(list.length / itemsPerPage);
  return Array.from(Array(numberOfPages).keys());
};

export const getCurrentPage = <ListItem>(
  list: Array<ListItem>,
  itemsPerPage: number,
  page: number,
): Array<ListItem> => {
  if (itemsPerPage <= 0 || page < 0) {
    return [];
  }
  if (!Array.isArray(list)) new Error('Invalid supplied Lists.'); // Use array slice to create Paginated lists...
  return list.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
};

export const generatePageArray = (
  items: Array<number>,
  currentPage: number,
  leftMargin: number,
  rightMargin: number,
  displayRange: number,
) => {
  if (currentPage < 0) {
    currentPage = 0;
  }
  const leftSideIndex = leftMargin;

  const rightSideIndex = items.length - rightMargin - 1;

  let finalArr: Array<number> = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i] < leftSideIndex) {
      finalArr = [...finalArr, items[i]];
      continue;
    }

    if (items[i] > rightSideIndex) {
      finalArr = [...finalArr, items[i]];
      continue;
    }

    if (currentPage === items[i]) {
      finalArr = [...finalArr, items[i]];
      continue;
    }

    let from = currentPage - displayRange / 2;
    let to = currentPage + displayRange / 2;

    if (from < 0) {
      to += Math.abs(from) + leftSideIndex - 1;
    }

    if (to > items.length - 1) {
      from -= Math.abs(to - items.length);
    }

    if (items[i] >= from && items[i] <= to) {
      finalArr = [...finalArr, items[i]];
      continue;
    }
  }
  return finalArr;
};
