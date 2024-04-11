import { useAirportContext } from "../AirportContext"

export default function SearchButton() {
    const {airport1, airport2} = useAirportContext()
    const handleValidation = () => {
        if (airport1 && airport2) {
            alert('Okay!')
        } else {
            alert('Oops, please choose your departure/arrival destination ')
        }
    }
    return (
        <div>
           <div className="flex justify-center">
                <button className="px-4 py-2 mt-1 bg-blue-500 hover:bg-blue-700 text-white rounded font-bold w-2/8" onClick={handleValidation}>
                    Go!
                </button>
            </div> 
        </div>
    )
}