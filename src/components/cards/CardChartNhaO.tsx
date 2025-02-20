import React from 'react'
import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export const CardChartNhaO = ({options, title}: {options: Highcharts.Options; title: string}) => {

    return (
        <Card
            title={ title }
            className="widget widget-title-center title-border-none mb-4"
        >
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
            />
        </Card>
    )
}
