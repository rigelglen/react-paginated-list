/* eslint-disable */
import { useState, createElement, Fragment } from 'react';
import styled from 'styled-components';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var DefaultControlContainer = styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  padding: 0;\n  margin: 10px;\n"], ["\n  display: flex;\n  justify-content: center;\n  padding: 0;\n  margin: 10px;\n"])));
var DefaultControlItem = styled.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  list-style-type: none;\n  padding: 10px;\n  background: #fff;\n  border-right: 1px solid #c1c1c1;\n  border-top: 1px solid #c1c1c1;\n  border-bottom: 1px solid #c1c1c1;\n  color: #444;\n  cursor: pointer;\n  display: flex;\n  &:first-of-type {\n    border-left: 1px solid #c1c1c1;\n    border-top-left-radius: 5px;\n    border-bottom-left-radius: 5px;\n  }\n  &:last-of-type {\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n  }\n  &.active {\n    background: #cfcfcf;\n  }\n"], ["\n  list-style-type: none;\n  padding: 10px;\n  background: #fff;\n  border-right: 1px solid #c1c1c1;\n  border-top: 1px solid #c1c1c1;\n  border-bottom: 1px solid #c1c1c1;\n  color: #444;\n  cursor: pointer;\n  display: flex;\n  &:first-of-type {\n    border-left: 1px solid #c1c1c1;\n    border-top-left-radius: 5px;\n    border-bottom-left-radius: 5px;\n  }\n  &:last-of-type {\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n  }\n  &.active {\n    background: #cfcfcf;\n  }\n"])));
var DefaultPaginationContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3;

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
            finalArr = __spreadArrays(finalArr, [items[i]]);
            continue;
        }
        if (items[i] > rightSideIndex) {
            finalArr = __spreadArrays(finalArr, [items[i]]);
            continue;
        }
        if (currentPage === items[i]) {
            finalArr = __spreadArrays(finalArr, [items[i]]);
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
            finalArr = __spreadArrays(finalArr, [items[i]]);
            continue;
        }
    }
    return finalArr;
};

