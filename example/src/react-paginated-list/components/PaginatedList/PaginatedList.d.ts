/// <reference types="react" />
import { AnyStyledComponent } from 'styled-components';
export interface PaginatedListProps<ListItem> {
    list: Array<ListItem>;
    renderList?(list: Array<ListItem>): JSX.Element;
    itemsPerPage?: number;
    onPageChange?(items: Array<ListItem>, currentPage: number): void;
    isLoading?: boolean;
    ControlItem?: AnyStyledComponent;
    ControlContainer?: AnyStyledComponent;
    PaginatedListContainer?: AnyStyledComponent;
    loadingItem?(): JSX.Element;
    breakText?: string;
    displayRange?: number;
    leftMargin?: number;
    rightMargin?: number;
    currentPage?: number;
    controlClass?: string;
    activeControlClass?: string;
    displayNumbers?: boolean;
    loopAround?: boolean;
    paginatedListContainerClass?: string;
    breakClass?: string;
    nextClass?: string;
    prevClass?: string;
    controlItemClass?: string;
    showPrev?: boolean;
    showNext?: boolean;
    nextText?: string;
    prevText?: string;
    useMinimalControls?: boolean;
}
export interface PageNumbersProps {
    items: Array<number>;
    currentPageState: number;
    onPageNumberChange(page: number, amount?: number): void;
    displayRange: number;
    leftMargin: number;
    rightMargin: number;
    ControlContainer: AnyStyledComponent;
    ControlItem: AnyStyledComponent;
    breakText: string;
    breakClass: string;
    controlClass: string;
    displayNumbers?: boolean;
    activeControlClass: string;
    nextClass: string;
    prevClass: string;
    nextText: string;
    prevText: string;
    controlItemClass?: string;
    showPrev?: boolean;
    showNext?: boolean;
    useMinimalControls?: boolean;
}
export interface ItemProps {
    item: number;
    breakTo: number;
    currentPageState: number;
    onPageNumberChange(page: number, amount?: number): void;
    shouldDisplayBreak: boolean;
    controlItemClass?: string;
    breakText: string;
    breakClass: string;
    ControlItem: AnyStyledComponent;
    activeControlClass: string;
}
export declare const PaginatedList: <ListItem>({ list, itemsPerPage, onPageChange, renderList, isLoading, ControlItem, ControlContainer, PaginatedListContainer, loadingItem, breakText, breakClass, displayRange, leftMargin, rightMargin, currentPage, displayNumbers, loopAround, nextClass, prevClass, controlClass, activeControlClass, nextText, prevText, controlItemClass, showPrev, showNext, useMinimalControls, paginatedListContainerClass, }: PaginatedListProps<ListItem>) => JSX.Element;
