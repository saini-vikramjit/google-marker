// LODASH
import {
    get
}                              from 'lodash';


export function filterResults(data) {

    const filterData = data.map( (address) => {
        
        const name = get(address, 'address_components[0].short_name', null) || get(address, 'formatted_address', null)
        const { lat, lng } = address["geometry"]["location"];
        const { location } = address["place_id"]; 
        return {
            location: location,
            name: name,
            lat: lat,
            lng: lng
        }
    });

    return filterData;
};