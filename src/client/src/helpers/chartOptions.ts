import { LineChartProps } from "@components/LiveChartData";

const chartOptions = (props: LineChartProps) => {
    return {
        interaction: {
          mode: 'index'
        },
        parsing: {
          xAxisKey: 'xData',
          yAxisKey: 'yData'
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: props.title,
          },
        },
        scales: {
          x: {
            time: {
              unit: 'second',
            },
            title: {
              display: true,
              text: props.xLabel,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: props?.yMaxVal || 100,
            title: {
              display: true,
              text: props.yLabel,
            },
            ticks: {
              display: false,
            },
          },
        },
    }
};

export default chartOptions;
