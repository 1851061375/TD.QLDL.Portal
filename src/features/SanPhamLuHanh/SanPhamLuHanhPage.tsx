import { PlusCircleOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { Link } from "react-router-dom"
import { ItemList } from "./components/ItemList"
import { useState } from "react"

const SanPhamLuHanhPage = (props: any) => {

    return (
        <div className="container py-4">
            <Card
                title="Sản phẩm lữ hành"
                className={props.hidden ? "hidden" : "widget widget-title-img mb-4"}
            >
            <ItemList ></ItemList>
        </Card>
        </div>
        
    )
}

export default SanPhamLuHanhPage;