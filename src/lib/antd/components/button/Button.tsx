import { Button } from 'antd'
import {ComponentProps} from 'react'

export interface IAntdButtonProps extends ComponentProps<typeof Button>{

}

export const AntdButton = (props: IAntdButtonProps) => {
    const {children, ...rest} = props
  return (
    <Button {...rest}>{children}</Button>
  )
}
