import Iconify from 'common/components/Iconify';
import { TFunction } from 'react-i18next';

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name}/>;

export interface NavigationItem {
  title: string,
  path: string,
  icon: JSX.Element,
  info?: string,
  children?: NavigationItem[]
}

const getNavConfig = (t: TFunction<'dashboard'>): NavigationItem[] => {
 return ([
  {
    title: t('navigation_section.dashboard_nav_item'),
    path: '/iser/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: t('navigation_section.user_nav_item'),
    path: '/iser/users',
    icon: getIcon('eva:people-fill')
  },
  {
    title: t('navigation_section.product_nav_item'),
    path: '/iser/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: t('navigation_section.blog_nav_item'),
    path: '/iser/blog',
    icon: getIcon('eva:file-text-fill'),
  }])
}

export default getNavConfig;
