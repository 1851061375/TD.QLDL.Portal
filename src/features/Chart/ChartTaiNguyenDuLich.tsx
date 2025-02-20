import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { requestGET } from '@/utils/baseAPI'
import _ from 'lodash'

export const ChartTaiNguyenDuLich = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await requestGET('tainguyendulich');
                setData(res.data ?? []);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const options2: any = {
        chart: {
            type: 'bar',
            spacing: 0,
            plotBorderWidth: 0,
        },
        colors: ["#3575DD"],
        title: { text: '', align: 'left' },
        xAxis: {
            categories: data?.map((item: any) => item.Ten),
            title: { text: null },
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            title: { text: 'Tài nguyên', align: 'high' },
            labels: { overflow: 'justify' },
            gridLineWidth: 0
        },
        tooltip: { valueSuffix: ' tài nguyên' },
        plotOptions: {
            bar: {
                borderRadius: '3',
                dataLabels: { enabled: true },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: { enabled: false },
        series: [{ name: 'Số tài nguyên', data: data?.map((item: any) => item.SoLuong) }]
    }

    return (
        <Card title="Tài nguyên du lịch đang quản lý" className="widget widget-title-center title-border-none mb-4">
            {!loading && <HighchartsReact highcharts={Highcharts} options={options2} />}
        </Card>
    )
}