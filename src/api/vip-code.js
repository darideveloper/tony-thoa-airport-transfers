import { apiBaseUrl } from "./api"

export async function validateVipCode (vipCode) {

  // Get data
  const endpoint = `${apiBaseUrl}/validate-vip-code/`
  const response = await fetch (endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"vip-code": vipCode})
  })
  const validation = await response.json()

  return validation.status == "success"
}