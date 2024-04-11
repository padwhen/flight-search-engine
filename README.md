# Flight Search Engine

Flight Search Engine is created by using React.JS, TailwindCSS, React Testing Library, implementing with Google's API.

With the Flight Search Engine, users can initiate searches directly from their city of choice. The search functionality is powered by Google's API, providing autocomplete suggestions and showcasing all airports available within the selected city.


## Installation
``npm install``

## Video Demo

https://github.com/padwhen/flight-search-engine/assets/123895854/4a7bc369-570b-41d6-a7de-80a0e974cc24

## Testing

### Rendering Test: 
This test verifies that the OneWay component renders all necessary input fields and buttons correctly, ensuring that the component's layout is properly displayed to the user.

### Address Switching Test: 
This test ensures that the component allows users to switch between the from and to addresses by clicking the "Switch" button. It checks if the input values are correctly swapped after the button is clicked.

### Airport Interaction Test: 
This test validates the interaction between the component and the airport data fetching mechanism. It confirms that the component fetches and displays airports correctly based on the provided addresses, ensuring that the user can select airports for both the from and to locations.
