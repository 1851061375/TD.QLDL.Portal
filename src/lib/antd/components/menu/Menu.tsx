
import React from 'react'
import { Menu, MenuProps } from 'antd'
import { IBaseExt } from '@/models'
import { useMenu } from './hooks/useMenu'

export interface AntdMenuProps<IModel> extends MenuProps{
  generateMenu?:{
    model: IModel[] | undefined,
    label: keyof IModel,
    value: keyof IModel,
}
} 

export const AntdMenu = <IModel extends IBaseExt>(props: AntdMenuProps<IModel>) => {
  const {generateMenu, ...rest} = props
  const items = useMenu({generateMenu})
  return (
    <Menu items={items} {...props}></Menu>
  )
}
