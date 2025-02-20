import { Navigate, RouteObject, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { Login, RequiredAuth } from '../features/auth/components'
import React, { Suspense } from 'react'
import { MasterLayout, PortalMasterLayout } from '../components/layout'

import { dichVuRoutes } from './admin/dichVuRoutes'
import { loaiDichVuRoutes } from './admin/loaiDichVuRoutes'
import { coCauToChucRoutes } from './admin/coCauToChucRoutes'
import { DynamicImportFailBoundary } from "./DynamicImportFailBoundary";
import { primaryRoutes } from '@/services'
import { portalRoutes } from './portal'


export const adminRouters: RouteObject[] = [
    {
        path: primaryRoutes.admin.root,
        element:
            <Suspense fallback={<div>loading</div>}>
                <RequiredAuth>
                    <MasterLayout />
                </RequiredAuth>
            </Suspense>,
        errorElement: <DynamicImportFailBoundary />,
        children: [
            ...dichVuRoutes,
            ...loaiDichVuRoutes,
            ...coCauToChucRoutes,
        ]
    },


    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Navigate to={primaryRoutes.portal.home.path} />
    },  
    {
        path: '/admin',
        element: <Navigate to={primaryRoutes.admin.root} />
    },
    {
        path: primaryRoutes.portal.root,
        element: (
            <Suspense fallback={<div>loading...</div>}>
                <PortalMasterLayout />
            </Suspense>
        ),

        children: [
            {
                index: true,
                element: <Navigate to={primaryRoutes.portal.home.path} />,
            },
            ...portalRoutes
        ],
    },
]
export const router = createHashRouter(adminRouters)