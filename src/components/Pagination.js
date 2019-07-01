import styled from 'styled-components';
import { Box } from 'rebass';

const Pagination = styled(Box)`
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
    font-size: 12px;
  }

  .active {
    a {
      background: ${props => (
        props.vivareal
          ? props.theme.colors.blue
          : props.theme.colors.orange
      )};
      color: white;
      font-weight: bold;
      border-radius: 3px;
    }
  }

  .disabled {
    opacity: 0.5;
  }

  .previous, .next {
    a {
      background: ${props => (
        props.vivareal
          ? props.theme.colors.blue
          : props.theme.colors.orange
      )};
      color: white;
      display: block;
      padding: 10px;
      border-radius: 3px;
    }
  }

  @media screen and (min-width: 768px) {
    > ul {
      justify-content: center;
    }
  }
`;

export default Pagination;
