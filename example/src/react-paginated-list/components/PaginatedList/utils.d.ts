export declare const getNumberOfPages: <ListItem>(list: ListItem[], itemsPerPage: number) => number[];
export declare const getCurrentPage: <ListItem>(list: ListItem[], itemsPerPage: number, page: number) => ListItem[];
export declare const generatePageArray: (items: number[], currentPage: number, leftMargin: number, rightMargin: number, displayRange: number) => number[];
