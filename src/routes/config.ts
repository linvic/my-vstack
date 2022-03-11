import { Path } from '@/constants/url';
import React, { ExoticComponent } from 'react';

interface RouterItem {
  path: string,
  element: ExoticComponent
}

const routeConfig: RouterItem[] = [
  {
    path: Path.locker,
    element: React.lazy(() =>
      import(
                /* webpackChunkName: "swap" */ '../pages/locker/index'
      )
    )
  },
];

export default routeConfig;