import { IBaseExt, IBaseSearch } from "@/models"
import { AntdDivider, AntdSpace, AntdTree, AntdTreeProps } from "@/lib/antd/components"
import React, { ElementRef, useEffect, useRef, useState } from "react"
import { SearchProps } from "antd/es/input"
import { Col, Divider, Input, Row } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined } from "@ant-design/icons"
import { ZoomComponent } from "../ZoomComponent"
const { Search } = Input


export interface FolderListProps<IModel, ISearch> {
  title?: React.ReactNode,
  generateTree: AntdTreeProps<IModel>["generateTree"],
  searchParams: ISearch,
  addRootFolder?: React.ReactNode,
  onSearch: (params: ISearch) => void,
  onSelect: (params: string) => void,
  setSearchParams: React.Dispatch<React.SetStateAction<ISearch>>,
  // renderContext: ?
}

const { AntdDirectoryTree } = AntdTree

export const FolderList = <IModel extends IBaseExt, ISearch extends IBaseSearch>(props: FolderListProps<IModel, ISearch>) => {
  const { onSearch, searchParams, setSearchParams, onSelect, title, generateTree, addRootFolder, ...rest } = props
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  useEffect(() => {
    const timeOutId = setTimeout(() => setFolderSearchParams(delayFolderSearch), 1500)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [delayFolderSearch])
  const onChangeFolder: SearchProps["onChange"] = (e) => {
    setDelayFolderSearch(e.target.value)
  }
  const onSearchFolder: SearchProps["onSearch"] = (value) => {
    setFolderSearchParams(value)
  }

  return (
    <ZoomComponent title={title} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}>
      <Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm thư mục" onChange={onChangeFolder} onSearch={onSearchFolder} />
      <AntdDivider />
      {addRootFolder}
      <AntdDivider />
      <AntdDirectoryTree multiple={false} generateTree={generateTree} searchParams={folderSearchParams} onSelect={(value) => onSelect((value as string[])[0])} {...rest}/>
    </ZoomComponent>
  )
}
