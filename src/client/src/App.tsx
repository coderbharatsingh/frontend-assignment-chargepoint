import React from 'react';
import useWebSocket from "react-use-websocket";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LiveChartData from '@components/LiveChartData';
import VechileInfo from '@components/VechicleInfo';
import './style.scss';

Chart.register(CategoryScale);

export interface MessageProps {
    energy: number;
    gps: string;
    odo: number;
    soc: number;
    speed: number;
    time: number;
}

const App = () => {
    const { lastJsonMessage, readyState }: { lastJsonMessage: MessageProps, readyState: number } = useWebSocket(
        import.meta.env.VITE_WS_URL,
        { share: false, shouldReconnect: () => true },
    );
    const [wsJsonMessage, setWsJsonMessage] = React.useState<MessageProps | null>(null);
    const [pauseUpdate, setPauseUpdate] = React.useState<boolean>(false);

    const btnClickHandler = () => {
        setPauseUpdate((prevState) => !prevState);
    }

    React.useEffect(() => {
        if(lastJsonMessage !== null && !pauseUpdate) {
            setWsJsonMessage(lastJsonMessage);
        }
    }, [lastJsonMessage])
    
    if(wsJsonMessage) {
        return <>
            <div className="container">
                <VechileInfo readyState={readyState} btnClickHandler={btnClickHandler} wsJsonMessage={wsJsonMessage} pauseUpdate={pauseUpdate} />
                <LiveChartData title="Speed Profile" xLabel="Time" yMaxVal={160} yLabel="Speed" yVal={wsJsonMessage.speed} xVal={wsJsonMessage.time} />
                <LiveChartData title="State of Charge Profile" xLabel="Time" yLabel="SoC (%)" yVal={wsJsonMessage.soc} xVal={wsJsonMessage.time} />
            </div>
        </>;
    }

    return <>
        Loading...
    </>;
}

export default App;
