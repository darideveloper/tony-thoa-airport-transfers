import { apiBaseUrl } from "./api"

export async function getFreeDates () {

  // Get data
  const endpoint = `${apiBaseUrl}/free-dates/`
  const response = await fetch(endpoint)
  const free_dates = await response.json()

  return free_dates.data
}