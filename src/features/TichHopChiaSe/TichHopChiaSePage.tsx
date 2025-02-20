import { PlusCircleOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { Link } from "react-router-dom"
import { TichHopChiSeTable } from "./components/ItemList"
import { useState } from "react"


export const TichHopChiaSePage = () => {
    return (

        <Card
            title="Tích hợp chia sẻ"
            //extra={<Link to="/"><PlusCircleOutlined /> Xem thêm</Link>}
            className="widget widget-title-img mb-4 tich-hop"
        >
            <TichHopChiSeTable ></TichHopChiSeTable>
        </Card>


    )
}