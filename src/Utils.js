export function handleTitleChange(selectedTitle, setInformation) {
    if (selectedTitle === 'One Way') {
      setInformation(<div>This is information for One Way</div>);
    } else if (selectedTitle === 'Multi City') {
      setInformation(<div>This is information for Multi City</div>);
    } else if (selectedTitle === 'Round Trip') {
      setInformation(<div>This is information for Round Trip</div>);
    }
}

export function trimCity(cityString) {
    const parts = cityString.split(',')
    if (parts.length > 0) {
        return parts[0].trim()
    }
    return cityString
}