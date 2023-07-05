import Swal from 'sweetalert2'

const stripeApi = "https://stripe-api-flask.herokuapp.com/"
const stripeUser = "rivieramayaairporttransfers"

function alertError() {
  // Alert error for api call
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: 'Try again later'
  })
}

export async function submitStripe(activeTransportType, serviceName, servicePrice, loading, setLoading) {

  // Toggle loading status
  setLoading(!loading)

  // Get service data
  const serviceAmount = 1
  const serviceImage = "https://github.com/darideveloper/rivieramayaairporttransfers/blob/master/public/imgs/page-logo.png?raw=true"
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
    const response = await fetch(stripeApi, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": stripeUser,
        "url": window.location.href,
        "products": serviceData
      }),
      mode: "cors",
    })
    const response_json = await response.json()

    // // Validate api response for redirect
    if (Object.keys(response_json).includes("stripe_url")) {
      window.location.href = response_json.stripe_url
    } else {
      alertError()
    }
  } catch (error) {
    alertError()

    // Toggle loading status
    setLoading(!loading)
  }

}