import React from 'react';
import { ReadyState } from "react-use-websocket";
import MapPointer from '@components/MapPointer';
import { MessageProps } from '../App';

interface VechileInfoProps {
    btnClickHandler: () => void;
    wsJsonMessage: MessageProps;
    pauseUpdate: boolean;
    readyState: number;
}
const VechileInfo: React.FC<VechileInfoProps> = ({ wsJsonMessage, btnClickHandler, pauseUpdate, readyState}) => {
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Disconnecting',
        [ReadyState.CLOSED]: 'Diconnected',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const statusClass = {
        [ReadyState.CONNECTING]: 'blink',
        [ReadyState.OPEN]: 'green',
        [ReadyState.CLOSING]: 'red-blink',
    }?.[readyState] || 'red';

    return <>
        <div className="map-area">
            <div className="map-parent">
                <MapPointer gps={wsJsonMessage.gps} />
            </div>
            <div className="vehicle-info">
                <div className="status-box">
                    <div className={`car-status ${statusClass}`}></div>
                    <div className="text">{connectionStatus}</div>
                </div>
                <div className="detail-box">
                    <div className="title">Current Speed</div>
                    <div className="progress-bar">
                        <span className="text" style={{ width: `${wsJsonMessage.speed * 0.625}%` }}>{wsJsonMessage.speed} km/h</span>
                    </div>
                </div>
                <div className="detail-box">
                    <div className="title">State of Charge</div>
                    <div className="progress-bar">
                        <span className="text" style={{ width: `${wsJsonMessage.soc}%` }}>{wsJsonMessage.soc} %</span>
                    </div>
                </div>
                <div className="row">
                    <div className="detail-box col">
                        <div className="title">Energy</div>
                        <div className="text">{wsJsonMessage.energy}</div>
                    </div>
                    <div className="detail-box col">
                        <div className="title">Odometer</div>
                        <div className="text">{wsJsonMessage.odo}</div>
                    </div>
                </div>
                <div className="btn-parent">
                    <button onClick={btnClickHandler} className="pause-btn">{pauseUpdate ? 'Sync Live Update' : 'Pause Live Update'}</button>
                </div>
            </div>
        </div>
    </>
}

export default VechileInfo;
