
import { primaryRoutes } from '@/services'
import React from 'react'
import { RouteObject } from 'react-router-dom'
const CoCauToChucLazy = React.lazy(() => import('../../pages/CoCauToChuc/CoCauToChuc'))

export const coCauToChucRoutes: RouteObject[] = [
    {
        path: primaryRoutes.admin.coCauToChuc.root,
        element: <CoCauToChucLazy />
    },
]