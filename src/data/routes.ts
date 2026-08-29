import { AUTHOR_NAME } from '@/lib/utils';

export interface Route {
  label: string;
  path: string;
  index?: boolean;
  primary?: boolean;
}

const routes: Route[] = [
  {
    index: true,
    label: AUTHOR_NAME,
    path: '/',
  },
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Resume',
    path: '/resume',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Engineering Log',
    path: '/writing',
  },
  {
    label: 'Stats',
    path: '/stats',
    primary: false,
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
  {
    label: 'GitHub',
    path: 'https://github.com/tmarhguy',
  },
];

export default routes;
