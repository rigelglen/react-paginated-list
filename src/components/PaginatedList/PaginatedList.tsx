import * as React from 'react';
import { useState } from 'react';
import { getNumberOfPages, getCurrentPage, generatePageArray } from './utils';

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

export const PaginatedList = <ListItem,>({
  list,
  itemsPerPage = 10,
  onPageChange,
  renderList,
  isLoading = false,
  loadingItem = () => <p>Loading...</p>,
  breakItem = () => <li>...</li>,
  displayRange = 3,
  leftMargin = 1,
  rightMargin = 1,
  currentPage = 1,
  displayNumbers = true,
  loopAround = false,
  nextClass = 'next',
  prevClass = 'prev',
  controlClass = 'pagination',
  activeControlClass = 'active',
  nextText = '〉',
  prevText = '〈',
}: PaginatedListProps<ListItem>) => {
  const [currentPageState, setcurrentPageState] = useState<number>(currentPage - 1);

  const onPageNumberChange = (page: number, amount: number = 0) => {
    let result = page + amount;
    if (loopAround) {
      if (result < 0) {
        result = Math.floor(list.length / itemsPerPage);
      } else result = result % (Math.floor(list.length / itemsPerPage) + 1);
    }
    if (result < list.length / itemsPerPage && result > -1) {
      setcurrentPageState(result);
      let pageList = getCurrentPage(list, itemsPerPage, currentPageState);
      onPageChange && onPageChange(pageList, result + 1);
    }
  };

  if (isLoading === false)
    return (
      <>
        {renderList && renderList(getCurrentPage(list, itemsPerPage, currentPageState))}

        <PageNumbers
          items={getNumberOfPages(list, itemsPerPage)}
          currentPageState={currentPageState}
          onPageNumberChange={onPageNumberChange}
          displayRange={displayRange}
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          breakItem={breakItem}
          controlClass={controlClass}
          displayNumbers={displayNumbers}
          nextClass={nextClass}
          prevClass={prevClass}
          activeControlClass={activeControlClass}
          prevText={prevText}
          nextText={nextText}
        />
      </>
    );
  else {
    return loadingItem();
  }
};

const PageNumbers = ({
  items,
  currentPageState,
  onPageNumberChange,
  displayRange,
  leftMargin,
  rightMargin,
  breakItem,
  displayNumbers,
  controlClass,
  activeControlClass,
  nextClass,
  prevClass,
  nextText,
  prevText,
}: PageNumbersProps) => {
  const finalArr = generatePageArray(items, currentPageState, leftMargin, rightMargin, displayRange);

  let prevIndex = -1;

  const handleForward = () => onPageNumberChange(currentPageState, -1);
  const handleBackWard = () => onPageNumberChange(currentPageState, 1);

  return (
    <>
      <ul className={controlClass}>
        <li className={prevClass} onClick={handleForward}>
          {prevText}
        </li>
        {displayNumbers &&
          finalArr.map((item, index) => {
            let shouldDisplayBreak = prevIndex + 1 !== item;
            prevIndex = item;
            return (
              <Item
                key={index}
                item={item}
                currentPageState={currentPageState}
                shouldDisplayBreak={shouldDisplayBreak}
                breakItem={breakItem}
                onPageNumberChange={onPageNumberChange}
                activeControlClass={activeControlClass}
              />
            );
          })}
        <li className={nextClass} onClick={handleBackWard}>
          {nextText}
        </li>
      </ul>
    </>
  );
}; // Page number...

const Item = ({
  item,
  currentPageState,
  onPageNumberChange,
  shouldDisplayBreak,
  breakItem,
  activeControlClass,
}: ItemProps) => {
  const handleClick = () => onPageNumberChange(item);
  return (
    <>
      {shouldDisplayBreak && breakItem()}
      <li onClick={handleClick} className={item === currentPageState ? activeControlClass : ''}>
        {item + 1}
      </li>
    </>
  );
};
