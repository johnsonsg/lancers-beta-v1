import React from 'react';
// import { Container } from 'react-bootstrap';
import { ThemeProvider } from '@material-ui/styles';
import GlobalStyles from '../styles/GlobalStyles';
import theme from '../styles/theme';
import 'normalize.css';
import '../styles/global-reset.scss';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Header />
        {/* <Container>{children}</Container> */}
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
}
