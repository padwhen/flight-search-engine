import React, { useMemo, useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'

import MapGallery from "./MapGallery"
import { useAirportContext } from "../AirportContext";
import { GOOGLEMAPS_API_KEY } from "../variables"


export const MultiCity = () => {
    const { airport2, setAirport2 } = useAirportContext()
    const fromAirport = airport2
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const [fromAddress1, setFromAddress1] = useState('');
    const [fromAddress2, setFromAddress2] = useState('');
    const [airport1, setAirport1] = useState(fromAirport)
    const [airport2_multiCity, setAirport2_multiCity] = useState('')
    const [loading, setLoading] = useState(false)
    
    const [date, setDate] = useState('')
    const [passengers, setPassengers] = useState(1)


    const handlePlaceChanged = (ref, setter) => {
        const [place] = ref.getPlaces();
        if (place) {
            setter(place.formatted_address);
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    };

    const switchValues = () => {
        if (fromAddress1 && fromAddress2) {
            const temp = fromAddress1;
            setFromAddress1(fromAddress2);
            setFromAddress2(temp);
        } else if (airport1 && airport2) {
            const temp = airport1;
            setAirport1(airport2);
            setAirport2(temp);
        }
    };

    const handleFromAddress1Change = (event) => {
        setFromAddress1(event.target.value);
    };

    const handleFromAddress2Change = (event) => {
        setFromAddress2(event.target.value);
    };

    const handleSelectAirport1 = (airportName) => {
        setFromAddress1('')
        setAirport1(airportName)
    }

    const handleSelectAirport2 = (airportName) => {
        setFromAddress2('')
        setAirport2_multiCity(airportName)
    }

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }

    const handlePassengerChange = (event) => {
        setPassengers(event.target.value)
    }

    const libraries = useMemo(() => ['places'], []);

    return (
        <div>
        <div className="flex flex-row items-center justify-between w-full">
            <LoadScript googleMapsApiKey={GOOGLEMAPS_API_KEY} libraries={libraries}>
                <div className="flex flex-row space-x-2 w-full">
                    <StandaloneSearchBox
                        onLoad={ref => (inputRef1.current = ref)}
                        onPlacesChanged={() => handlePlaceChanged(inputRef1.current, setFromAddress1)}
                        className="cursor-pointer font-monttserrat border border-gray-300 rounded px-3 py-2 w-3/8"
                    >
                        <input
                            type="text"
                            placeholder="From address"
                            value={airport1 ? airport1 : fromAddress1}
                            onChange={handleFromAddress1Change}
                            className="focus:outline-none w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </StandaloneSearchBox>
                    <button onClick={switchValues} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded font-bold w-2/8">
                        Switch
                    </button>
                    <StandaloneSearchBox
                        onLoad={ref => (inputRef2.current = ref)}
                        onPlacesChanged={() => handlePlaceChanged(inputRef2.current, setFromAddress2)}
                        className="cursor-pointer font-monttserrat border border-gray-300 rounded px-3 py-2 w-3/8"
                    >
                        <input
                            type="text"
                            placeholder="To address"
                            value={airport2_multiCity ? airport2_multiCity : fromAddress2}
                            onChange={handleFromAddress2Change}
                            className="focus:outline-none w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </StandaloneSearchBox>
                </div>
            </LoadScript>
        </div>
        <div className="flex flex-row space-x-2 w-full mt-1">
            <input type='datetime-local' value={date} onChange={handleDateChange} placeholder="Departure" className="focus:outline-none w-full border border-gray-300 px-4 py-2 rounded w-2/3" />
            <input type='number' value={passengers} onChange={handlePassengerChange} className="focus:outline-none w-full border border-gray-300 px-4 py-2 rounded w-1/3" />
        </div>
        <div>
            {!loading && fromAddress1 && fromAddress1.length > 5 && (
                <MapGallery address={fromAddress1} onSelectAirport={handleSelectAirport1} />  
            )}
            {!loading && fromAddress2 && fromAddress2.length > 5 && (
                <MapGallery address={fromAddress2} onSelectAirport={handleSelectAirport2} />  
            )}

        </div>            
        </div>
    );
};