var PaginatedList = function (_a) {
    var list = _a.list, _b = _a.itemsPerPage, itemsPerPage = _b === void 0 ? 10 : _b, onPageChange = _a.onPageChange, renderList = _a.renderList, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, _d = _a.ControlItem, ControlItem = _d === void 0 ? DefaultControlItem : _d, _e = _a.ControlContainer, ControlContainer = _e === void 0 ? DefaultControlContainer : _e, _f = _a.PaginatedListContainer, PaginatedListContainer = _f === void 0 ? DefaultPaginationContainer : _f, _g = _a.loadingItem, loadingItem = _g === void 0 ? function () { return createElement("p", null, "Loading..."); } : _g, _h = _a.breakText, breakText = _h === void 0 ? '...' : _h, _j = _a.breakClass, breakClass = _j === void 0 ? 'pagination-break' : _j, _k = _a.displayRange, displayRange = _k === void 0 ? 3 : _k, _l = _a.leftMargin, leftMargin = _l === void 0 ? 1 : _l, _m = _a.rightMargin, rightMargin = _m === void 0 ? 1 : _m, _o = _a.currentPage, currentPage = _o === void 0 ? 1 : _o, _p = _a.displayNumbers, displayNumbers = _p === void 0 ? true : _p, _q = _a.loopAround, loopAround = _q === void 0 ? false : _q, _r = _a.nextClass, nextClass = _r === void 0 ? 'next' : _r, _s = _a.prevClass, prevClass = _s === void 0 ? 'prev' : _s, _t = _a.controlClass, controlClass = _t === void 0 ? 'pagination' : _t, _u = _a.activeControlClass, activeControlClass = _u === void 0 ? 'active' : _u, _v = _a.nextText, nextText = _v === void 0 ? '〉' : _v, _w = _a.prevText, prevText = _w === void 0 ? '〈' : _w, _x = _a.controlItemClass, controlItemClass = _x === void 0 ? 'pagination-item' : _x, _y = _a.showPrev, showPrev = _y === void 0 ? true : _y, _z = _a.showNext, showNext = _z === void 0 ? true : _z, _0 = _a.useMinimalControls, useMinimalControls = _0 === void 0 ? false : _0, paginatedListContainerClass = _a.paginatedListContainerClass;
    var _1 = useState(currentPage - 1), currentPageState = _1[0], setcurrentPageState = _1[1];
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
        return (createElement(PaginatedListContainer, { className: paginatedListContainerClass },
            renderList && renderList(getCurrentPage(list, itemsPerPage, currentPageState)),
            createElement(PageNumbers, { items: getNumberOfPages(list, itemsPerPage), currentPageState: currentPageState, onPageNumberChange: onPageNumberChange, displayRange: displayRange, leftMargin: leftMargin, ControlContainer: ControlContainer, ControlItem: ControlItem, rightMargin: rightMargin, breakText: breakText, breakClass: breakClass, controlClass: controlClass, displayNumbers: displayNumbers, nextClass: nextClass, prevClass: prevClass, controlItemClass: controlItemClass, showPrev: showPrev, showNext: showNext, activeControlClass: activeControlClass, prevText: prevText, nextText: nextText, useMinimalControls: useMinimalControls })));
    else {
        return loadingItem();
    }
};
var PageNumbers = function (_a) {
    var items = _a.items, currentPageState = _a.currentPageState, onPageNumberChange = _a.onPageNumberChange, displayRange = _a.displayRange, leftMargin = _a.leftMargin, rightMargin = _a.rightMargin, ControlItem = _a.ControlItem, ControlContainer = _a.ControlContainer, breakText = _a.breakText, breakClass = _a.breakClass, displayNumbers = _a.displayNumbers, controlClass = _a.controlClass, activeControlClass = _a.activeControlClass, controlItemClass = _a.controlItemClass, showPrev = _a.showPrev, showNext = _a.showNext, nextClass = _a.nextClass, prevClass = _a.prevClass, nextText = _a.nextText, prevText = _a.prevText, useMinimalControls = _a.useMinimalControls;
    var finalArr = generatePageArray(items, currentPageState, leftMargin, rightMargin, displayRange);
    var prevIndex = -1;
    var handleForward = function () { return onPageNumberChange(currentPageState, -1); };
    var handleBackWard = function () { return onPageNumberChange(currentPageState, 1); };
    var prevCssClasses = prevClass + " " + controlItemClass;
    var nextCssClasses = nextClass + " " + controlItemClass;
    var hidePrev = useMinimalControls && currentPageState === 0;
    var hideNext = useMinimalControls && currentPageState + 1 === items.length;
    return (createElement(Fragment, null,
        createElement(ControlContainer, { className: controlClass },
            showPrev === true && hidePrev === false && (createElement(ControlItem, { className: prevCssClasses, onClick: handleForward }, prevText)),
            displayNumbers &&
                finalArr.map(function (item, index) {
                    var breakTo = prevIndex + 1;
                    var shouldDisplayBreak = prevIndex + 1 !== item;
                    prevIndex = item;
                    return (createElement(Item, { key: index, item: item, breakTo: breakTo, ControlItem: ControlItem, currentPageState: currentPageState, shouldDisplayBreak: shouldDisplayBreak, breakText: breakText, breakClass: breakClass, controlItemClass: controlItemClass, onPageNumberChange: onPageNumberChange, activeControlClass: activeControlClass }));
                }),
            showNext === true && hideNext === false && (createElement(ControlItem, { className: nextCssClasses, onClick: handleBackWard }, nextText)))));
}; // Page number...
var Item = function (_a) {
    var item = _a.item, breakTo = _a.breakTo, currentPageState = _a.currentPageState, onPageNumberChange = _a.onPageNumberChange, shouldDisplayBreak = _a.shouldDisplayBreak, breakText = _a.breakText, breakClass = _a.breakClass, ControlItem = _a.ControlItem, controlItemClass = _a.controlItemClass, activeControlClass = _a.activeControlClass;
    var handleClick = function () { return onPageNumberChange(item); };
    var handleBreakClick = function () { return onPageNumberChange(breakTo); };
    return (createElement(Fragment, null,
        shouldDisplayBreak && (createElement(ControlItem, { onClick: handleBreakClick, className: [breakClass, controlItemClass] }, breakText)),
        createElement(ControlItem, { onClick: handleClick, className: (item === currentPageState ? activeControlClass : '') + " " + controlItemClass }, item + 1)));
};

export { PaginatedList };
