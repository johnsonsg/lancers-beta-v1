import styled from 'styled-components';

const NewsStyle = styled.div`
  .card-title {
    h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--darkblue);
    }
  }
  .btn-primary {
    background-color: var(--darkblue);
    color: var(--white);
    :hover {
      background-color: rgba(19, 44, 79, 0.8);
    }
  }
`;

export default NewsStyle;
