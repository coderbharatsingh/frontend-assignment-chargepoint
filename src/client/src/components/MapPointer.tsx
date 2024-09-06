import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapPointerProps {
    gps: string
}

const MapPointer: React.FC<MapPointerProps> = ({ gps }) => {
    const [markerPosition, setMarkerPosition] = React.useState({
        lat: 0,
        lng: 0
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    });

    const containerStyle = {
        width: '300px',
        height: '300px'
    };
    
    const customIcon = isLoaded ? {
        url: import.meta.env.VITE_GOOGLE_MARKER_ICON_URL,
        scaledSize: new window.google.maps.Size(70, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50),
    } : null;
      
    React.useEffect(() => {
        if(gps) {
            const [lat, lng] = gps.split('|');
            setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
    }, [gps]);
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={12}
        >
            <Marker position={markerPosition} { ...customIcon ? { icon: customIcon } : {}} />
        </GoogleMap>
    ) : <></>
}

export default MapPointer;
