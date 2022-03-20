/* eslint-disable no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import type { FC, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from 'hooks/useMediaQuery';
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
  openMobile
}) => {

  const isMoreThanLg = useMediaQuery('(min-width: 1200px)');
  const isLessThanSm = useMediaQuery('(max-width: 600px)');

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
        isLessSm={isLessThanSm}
        position="fixed"
        open={isMoreThanLg || isLessThanSm}
      />
      <Drawer
        anchor={isLessThanSm ? "top" : "left"}
        variant="permanent"
        open={isMoreThanLg || isLessThanSm}
      >
        <NavList>
          {sectionsList}
        </NavList>
      </Drawer>
    </Container>
  );
}

export default NavBar;