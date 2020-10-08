import { generatePageArray, getCurrentPage, getNumberOfPages } from './utils';

const testList = [
  { itemName: 'itemName_1', itemValue: 'itemValue_1' },
  { itemName: 'itemName_2', itemValue: 'itemValue_2' },
  { itemName: 'itemName_3', itemValue: 'itemValue_3' },
  { itemName: 'itemName_4', itemValue: 'itemValue_4' },
  { itemName: 'itemName_5', itemValue: 'itemValue_5' },
  { itemName: 'itemName_6', itemValue: 'itemValue_6' },
  { itemName: 'itemName_7', itemValue: 'itemValue_7' },
  { itemName: 'itemName_8', itemValue: 'itemValue_8' },
  { itemName: 'itemName_9', itemValue: 'itemValue_9' },
  { itemName: 'itemName_10', itemValue: 'itemValue_10' },
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

    it('throws error for a non array list', () => {
      const itemsPerPage = 10;
      expect(() => getNumberOfPages({} as any, itemsPerPage)).toThrow();
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

    it('throws error for a non array list', () => {
      const itemsPerPage = 10;
      const page = 0;
      expect(() => getCurrentPage({} as any, itemsPerPage, page)).toThrow();
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
