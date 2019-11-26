/// <reference types="react" />
export interface PaginatedListProps<ListItem> {
    list: Array<ListItem>;
    renderList(list: Array<ListItem>): JSX.Element;
    itemsPerPage?: number;
    onPageChange?(items: Array<ListItem>, currentPage: number): void;
    isLoading?: boolean;
    loadingItem?(): JSX.Element;
    breakItem?(): JSX.Element;
    displayRange?: number;
    leftMargin?: number;
    rightMargin?: number;
    currentPage?: number;
    controlClass?: string;
    activeControlClass?: string;
    displayNumbers?: boolean;
    loopAround?: boolean;
    nextClass?: string;
    prevClass?: string;
    nextText?: string;
    prevText?: string;
}
export interface ItemProps {
    item: number;
    currentPageState: number;
    onPageNumberChange(page: number, amount?: number): void;
    shouldDisplayBreak: boolean;
    breakItem(): JSX.Element;
    activeControlClass: string;
}
export interface PageNumbersProps {
    items: Array<number>;
    currentPageState: number;
    onPageNumberChange(page: number, amount?: number): void;
    displayRange: number;
    leftMargin: number;
    rightMargin: number;
    breakItem(): JSX.Element;
    controlClass: string;
    displayNumbers?: boolean;
    activeControlClass: string;
    nextClass: string;
    prevClass: string;
    nextText: string;
    prevText: string;
}
export declare const PaginatedList: <ListItem>({ list, itemsPerPage, onPageChange, renderList, isLoading, loadingItem, breakItem, displayRange, leftMargin, rightMargin, currentPage, displayNumbers, loopAround, nextClass, prevClass, controlClass, activeControlClass, nextText, prevText, }: PaginatedListProps<ListItem>) => JSX.Element;
