import React, { FC, Fragment } from "react";
import { Routes } from "../../routes";
import { Nav, Navbar as Nb } from "react-bootstrap";
import { useLocation, withRouter } from "react-router-dom";

type INavbarProps = {};

const Navbar: FC<INavbarProps> = (props: INavbarProps) => {
  const location = useLocation();

  return (
    <Fragment>
      <Nb bg="light" expand="lg" className="mb-5">
        <Nav activeKey={location.pathname}>
          <Nav.Link href={Routes.home}>Accueil</Nav.Link>
          <Nav.Link href={Routes.artists}>Artistes</Nav.Link>
          <Nav.Link href={Routes.albums}>Albums</Nav.Link>
          <Nav.Link href={Routes.songs}>Musiques</Nav.Link>
        </Nav>
      </Nb>
    </Fragment>
  );
};

const NavBarWithRouter = withRouter(Navbar);

export default NavBarWithRouter;
