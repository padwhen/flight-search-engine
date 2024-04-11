import { createContext, useState, useContext } from "react";

const AirportContext = createContext()

export const AirportProvider = ({ children }) => {
    const [airport1, setAirport1] = useState('')
    const [airport2, setAirport2] = useState('')
    return (
        <AirportContext.Provider value={{ airport1, setAirport1, airport2, setAirport2 }}>
            {children}
        </AirportContext.Provider>
    )
}

export const useAirportContext = () => useContext(AirportContext)