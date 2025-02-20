
import { primaryRoutes } from '@/services'
import React  from 'react'
import { RouteObject } from 'react-router-dom'

const DichVuLazy = React.lazy(() => import('../../pages/DichVu/DichVu'))

export const dichVuRoutes: RouteObject[] = [
    {
        path: primaryRoutes.admin.dichVu.root,
        element: <DichVuLazy />
    },
]