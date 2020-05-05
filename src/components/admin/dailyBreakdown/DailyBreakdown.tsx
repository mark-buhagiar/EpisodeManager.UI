import moment from 'moment';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import * as showsApi from '../../../api/showsApi';
import { toDateFormat } from '../../../helpers/dateHelpers';
import { Qualities, QualityColors } from '../../../models/enums/Qualities';
import EpisodeCountDailyDistribution from '../../../models/EpisodeCountDailyDistribution';
import DateRange from '../../common/DateRange';
import Panel from '../../common/panel';
import Color from 'color';

const DailyBreakdown: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const today = new Date();

    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    stacked: true,
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    };

    function convertDataToChartJs(dailyDistribution: EpisodeCountDailyDistribution[]): any {
        return {
            labels: dailyDistribution.map((day) => toDateFormat(moment(day.date))),
            datasets: Qualities.map((quality) => {
                return {
                    label: quality.description,
                    backgroundColor: (QualityColors[quality.id] as Color).alpha(0.6).rgb().string(),
                    hoverBackgroundColor: (QualityColors[quality.id] as Color).alpha(0.8).rgb().string(),
                    data: dailyDistribution.map(
                        (day) => day.qualityDistribution.find((x) => x.quality === quality.id)?.count ?? 0,
                    ),
                };
            }),
        };
    }

    async function handleDateRangeChanged(startDate: Date, endDate: Date): Promise<void> {
        setIsLoading(true);
        const dailyDistribution = await showsApi.getEpisodeCountDailyDistribution(startDate, endDate);
        setData(convertDataToChartJs(dailyDistribution));
        setIsLoading(false);
    }

    const panelActions = (
        <DateRange
            initialStartDate={moment(today).subtract(6, 'days').toDate()}
            initialEndDate={today}
            onDateRangeChanged={handleDateRangeChanged}
        />
    );

    return (
        <Panel title="Daily Breakdown" panelActions={panelActions}>
            <Bar data={data} options={chartOptions} />
        </Panel>
    );
};

export default DailyBreakdown;
