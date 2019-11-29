import { PaginatedList } from './paginatedList';
import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const list = [
  { itemName: 'fdsfsdf1', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf2', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf3', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf4', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf5', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf6', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf7', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf8', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf9', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf10', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf11', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf12', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf13', itemValue: 'dfgsdfdsf' },
  { itemName: 'fdsfsdf14', itemValue: 'dfgsdfdsf' },
];

describe('rendering', () => {
  it('should render correctly', () => {
    const component = mount(<PaginatedList list={list} />);
    expect(component.find('ul').length).toBeGreaterThan(0);
  });

  it('should render correctly', () => {
    const component = mount(<PaginatedList list={list} />);
    expect(component.find('li').length).toBeGreaterThan(0);
  });

  it('assigns custom class to the list', () => {
    const controlClass = 'pagination-container';
    const component = mount(<PaginatedList list={list} controlClass={controlClass} />);
    expect(component.find('ul').hasClass(controlClass)).toBe(true);
  });

  it('assigns custom class to the active item', () => {
    const props = {
      list,
      activeControlClass: 'active',
      currentPage: 1,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(
      component
        .find('li')
        .at(props.currentPage)
        .hasClass(props.activeControlClass),
    ).toBe(true);
  });

  it('shows loading item', () => {
    const props = {
      list,
      isLoading: true,
      loadingItem: () => <p>Loading...</p>,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('p').text()).toBe('Loading...');
  });

  it('changes pages', done => {
    const onPageChange = () => {
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('.next').simulate('click');
  });

  it('returns the current page items and index', done => {
    const onPageChange = (items: any, index: any) => {
      expect(items[0].itemName).toBe(list[0].itemName);
      expect(index).toBe(2);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('.next').simulate('click');
    done();
  });

  it('shows correct next and prev text', () => {
    const props = {
      list,
      nextText: 'Next',
      prevText: 'Prev',
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('.next').text()).toBe(props.nextText);
    expect(component.find('.prev').text()).toBe(props.prevText);
  });
});
