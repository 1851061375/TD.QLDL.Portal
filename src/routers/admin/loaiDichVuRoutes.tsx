
import { primaryRoutes } from '@/services'
import React from 'react'
import { RouteObject } from 'react-router-dom'
const LoaiDichVuLazy = React.lazy(() => import('../../pages/LoaiDichVu/LoaiDichVu'))

export const loaiDichVuRoutes: RouteObject[] = [
    {
        path: primaryRoutes.admin.loaiDichVu.root,
        element: <LoaiDichVuLazy />
    },
]