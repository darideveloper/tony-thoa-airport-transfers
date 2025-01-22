import { apiBaseUrl } from "./api"

export async function getTransports () {

  // Get data
  const endpoint = `${apiBaseUrl}/transports/`
  const response = await fetch(endpoint)
  const transports = await response.json()

  // Format data
  const data = []
  for (const transport of transports.data) {
    data.push ({
      id: transport.key, 
      text: transport.name, 
      price: transport.price, 
      initialActive: transport.by_default
    })
  }
  return data
}