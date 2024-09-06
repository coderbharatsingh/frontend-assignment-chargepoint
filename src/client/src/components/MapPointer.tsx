import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface MapPointerProps {
    gps: string
}

const MapPointer: React.FC<MapPointerProps> = ({ gps }) => {
    const [waitForLoader, setWaitForLoader] = React.useState<boolean>(true); // This code have no meaning only to test the skeleton UI for loading places
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
        setTimeout(() => {
            setWaitForLoader(false); // This code have no meaning only to test the skeleton UI for loading places
        }, 2000);
    }, []);
      
    React.useEffect(() => {
        if(gps) {
            const [lat, lng] = gps.split('|');
            setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
    }, [gps]);
    
    return isLoaded && !waitForLoader ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={12}
        >
            <Marker position={markerPosition} { ...customIcon ? { icon: customIcon } : {}} />
        </GoogleMap>
    ) : (
        <SkeletonTheme baseColor="#aaa" highlightColor="#777">
            <Skeleton height={300} borderRadius="20px" />
        </SkeletonTheme>
    )
}

export default MapPointer;
