import styled from 'styled-components';

const Pagination = styled.div`
  > ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  li a {
    display: block;
    margin: 3px;
    padding: 10px;
    cursor: pointer;
  }

  .active {
    a {
      background: rgba(0,0,0,0.2);
      border-radius: 3px;
    }
  }

  .disabled {
    opacity: 0.5;
  }

  .previous, .next {
    a {
      background: black;
      color: white;
      display: block;
      padding: 10px;
      border-radius: 3px;
    }
  }
`;

export default Pagination;
