import { Card, Tabs, TabsProps } from "antd"
import { VanBanNhaOTable } from "./VanBanNhaO/VanBanNhaOTable"
import { VanBanBDSTable } from "./VanBanThiTruongBDS/VanBanBDSTable"
import { BaoCaoQuanLyNhaOTable } from "./BaoCaoQuanLyNhaO/BaoCaoQuanLyNhaOTable"

export const VanBanQuyPhamPhapLuatPage = (props: any) => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Nhà ở',
            children: (
                <VanBanNhaOTable></VanBanNhaOTable>)
        },
        {
            key: '2',
            label: 'Thị trường BĐS',
            children: (
                <VanBanBDSTable></VanBanBDSTable>
            )
        },
        // {
        //     key: '3',
        //     label: 'Thông tin báo cáo',
        //     children: "Content of Tab 3"
        // },
    ]
    return (
        <Card
            title="Văn bản quy phạm pháp luật"
            className={props.hidden ? "hidden" : "widget widget-title-img mb-4"}
        >
            <Tabs defaultActiveKey="1" items={items} className="tabs-widget-home" />
        </Card>

    )
}