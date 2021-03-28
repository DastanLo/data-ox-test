import React from 'react';
import Header from "./Header";
import {Container} from "@material-ui/core";

type Props = {
  children: JSX.Element,
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Header/>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
