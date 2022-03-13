import type { ReactNode } from 'react';

export interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
  isMoreLg: boolean;
  isLessSm: boolean;
};

export interface Section {
  href?: string;
  icon?: ReactNode;
  title: string;
};