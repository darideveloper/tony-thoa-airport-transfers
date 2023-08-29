import { apiBaseUrl } from "./api"

export async function getHotels () {

  // Get data
  const endpoint = `${apiBaseUrl}/hotels/`
  const response = await fetch(endpoint)
  const hotels = await response.json()

  // Format data
  const data = []
  for (const hotel of hotels.data) {
    data.push ({
      value: hotel.name, 
      label: hotel.name, 
      price: hotel.extra_price
    })
  }

  // Add "other" option
  data.push({
    value: 'other', 
    label: 'Another Hotel in Playa del Carmen',
    price: 0
  })

  return data
}