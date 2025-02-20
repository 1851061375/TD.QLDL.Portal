import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import {
    QrcodeOutlined,
    MailOutlined
  } from '@ant-design/icons'

export const CardMoiGioiBDS = ({data}: {data: any}) => {

    return (
        <Card
            title="Cá nhân hành nghề môi giới BĐS"
            className="widget widget-title-center title-border-none mb-4"
        >
            <table className="table table-responsive table-striped moigioi-list-user">
            <tbody>
            {data?.map((item: any, index: number) => (
                <tr key={index}>
                <td className="px-0 w-auto">
                    <img src={item.avatar} alt={item.name} className="thumb my-1" />
                </td>
                <td className="w-100 ps-3">
                    <Link to={"#"} className="mb-2 d-block">{item.name}</Link>
                    <p className="mb-0"><QrcodeOutlined /> {item.key}</p>
                    <p className="mb-0"><MailOutlined /> {item.mail}</p>
                </td>
                </tr>
            ))}
            </tbody>
            </table>
        </Card>
    )
}
