import React from 'react'
import { AntdLayout } from '../../lib/antd/components'
import { Outlet } from 'react-router-dom'

export const MasterLayout = () => {

  return (<AntdLayout>
    <Outlet/>
  </AntdLayout>)
}
