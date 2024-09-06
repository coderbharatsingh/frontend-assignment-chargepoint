import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import chartOptions from "@helpers/chartOptions";

interface DataProps {
  labels: any[],
  datasets: any[]
}

export interface LineChartProps {
  yVal: number;
  xVal: number;
  yMaxVal?: number;
  xLabel: string;
  yLabel: string;
  title: string;
}

const LineChart: React.FC<LineChartProps> = (props) => {
    const [data, setData] = useState<DataProps>({
      labels: [], // Time labels
      datasets: [
        {
          label: props.yLabel,
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
      ],
    });

    
    
    useEffect(() => {
      if(props.yVal) {
        setData(((prevData) => ({
          labels: [...prevData.labels, props.xVal].slice(-200),
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, { yData: props.yVal, xData: props.xVal }].slice(-200),
            },
          ],
        })));
      }
    }, [props.yVal]);
    
    return (
      <Line
        className="chart-section"
        data={data}
        options={chartOptions(props)}
      />
    );
}
export default LineChart;