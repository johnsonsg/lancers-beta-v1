import styled from 'styled-components';

const NavStyle = styled.div`
  .nav-wrapper {
    border-top: 6px solid #091326;
  }

  .nav {
    width: 100% !important;
    border-top: 1px solid #2d3135;
  }

  .navbar {
    padding: 0;
  }

  .navbar-brand {
    a {
      font-family: 'Freshman', sans-serif !important;
      color: var(--orange);
      font-size: 1.6rem;
      &:hover {
        color: white;
        text-decoration: none;
      }
    }
  }

  .navbar-dark {
    .navbar-nav {
      .nav-item {
        color: rgba(255, 255, 255);
        font-size: 1rem !important;
        font-weight: 500;
        text-transform: uppercase !important;
        padding: 0 1rem;
      }
      a {
        color: white;
        padding: 0.665rem 0.2rem 0.56rem;
        &:hover {
          text-decoration: none;
          color: var(--orange);
        }
        &[aria-current='page'] {
          /* border-bottom: 2px dashed var(--orange); */
          border-bottom: 5px solid var(--orange);
          color: var(--orange);
        }
      }
    }
  }

  @media (max-width: 575px) {
    .nav {
      padding: 0 1.5rem;
    }
    .navbar-dark {
      .navbar-nav {
        .nav-item {
          padding: 1rem 0;
        }
      }
    }
    a {
      color: white;
      padding: 0.665rem 0.2rem;
      &:hover {
        text-decoration: none;
        color: var(--orange);
      }
      &[aria-current='page'] {
        /* border-bottom: 2px dashed var(--orange); */
        border-bottom: none;
      }
    }
  }
`;

export default NavStyle;
