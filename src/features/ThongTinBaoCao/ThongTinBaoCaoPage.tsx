import { Card, Tabs, TabsProps } from "antd"
import { BaoCaoQuanLyNhaOTable } from "./NhaO/BaoCaoQuanLyNhaOTable"
import { BaoCaoThiTruongBDSTable } from "./ThiTruongBDS/ThiTruongBDSTable"
// import { BaoCaoQuanLyNhaOTable } from "./BaoCaoQuanLyNhaO/BaoCaoQuanLyNhaOTable"

export const ThongTinBaoCaoPage = (props:any) => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Nhà ở',
            children: (
                <BaoCaoQuanLyNhaOTable></BaoCaoQuanLyNhaOTable>)
        },
        {
            key: '2',
            label: 'Thị trường BĐS',
            children: (
                <BaoCaoThiTruongBDSTable></BaoCaoThiTruongBDSTable>
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
            title="Thông tin báo cáo"
            className={props.hidden ? "hidden" : "widget widget-title-img mb-4"}
        >
            <Tabs defaultActiveKey="1" items={items} className="tabs-widget-home" />
        </Card>

    )
}