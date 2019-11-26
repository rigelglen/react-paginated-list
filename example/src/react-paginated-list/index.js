/* eslint-disable */
import { useState, createElement, Fragment } from 'react';

var getNumberOfPages = function (list, itemsPerPage) {
    if (itemsPerPage <= 0) {
        return [];
    }
    var numberOfPages = Math.ceil(list.length / itemsPerPage);
    return Array.from(Array(numberOfPages).keys());
};
var getCurrentPage = function (list, itemsPerPage, page) {
    if (itemsPerPage <= 0 || page < 0) {
        return [];
    }
    return list.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
};
var generatePageArray = function (items, currentPage, leftMargin, rightMargin, displayRange) {
    if (currentPage < 0) {
        currentPage = 0;
    }
    var leftSideIndex = leftMargin;
    var rightSideIndex = items.length - rightMargin - 1;
    var finalArr = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i] < leftSideIndex) {
            finalArr = finalArr.concat([items[i]]);
            continue;
        }
        if (items[i] > rightSideIndex) {
            finalArr = finalArr.concat([items[i]]);
            continue;
        }
        if (currentPage === items[i]) {
            finalArr = finalArr.concat([items[i]]);
            continue;
        }
        var from = currentPage - displayRange / 2;
        var to = currentPage + displayRange / 2;
        if (from < 0) {
            to += Math.abs(from) + leftSideIndex - 1;
        }
        if (to > items.length - 1) {
            from -= Math.abs(to - items.length);
        }
        if (items[i] >= from && items[i] <= to) {
            finalArr = finalArr.concat([items[i]]);
            continue;
        }
    }
    return finalArr;
};

var PaginatedList = function (_a) {
    var list = _a.list, _b = _a.itemsPerPage, itemsPerPage = _b === void 0 ? 10 : _b, onPageChange = _a.onPageChange, renderList = _a.renderList, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, _d = _a.loadingItem, loadingItem = _d === void 0 ? function () { return createElement("p", null, "Loading..."); } : _d, _e = _a.breakItem, breakItem = _e === void 0 ? function () { return createElement("li", null, "..."); } : _e, _f = _a.displayRange, displayRange = _f === void 0 ? 3 : _f, _g = _a.leftMargin, leftMargin = _g === void 0 ? 1 : _g, _h = _a.rightMargin, rightMargin = _h === void 0 ? 1 : _h, _j = _a.currentPage, currentPage = _j === void 0 ? 1 : _j, _k = _a.displayNumbers, displayNumbers = _k === void 0 ? true : _k, _l = _a.loopAround, loopAround = _l === void 0 ? false : _l, _m = _a.nextClass, nextClass = _m === void 0 ? 'next' : _m, _o = _a.prevClass, prevClass = _o === void 0 ? 'prev' : _o, _p = _a.controlClass, controlClass = _p === void 0 ? 'pagination' : _p, _q = _a.activeControlClass, activeControlClass = _q === void 0 ? 'active' : _q, _r = _a.nextText, nextText = _r === void 0 ? '〉' : _r, _s = _a.prevText, prevText = _s === void 0 ? '〈' : _s;
    var _t = useState(currentPage - 1), currentPageState = _t[0], setcurrentPageState = _t[1];
    var onPageNumberChange = function (page, amount) {
        if (amount === void 0) { amount = 0; }
        var result = page + amount;
        if (loopAround) {
            if (result < 0) {
                result = Math.floor(list.length / itemsPerPage);
            }
            else
                result = result % (Math.floor(list.length / itemsPerPage) + 1);
        }
        if (result < list.length / itemsPerPage && result > -1) {
            setcurrentPageState(result);
            var pageList = getCurrentPage(list, itemsPerPage, currentPageState);
            onPageChange && onPageChange(pageList, result + 1);
        }
    };
    if (isLoading === false)
        return (createElement(Fragment, null,
            renderList && renderList(getCurrentPage(list, itemsPerPage, currentPageState)),
            createElement(PageNumbers, { items: getNumberOfPages(list, itemsPerPage), currentPageState: currentPageState, onPageNumberChange: onPageNumberChange, displayRange: displayRange, leftMargin: leftMargin, rightMargin: rightMargin, breakItem: breakItem, controlClass: controlClass, displayNumbers: displayNumbers, nextClass: nextClass, prevClass: prevClass, activeControlClass: activeControlClass, prevText: prevText, nextText: nextText })));
    else {
        return loadingItem();
    }
};
var PageNumbers = function (_a) {
    var items = _a.items, currentPageState = _a.currentPageState, onPageNumberChange = _a.onPageNumberChange, displayRange = _a.displayRange, leftMargin = _a.leftMargin, rightMargin = _a.rightMargin, breakItem = _a.breakItem, displayNumbers = _a.displayNumbers, controlClass = _a.controlClass, activeControlClass = _a.activeControlClass, nextClass = _a.nextClass, prevClass = _a.prevClass, nextText = _a.nextText, prevText = _a.prevText;
    var finalArr = generatePageArray(items, currentPageState, leftMargin, rightMargin, displayRange);
    var prevIndex = -1;
    var handleForward = function () { return onPageNumberChange(currentPageState, -1); };
    var handleBackWard = function () { return onPageNumberChange(currentPageState, 1); };
    return (createElement(Fragment, null,
        createElement("ul", { className: controlClass },
            createElement("li", { className: prevClass, onClick: handleForward }, prevText),
            displayNumbers &&
                finalArr.map(function (item, index) {
                    var shouldDisplayBreak = prevIndex + 1 !== item;
                    prevIndex = item;
                    return (createElement(Item, { key: index, item: item, currentPageState: currentPageState, shouldDisplayBreak: shouldDisplayBreak, breakItem: breakItem, onPageNumberChange: onPageNumberChange, activeControlClass: activeControlClass }));
                }),
            createElement("li", { className: nextClass, onClick: handleBackWard }, nextText))));
}; // Page number...
var Item = function (_a) {
    var item = _a.item, currentPageState = _a.currentPageState, onPageNumberChange = _a.onPageNumberChange, shouldDisplayBreak = _a.shouldDisplayBreak, breakItem = _a.breakItem, activeControlClass = _a.activeControlClass;
    var handleClick = function () { return onPageNumberChange(item); };
    return (createElement(Fragment, null,
        shouldDisplayBreak && breakItem(),
        createElement("li", { onClick: handleClick, className: item === currentPageState ? activeControlClass : '' }, item + 1)));
};

export { PaginatedList };
