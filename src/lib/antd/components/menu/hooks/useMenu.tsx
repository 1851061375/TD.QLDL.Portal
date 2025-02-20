import { SelectProps } from 'antd'
import React, { useMemo } from 'react'
import { IBaseExt } from '@/models'
import { AntdMenuProps } from '../Menu'

// 1d menu // dùng list_to_tree để tạo (n)d menus
export const useMenu = <IModel extends IBaseExt>({generateMenu}: {generateMenu: AntdMenuProps<IModel>["generateMenu"]}) => {
    const menu = useMemo((): AntdMenuProps<IModel>["items"] => {
        if(generateMenu){
            const {model, label, value} = generateMenu
            return model?.map(x => ({label: x[label], key: x[value]} as any))
        }
        return undefined
    },[generateMenu?.model])
  return menu
}