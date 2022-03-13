/* eslint-disable no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import type { FC, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import NavItem from './NavItem';
import sections from './sections';
import type { Section, NavBarProps } from './types';
import {
  Container,
  AppBar,
  NavList,
  Drawer
} from './styles';

function renderSections(navSections: Section[]): ReactElement[] {
  return navSections.map((section) => {
    const { title, icon, href } = section;
    return (
      <NavItem
        href={href}
        icon={icon}
        key={title}
        title={title}
      />
    )
  })
};

const NavBar: FC<NavBarProps> = ({
  onMobileClose,
  openMobile,
  isMoreLg,
  isLessSm
}) => {

  const location = useLocation();
  
  const sectionsList = useMemo(
    () => renderSections(sections),
    [sections],
  );

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Container>
      <CssBaseline />
      <AppBar
        isLessSm={isLessSm}
        position="fixed"
        open={isMoreLg || isLessSm}
      />
      <Drawer
        anchor={isLessSm ? "top" : "left"}
        variant="permanent"
        open={isMoreLg || isLessSm}
      >
        <NavList>
          {sectionsList}
        </NavList>
      </Drawer>
    </Container>
  );
}

export default NavBar;