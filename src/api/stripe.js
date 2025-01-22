import Swal from 'sweetalert2'
import { apiBaseUrl } from './api'

// const stripeApi = "https://stripe-api-flask.herokuapp.com/"
const backend_api = `${apiBaseUrl}/buy/`

export async function submitStripe(serviceName, servicePrice, firstName, lastName, vipCode, phone, email) {
  
  function alertError() {
    // Alert error for api call
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: 'Try again later'
    })
  }
  
  // Get service data
  const serviceAmount = 1
  const serviceImage = "https://github.com/darideveloper/tony-thoa-airport-transfers/blob/master/public/imgs/logo.png?raw=true"
  const inputsData = []
  const inputs = document.querySelectorAll("input:not(.no-collect), select:not(.no-collect)")
  inputs.forEach(input => {
    let name = input.name.charAt(0).toUpperCase() + input.name.slice(1)
    name = name.replace("-", " ")
    const value = input.value
    inputsData.push(`${name}: ${value}`)
  })
  const serviceDescription = inputsData.join(", ")

  // Merge service data
  const serviceData = {}
  serviceData[serviceName] = {
    "amount": serviceAmount,
    "description": serviceDescription,
    "price": servicePrice,
    "image_url": serviceImage,
  }

  try {
    const response = await fetch(backend_api, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": firstName,
        "last-name": lastName,
        "price": servicePrice,
        "vip-code": vipCode,
        "stripe-data": serviceData,
        "from-host": window.location.href,
        "phone": phone,
        "email": email,
      }),
      mode: "cors",
    })
    const response_json = await response.json()

    // Show error if api call fails
    if (response_json.status == "error") {
      alertError()
      return null
    } 

    // Redirect to page if ink is generated
    if (response_json.redirect && response_json.redirect != null) {
      window.location.href = response_json.redirect
    }

  } catch (error) {
    alertError()
  }

}