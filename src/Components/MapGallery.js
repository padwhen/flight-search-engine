import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { trimCity } from "../Utils";
import { AIRPORT_API_KEY } from "../variables";

export default function MapGallery({ address, onSelectAirport }) {
    const [center, setCenter] = useState('');
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setZoom(15);
        }, 5000);
        return () => clearTimeout(timeOutId);
    }, []);

    const containerStyle = {
        width: '200px',
        height: '100px'
    };

    const mapRef = useRef(null)

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        if (center.length > 0) {
            let minLat = center[0].lat;
            let maxLat = center[0].lat;
            let minLng = center[0].lng;
            let maxLng = center[0].lng;
            // Find the minimum and maximum latitude and longitude values
            center.forEach(coord => {
                minLat = Math.min(minLat, coord.lat);
                maxLat = Math.max(maxLat, coord.lat);
                minLng = Math.min(minLng, coord.lng);
                maxLng = Math.max(maxLng, coord.lng);
            });
            // Create a LatLngBounds object with the calculated bounds
            const bounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(minLat, minLng),
                new window.google.maps.LatLng(maxLat, maxLng)
            );
            map.fitBounds(bounds);
        }
    }, [center]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);


    useMemo(() => {
        fetch(`https://api.api-ninjas.com/v1/airports?name=${trimCity(address)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': AIRPORT_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            const locations = data.map(airport => ({
                lat: parseFloat(airport.latitude),
                lng: parseFloat(airport.longitude),
                name: airport.name
            }));
            setCenter(locations);
        })
        .catch(error => {
            console.error('Error fetching airport data: ', error);
        });
    }, [address]);

    const handleSelectAirport = (airport) => {
        onSelectAirport(airport.name)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 overflow-auto">
            <div className="bg-white rounded-lg p-6 max-h-80 max-w-80 overflow-auto">
                <div className="map-container gap-y-4 overflow-y-auto">
                    {center && center.length > 0 && center.map((airport, index) => {
                        const { lat, lng, name } = airport;
                        return (
                            <div key={index} className="rounded-lg p-4 hover:bg-gray-200 transition duration-300" onClick={() => handleSelectAirport(airport)}>
                                <div className="inset-0 bg-grey-100 rounded-lg p-2">
                                    <div>
                                        <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={zoom} onLoad={onLoad} onUnmount={onUnmount}>
                                            <Marker position={{ lat, lng }} />
                                        </GoogleMap>     
                                        <h3 className="text-xl mt-1">{name}</h3>                               
                                    </div>
                                    {index !== center.length - 1 && <div className="border-b border-gray-300 my-2"></div>}
                                </div>
                            </div>
                        );
                    })}                    
                </div>
            </div>
        </div>
    );
}
