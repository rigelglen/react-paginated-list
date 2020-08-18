import * as React from 'react';
import { useState } from 'react';
import { AnyStyledComponent } from 'styled-components';
import { DefaultControlContainer, DefaultControlItem, DefaultPaginationContainer } from './PaginatedList.styles';
import { generatePageArray, getCurrentPage, getNumberOfPages } from './utils';

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

export const PaginatedList = <ListItem,>({
  list,
  itemsPerPage = 10,
  onPageChange,
  renderList,
  isLoading = false,
  ControlItem = DefaultControlItem,
  ControlContainer = DefaultControlContainer,
  PaginatedListContainer = DefaultPaginationContainer,
  loadingItem = () => <p>Loading...</p>,
  breakText = '...',
  breakClass = 'pagination-break',
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
  controlItemClass = 'pagination-item',
  showPrev = true,
  showNext = true,
  useMinimalControls = false,
  paginatedListContainerClass,
}: PaginatedListProps<ListItem>) => {
  const [currentPageState, setcurrentPageState] = useState<number>(currentPage - 1);

  const onPageNumberChange = (page: number, amount = 0) => {
    let result = page + amount;
    if (loopAround) {
      if (result < 0) {
        result = Math.floor(list.length / itemsPerPage);
      } else result = result % (Math.floor(list.length / itemsPerPage) + 1);
    }
    if (result < list.length / itemsPerPage && result > -1) {
      setcurrentPageState(result);
      const pageList = getCurrentPage(list, itemsPerPage, currentPageState);
      onPageChange && onPageChange(pageList, result + 1);
    }
  };

  if (isLoading === false)
    return (
      <PaginatedListContainer className={paginatedListContainerClass}>
        {renderList && renderList(getCurrentPage(list, itemsPerPage, currentPageState))}

        <PageNumbers
          items={getNumberOfPages(list, itemsPerPage)}
          currentPageState={currentPageState}
          onPageNumberChange={onPageNumberChange}
          displayRange={displayRange}
          leftMargin={leftMargin}
          ControlContainer={ControlContainer}
          ControlItem={ControlItem}
          rightMargin={rightMargin}
          breakText={breakText}
          breakClass={breakClass}
          controlClass={controlClass}
          displayNumbers={displayNumbers}
          nextClass={nextClass}
          prevClass={prevClass}
          controlItemClass={controlItemClass}
          showPrev={showPrev}
          showNext={showNext}
          activeControlClass={activeControlClass}
          prevText={prevText}
          nextText={nextText}
          useMinimalControls={useMinimalControls}
        />
      </PaginatedListContainer>
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
  ControlItem,
  ControlContainer,
  breakText,
  breakClass,
  displayNumbers,
  controlClass,
  activeControlClass,
  controlItemClass,
  showPrev,
  showNext,
  nextClass,
  prevClass,
  nextText,
  prevText,
  useMinimalControls,
}: PageNumbersProps) => {
  const finalArr = generatePageArray(items, currentPageState, leftMargin, rightMargin, displayRange);

  let prevIndex = -1;

  const handleForward = () => onPageNumberChange(currentPageState, -1);
  const handleBackWard = () => onPageNumberChange(currentPageState, 1);
  const prevCssClasses = `${prevClass} ${controlItemClass}`;
  const nextCssClasses = `${nextClass} ${controlItemClass}`;

  const hidePrev = useMinimalControls && currentPageState === 0;
  const hideNext = useMinimalControls && currentPageState + 1 === items.length;

  return (
    <>
      <ControlContainer className={controlClass}>
        {showPrev === true && hidePrev === false && (
          <ControlItem className={prevCssClasses} onClick={handleForward}>
            {prevText}
          </ControlItem>
        )}
        {displayNumbers &&
          finalArr.map((item, index) => {
            const breakTo = prevIndex + 1;
            const shouldDisplayBreak = prevIndex + 1 !== item;
            prevIndex = item;
            return (
              <Item
                key={index}
                item={item}
                breakTo={breakTo}
                ControlItem={ControlItem}
                currentPageState={currentPageState}
                shouldDisplayBreak={shouldDisplayBreak}
                breakText={breakText}
                breakClass={breakClass}
                controlItemClass={controlItemClass}
                onPageNumberChange={onPageNumberChange}
                activeControlClass={activeControlClass}
              />
            );
          })}
        {showNext === true && hideNext === false && (
          <ControlItem className={nextCssClasses} onClick={handleBackWard}>
            {nextText}
          </ControlItem>
        )}
      </ControlContainer>
      {/* </ul> */}
    </>
  );
}; // Page number...

const Item = ({
  item,
  breakTo,
  currentPageState,
  onPageNumberChange,
  shouldDisplayBreak,
  breakText,
  breakClass,
  ControlItem,
  controlItemClass,
  activeControlClass,
}: ItemProps) => {
  const handleClick = () => onPageNumberChange(item);
  const handleBreakClick = () => onPageNumberChange(breakTo);

  return (
    <>
      {shouldDisplayBreak && (
        <ControlItem onClick={handleBreakClick} className={[breakClass, controlItemClass]}>
          {breakText}
        </ControlItem>
      )}
      <ControlItem
        onClick={handleClick}
        className={`${item === currentPageState ? activeControlClass : ''} ${controlItemClass}`}
      >
        {item + 1}
      </ControlItem>
    </>
  );
};
