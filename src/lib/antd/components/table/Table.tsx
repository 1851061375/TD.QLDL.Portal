import { Table } from 'antd'
import { ComponentProps, useEffect } from 'react'
import { ColumnsType, TableProps } from 'antd/es/table'
import { IBaseExt, IBasePagination } from '../../../../models'

export interface IAntdTableProps<IModel, ISearch> extends Omit<TableProps<IModel>, "columns"> {
  columns: ColumnsType<IModel>,
  onSearch: (params: ISearch) => void,
  searchParams: ISearch,
  setSearchParams: React.Dispatch<React.SetStateAction<ISearch>>
}

export const AntdTable = <IModel extends IBaseExt, ISearch extends IBasePagination>(props: IAntdTableProps<IModel, ISearch>) => {
  const { columns, dataSource, pagination, loading, onSearch, searchParams, setSearchParams, rowKey, ...rest } = props
  // thiếu case k muốn search luôn 
  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])
  return (
      <Table
        rowKey={rowKey || "id"}
        loading={loading}
        columns={columns as any}
        dataSource={dataSource}
        pagination={pagination ? {
          ...pagination,
          current: searchParams.pageNumber === 0 ? 1 : searchParams.pageNumber,
          pageSize: searchParams.pageSize,
          onChange(page, pageSize) {
            setSearchParams({ ...searchParams, pageNumber: page, pageSize: pageSize })
          },
        } : undefined}
        {...rest} />
  )
}
