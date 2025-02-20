import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { useClickOutSide } from "@/hooks/useClickOutSide"
import { useFolderContext } from "@/contexts/FolderContext"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { EditOutlined } from "@ant-design/icons"
import { SuaCoCauToChuc } from "./modals/SuaCoCauToChuc"

const COCAUTOCHUC_CONTEXTMENU: AntdMenuProps<never>["items"] = [{
    label: 'Sửa cơ cấu',
    key: 'edit',
    icon: <EditOutlined />,
  },]

export const CoCauToChucContextMenu = ({top, left, setVisible, id}: {top?:number, left?: number,id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [suaCoCauToChucModalVisible, setSuaCoCauToChucModalVisible] = useState(false)
    const onCleanUp = useCallback(() => {
       
            setVisible(false)
        
    },[])

    // useClickOutSide(ref, () => onCleanUp())
    useEffect(() => {
       
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
         
          if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
            if(!suaCoCauToChucModalVisible)
            onCleanUp()
            
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref,suaCoCauToChucModalVisible]);
    const onClick: AntdMenuProps<never>['onClick'] = (e) => {
        console.log('click', e);
        if(e.key == 'edit'){
            setSuaCoCauToChucModalVisible(true)
            // folderContext.setFolderId(id)
            

        }
        // setVisible(false)
    };
    return  <div ref={ref} style={{top, left}} className="context-menu-wrapper">
            <AntdMenu items={COCAUTOCHUC_CONTEXTMENU} mode="vertical" onClick={onClick}/>
            {suaCoCauToChucModalVisible? <SuaCoCauToChuc visible={suaCoCauToChucModalVisible} handlerClose={() => setSuaCoCauToChucModalVisible(false)} folderId={id}/> : <></>} 
        </div>

   
}