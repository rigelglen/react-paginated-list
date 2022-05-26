import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import { PaginatedList } from './PaginatedList';
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
    const component = mount(
      <PaginatedList
        list={list}
        renderList={(list) => (
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item.itemName}</li>
            ))}
          </ul>
        )}
      />,
    );
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
    expect(component.find('li').at(props.currentPage).hasClass(props.activeControlClass)).toBe(true);
  });

  it('shows loading item', () => {
    const props = {
      list,
      isLoading: true,
    };
    const component1 = mount(<PaginatedList {...props} loadingItem={() => <p>Loading...</p>} />);
    expect(component1.find('p').text()).toBe('Loading...');

    const component2 = mount(<PaginatedList {...props} />);
    expect(component2.find('p').text()).toBe('Loading...');
  });

  it('changes pages', (done) => {
    const onPageChange = () => {
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('li.next').simulate('click');
  });

  it('returns the correct page items and index when changing pages via next', (done) => {
    const onPageChange = (items: any, page: any) => {
      expect(items[0].itemName).toBe(list[2].itemName);
      expect(page).toBe(2);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('li.next').simulate('click');
  });

  it('returns the correct page items and index when changing pages via prev', (done) => {
    const onPageChange = (items: any, page: any) => {
      expect(items[0].itemName).toBe(list[0].itemName);
      expect(page).toBe(1);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
      currentPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('li.prev').simulate('click');
  });

  it('hides next and prev conditionally when useMinimalControls is true', () => {
    const props = {
      list,
      itemsPerPage: 3,
      currentPage: 1,
      useMinimalControls: true,
    };
    const component = mount(<PaginatedList {...props} />);
    component
      .find('li.pagination-item')
      .at(component.find('li.pagination-item').length - 2)
      .simulate('click');
    expect(component.find('li.prev').length).toBe(1);
    expect(component.find('li.next').length).toBe(0);
  });

  it('returns the correct page items when changing pages via index items', (done) => {
    const onPageChange = (items: any, index: any) => {
      expect(items[0].itemName).toBe(list[2].itemName);
      expect(index).toBe(2);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('.pagination li').at(2).simulate('click');
  });

  it('loops around correctly', async (done) => {
    const onPageChange = (items: any, index: any) => {
      expect(items[0].itemName).toBe(list[0].itemName);
      expect(index).toBe(1);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
      currentPage: 7,
      loopAround: true,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('li.next').simulate('click');
  });

  it('loops behind correctly', (done) => {
    const onPageChange = (items: any, index: any) => {
      expect(items[0].itemName).toBe(list[12].itemName);
      expect(index).toBe(7);
      done();
    };
    const props = {
      list,
      itemsPerPage: 2,
      currentPage: 1,
      loopAround: true,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('li.prev').simulate('click');
  });

  it('returns the correct page items when changing pages via index items', (done) => {
    const onPageChange = (items: any, index: any) => {
      expect(items[0].itemName).toBe(list[4].itemName);
      expect(index).toBe(5);
      done();
    };
    const props = {
      list,
      itemsPerPage: 1,
    };
    const component = mount(<PaginatedList {...props} onPageChange={onPageChange} />);
    component.find('.pagination li.pagination-break').simulate('click');
  });

  it('shows correct next and prev text', () => {
    const props = {
      list,
      nextText: 'Next',
      prevText: 'Prev',
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('li.next').text()).toBe(props.nextText);
    expect(component.find('li.prev').text()).toBe(props.prevText);
  });

  it('changes classes of items properly', () => {
    const props = {
      list,
      nextClass: 'Next',
      prevClass: 'Prev',
      controlItemClass: 'pagination-item-custom',
      itemsPerPage: 2,
      breakClass: 'pagination-break-custom',
      breakText: '..',
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find(`li.${props.nextClass}`).text()).toBeDefined();
    expect(component.find(`li.${props.prevClass}`).text()).toBeDefined();
    expect(component.find(`li.${props.controlItemClass}`).length).toBe(8);
    expect(component.find(`li.${props.breakClass}`).length).toBe(1);
    expect(component.find(`li.${props.breakClass}`).text()).toBe(props.breakText);
  });

  it('hides next and prev buttons as required', () => {
    const props = {
      list,
      showPrev: false,
      showNext: false,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('li.Prev').length).toBe(0);
    expect(component.find('li.Next').length).toBe(0);
  });

  it('hides the pagination numbers', () => {
    const props = {
      list,
      displayNumbers: false,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('li.pagination-item').length).toBe(2);
  });

  it('renders properly with displayRange', () => {
    const props = {
      list,
      itemsPerPage: 2,
      displayRange: 1,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('li.pagination-item').length).toBe(6);
    expect(component.find('li.pagination-item').at(3).props().className?.split(' ').includes('pagination-break')).toBe(
      true,
    );
    expect(component.find('li.pagination-break').length).toBe(1);
  });

  it('renders properly with displayRange and respects left and right margin', () => {
    const props = {
      list,
      itemsPerPage: 2,
      displayRange: 1,
      leftMargin: 3,
      rightMargin: 2,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('li.pagination-item').length).toBe(9);
    expect(component.find('li.pagination-item').at(5).props().className?.split(' ').includes('pagination-break')).toBe(
      true,
    );
    expect(component.find('li.pagination-break').length).toBe(1);
  });

  it('renders properly with custom styled components', () => {
    const props = {
      list,
      itemsPerPage: 2,
      ControlItem: styled.li`
        padding: 10px;
      `,
      ControlContainer: styled.ul`
        padding: 15px;
      `,
      PaginatedListContainer: styled.div`
        padding: 20px;
      `,
    };
    const component = mount(<PaginatedList {...props} />);
    expect(component.find('.next').at(0)).toHaveStyleRule('padding', '10px');
    expect(component.find('.prev').at(0)).toHaveStyleRule('padding', '10px');

    expect(component.find('.pagination').at(0)).toHaveStyleRule('padding', '15px');
    expect(component.find('div').at(0)).toHaveStyleRule('padding', '20px');
  });
});
