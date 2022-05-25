import Iconify from 'common/components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name}/>;

export interface NavigationItem {
  title: string,
  path: string,
  icon: JSX.Element,
  info?: string,
  children?: NavigationItem[]
}

const navConfig: NavigationItem[] = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;
