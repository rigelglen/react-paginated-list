import styled from 'styled-components';

export const DefaultControlContainer = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 10px;
`;

export const DefaultControlItem = styled.li`
  list-style-type: none;
  padding: 10px;
  background: #fff;
  border-right: 1px solid #c1c1c1;
  border-top: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
  color: #444;
  cursor: pointer;
  display: flex;
  &:first-of-type {
    border-left: 1px solid #c1c1c1;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &.active {
    background: #cfcfcf;
  }
`;

export const DefaultPaginationContainer = styled.div``;
