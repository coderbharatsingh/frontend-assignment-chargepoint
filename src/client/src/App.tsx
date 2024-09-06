import React from 'react';
import useWebSocket from "react-use-websocket";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import LiveChartData from '@components/LiveChartData';
import VechileInfo from '@components/VechicleInfo';
import 'react-loading-skeleton/dist/skeleton.css';
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
    const [waitForLoader, setWaitForLoader] = React.useState<boolean>(true); // This code have no meaning only to test the skeleton UI for loading places

    const btnClickHandler = () => {
        setPauseUpdate((prevState) => !prevState);
    }
    
    React.useEffect(() => {
        setTimeout(() => {
            setWaitForLoader(false); // This code have no meaning only to test the skeleton UI for loading places
        }, 2000);
    }, []);

    React.useEffect(() => {
        if(lastJsonMessage !== null && !pauseUpdate && !waitForLoader) {
            setWsJsonMessage(lastJsonMessage);
        }
    }, [lastJsonMessage, waitForLoader])
    
    return <>
        <div className="container">
            {wsJsonMessage ? <>
                <VechileInfo readyState={readyState} btnClickHandler={btnClickHandler} wsJsonMessage={wsJsonMessage} pauseUpdate={pauseUpdate} />
                <LiveChartData title="Speed Profile" xLabel="Time" yMaxVal={160} yLabel="Speed" yVal={wsJsonMessage.speed} xVal={wsJsonMessage.time} />
                <LiveChartData title="State of Charge Profile" xLabel="Time" yLabel="SoC (%)" yVal={wsJsonMessage.soc} xVal={wsJsonMessage.time} />
            </> : <>
            <SkeletonTheme baseColor="#aaa" highlightColor="#777">
                <Skeleton height={300} borderRadius="20px" style={{ marginBottom: '30px', marginTop: '30px' }} />
                <Skeleton height={50} borderRadius="20px" style={{ marginBottom: '30px' }} />
                <Skeleton height={20} borderRadius="20px" style={{ marginBottom: '70px' }} />
                <Skeleton height={10} borderRadius="20px" style={{ marginBottom: '20px' }} />
                <Skeleton height={50} borderRadius="20px" style={{ marginBottom: '30px' }} />
            </SkeletonTheme>
              </>}
        </div>
    </>;
}

export default App;
