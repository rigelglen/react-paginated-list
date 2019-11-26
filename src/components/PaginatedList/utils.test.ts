import { getNumberOfPages, getCurrentPage, generatePageArray } from './utils';

const testList = [
  { first_name: 'first_name_1', last_name: 'last_name_1' },
  { first_name: 'first_name_2', last_name: 'last_name_2' },
  { first_name: 'first_name_3', last_name: 'last_name_3' },
  { first_name: 'first_name_4', last_name: 'last_name_4' },
  { first_name: 'first_name_5', last_name: 'last_name_5' },
  { first_name: 'first_name_6', last_name: 'last_name_6' },
  { first_name: 'first_name_7', last_name: 'last_name_7' },
  { first_name: 'first_name_8', last_name: 'last_name_8' },
  { first_name: 'first_name_9', last_name: 'last_name_9' },
  { first_name: 'first_name_10', last_name: 'last_name_10' },
];

describe('testing utility functions', () => {
  describe('getNumberOfPages', () => {
    it('calculates the number array correctly', () => {
      const itemsPerPage = 3;
      expect(getNumberOfPages(testList, itemsPerPage).length).toBe(Math.ceil(testList.length / itemsPerPage));
    });

    it('handles 0 per page', () => {
      const itemsPerPage = 0;
      expect(getNumberOfPages(testList, itemsPerPage).length).toBe(0);
    });
  });

  describe('getCurrentPage', () => {
    it('gets the current items on the page correctly', () => {
      const itemsPerPage = 3;
      const page = 0;
      expect(getCurrentPage(testList, itemsPerPage, page).length).toBe(itemsPerPage);
    });

    it('handles 0 itemsPerPage', () => {
      const itemsPerPage = 0;
      const page = 0;
      expect(getCurrentPage(testList, itemsPerPage, page).length).toBe(itemsPerPage);
    });

    it('handles invalid itemsPerPage', () => {
      const itemsPerPage = -1;
      expect(getCurrentPage(testList, itemsPerPage, 0).length).toBe(0);
    });

    it('handles invalid page', () => {
      const itemsPerPage = 2;
      const page = -2;
      expect(getCurrentPage(testList, itemsPerPage, page).length).toBe(0);
    });
  });

  describe('generatePageArray', () => {
    it('generates the page array correctly', () => {
      const currentPage = 0;
      const leftMargin = 2;
      const rightMargin = 2;
      const displayRange = 2;
      const itemsPerPage = 1;
      const items = getNumberOfPages(testList, itemsPerPage);
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(
        leftMargin + rightMargin + displayRange,
      );
    });

    it('handles 0 leftMargin', () => {
      const currentPage = 2;
      const leftMargin = 0;
      const rightMargin = 2;
      const displayRange = 2;
      const itemsPerPage = 1;

      const items = getNumberOfPages(testList, itemsPerPage);
      const modifier = displayRange % 2 === 0 ? 1 : 0;
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(
        leftMargin + rightMargin + displayRange + modifier,
      );
    });

    it('handles 0 rightMargin', () => {
      const currentPage = 0;
      const leftMargin = 2;
      const rightMargin = 0;
      const displayRange = 2;
      const itemsPerPage = 1;
      const items = getNumberOfPages(testList, itemsPerPage);
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(
        leftMargin + rightMargin + displayRange,
      );
    });

    it('handles 0 displayRange', () => {
      const currentPage = 0;
      const leftMargin = 2;
      const rightMargin = 1;
      const displayRange = 0;
      const itemsPerPage = 1;
      const items = getNumberOfPages(testList, itemsPerPage);
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(
        leftMargin + rightMargin + displayRange,
      );
    });

    it('handles very large displayRange', () => {
      const currentPage = 0;
      const leftMargin = 2;
      const rightMargin = 1;
      const displayRange = 100;
      const itemsPerPage = 1;
      const items = getNumberOfPages(testList, itemsPerPage);
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(items.length);
    });

    it('handles negative currentPage', () => {
      const currentPage = -1;
      const leftMargin = 2;
      const rightMargin = 1;
      const displayRange = 2;
      const itemsPerPage = 1;
      const items = getNumberOfPages(testList, itemsPerPage);
      expect(generatePageArray(items, currentPage, leftMargin, rightMargin, displayRange).length).toBe(
        leftMargin + rightMargin + displayRange,
      );
    });
  });
});
