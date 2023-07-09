// react
import { useState, useEffect } from "react"

// Components
import Subtitle from "../components/subtitle"
import TransportTypes from "../components/transport-types"
import Input from "../components/input"
import Select from "../components/select"
import Fieldset from "../components/fieldset"
import FormText from "../components/form-text"
import VipCode from "../components/vip-code"
import SubmitBtn from "../components/submit-btn"

// Api
import { getHotels } from "../api/hotels"
import { submitStripe } from "../api/stripe"
import { getTransports } from "../api/transports"
import { getFreeDates } from "../api/free-dates"

// Context
import LoadContext from '../context/load'
import VipCodeContext from '../context/vip-code'
import { useContext } from 'react'

export default function Form() {

  const { loading, setLoading } = useContext(LoadContext)
  const { vipCode, isVip } = useContext(VipCodeContext)

  const [transports, setTransports] = useState([])
  const [activeTransportType, setActiveTransportType] = useState('Arriving')
  const [activeTransportPrice, setActiveTransportPrice] = useState(0)
  const [mediaQuery, setMediaQuery] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [hotel, setHotel] = useState()
  const [otherHotel, setOtherHotel] = useState('')
  const [hotels, setHotels] = useState([])
  const [arrivingDate, setArrivingDate] = useState('')
  const [arrivingTime, setArrivingTime] = useState('')
  const [arrivingAirline, setArrivingAirline] = useState('')
  const [arrivingFlight, setArrivingFlight] = useState('')
  const [departingDate, setDepartingDate] = useState('')
  const [departingTime, setDepartingTime] = useState('')
  const [departingAirline, setDepartingAirline] = useState('')
  const [departingFlight, setDepartingFlight] = useState('')
  const [total, setTotal] = useState(0)
  const [arrivalFreeDate, setArrivalFreeDate] = useState("2021-12-31")
  const [departureFreeDate, setDepartureFreeDate] = useState("2021-12-31")
  const [oldArrivingPrice, setOldArrivingPrice] = useState(0)
  const [oldDepartingPrice, setOldDepartingPrice] = useState(0)

  function handleUpdateType(id) {
    // Update active transport type
    setActiveTransportType(id)

    // Save price
    const price = transports.find(transport => transport.id == id).price
    setActiveTransportPrice(price)
  }

  function handleResize() {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setMediaQuery(mediaQuery.matches)
  }

  function handleSubmit(e) {

    // Show loading
    setLoading(true)

    // Don't submit form
    e.preventDefault()

    // Get current service price and name
    const currentService = transports.find(transport => transport.id == activeTransportType)
    const serviceName = currentService.text

    // Submit to stripe
    submitStripe(serviceName, total, name, lastName, vipCode).then(() => {
      // Disable loading
      setLoading(false)
    })

  }

  function updateTransports() {
    getTransports().then(apiTransports => {
      setTransports(apiTransports)
      setActiveTransportType(apiTransports[0].id)
      setActiveTransportPrice(apiTransports[0].price)
      setTotal(apiTransports[0].price)
    })
  }

  function updateHotels() {
    getHotels().then(apiHotels => {
      setHotels(apiHotels)
      setHotel(apiHotels[0].value)
    })
  }

  function updateTotal() {
    // Update total uwing transport and hotel values

    // Skip when data its loading
    if (hotels.length == 0) {
      return undefined
    }

    // Get multipliear for round trip
    let multiplier = 1
    if (activeTransportType == "Arriving,Departing") {
      multiplier = 2
    }

    // Calculate total
    let total = activeTransportPrice
    const hotel_obj = hotels.find(h => h.value == hotel)
    total += hotel_obj.price * multiplier
    setTotal(total)
  }

  useEffect(() => {
    // Initial data load

    getFreeDates().then(freeDates => {
      setArrivalFreeDate(freeDates.arrival)
      setDepartureFreeDate(freeDates.departure)
    })

    // Detect when resize screen and update media query status
    window.addEventListener('resize', () => {
      handleResize()
    })

    // Handle when loads
    handleResize(handleResize())
  }, [])

  useEffect(() => {
    // Renmder again when prices change
    updateTotal()

  }, [hotel, activeTransportPrice, hotels, transports])


  useEffect(() => {
    // Renmder again when vip code change

    if (isVip) {
      // Set transport prices to 0 if vip code is valid
      setActiveTransportPrice(0)
      transports.forEach(transport => {
        transport.price = 0
      })
      setTransports(transports)

      // Set hotel prices to 0 if vip code is valid
      hotels.forEach(hotel => {
        hotel.price = 0
      })
      setHotels(hotels)

    } else {
      updateTransports()
      updateHotels()
    }

    updateTotal()

  }, [isVip])

  // useEffect(() => {
  //   // Reset dates when transport changes
  //   setArrivingDate("")
  //   setDepartingDate("")

  // }, [activeTransportType])


  function getArraivingDepartingForm() {
    // Generate arraiving and departing forms

    // Identify active transport type
    const activeForms = activeTransportType.split(",")

    const fieldsets = []
    for (let title of activeForms) {

      // Text changes and set functions
      let direction = "in"
      if (title == "Departing") {
        direction = "from"
      }

      fieldsets.push(
        <Fieldset title={title} key={title}>
          <legend className="title text-xl uppercase mb-3"></legend>
          <Input
            label={`${title} date`}
            type='date'
            name={`${title.toLowerCase()}-date`}
            handleUpdate={(e) => {

              // Update date
              if (title == "Arriving") {
                setArrivingDate(e.target.value)
              } else {
                setDepartingDate(e.target.value)
              }

              console.log({
                arrivalFreeDate,
                departureFreeDate,
                "value": e.target.value,
                oldArrivingPrice,
                oldDepartingPrice
              })

              // Firnd transports
              const transport = transports.find(transport => transport.id == activeTransportType)
              const transportRound = transports.find(transport => transport.id == "Arriving,Departing")

              const oldActiveTransportPrice = activeTransportPrice

              if ((title == "Arriving" && e.target.value == arrivalFreeDate) || 
                (title == "Departing" && e.target.value == departureFreeDate)) {

                // Remove departing price
                if (title == "Arriving") {
                  setOldArrivingPrice(oldActiveTransportPrice)
                } else {
                  setOldDepartingPrice(oldActiveTransportPrice)
                }
                transport.price = 0
                transportRound.price -= oldActiveTransportPrice
                setActiveTransportPrice(0)
                
              } else if ((oldArrivingPrice != 0 && title == "Arriving") ||
                (oldDepartingPrice != 0 && title == "Departing")) {

                // Restore old price
                if (title == "Arriving") {
                  transport.price = oldArrivingPrice
                  setActiveTransportPrice(oldArrivingPrice)
                  setOldArrivingPrice(0)
                } else {
                  transport.price = oldDepartingPrice
                  setActiveTransportPrice(oldDepartingPrice)
                  setOldDepartingPrice(0)
                }

                // Increase price of round trip
                transportRound.price += transport.price
              }


              // Update data
              setTransports(transports)
              updateTotal()

            }}
            value={title == "Arriving" ? arrivingDate : departingDate}
          />
          <Input
            label={`${title} time ${direction} Cancun`}
            type='time'
            name={`${title.toLowerCase()}-time`}
            handleUpdate={(e) => title == "Arriving" ? setArrivingTime(e.target.value) : setDepartingTime(e.target.value)}
            value={title == "Arriving" ? arrivingTime : departingTime}
          />
          <Input
            label='Airline'
            type='text'
            name='airline'
            placeholder="Enter your airline"
            handleUpdate={(e) => title == "Arriving" ? setArrivingAirline(e.target.value) : setDepartingAirline(e.target.value)}
            value={title == "Arriving" ? arrivingAirline : departingAirline}
          />
          <Input
            label='Flight number'
            type='text'
            name='flight'
            placeholder="Enter your flight number"
            handleUpdate={(e) => title == "Arriving" ? setArrivingFlight(e.target.value) : setDepartingFlight(e.target.value)}
            value={title == "Arriving" ? arrivingFlight : departingFlight}
          />
          <FormText
            text={`*In case you have connecting flights, please make sure you provide the info for your actual flight ${title.toLowerCase()} ${direction} Cancun`}
          />
        </Fieldset>
      )
    }

    return fieldsets
  }

  // Generate passager options
  const maxPassenger = 8
  const passengersData = []
  for (let passengerNum = 1; passengerNum <= maxPassenger; passengerNum++) {
    let label = `${passengerNum} passengers`
    if (passengerNum == 1) {
      label = `${passengerNum} passenger`
    }
    passengersData.push({ "value": `${passengerNum}`, "label": label })
  }

  return (
    <section className="buy-form container" id="buy">
      <Subtitle
        text='Transportation Options'
      />

      <VipCode />

      <form action="." method="post" className="mx-auto" onSubmit={e => { handleSubmit(e) }}>
        <TransportTypes
          handleUpdateType={handleUpdateType}
          activeTransportType={activeTransportType}
          transports={transports}
        />

        <div className="fields w-5/6 mx-auto grid gap-10" style={{ gridTemplateColumns: mediaQuery ? "repeat(1, 1fr)" : activeTransportType == "Arriving,Departing" ? "repeat(3, 1fr)" : "repeat(2, 1fr)" }}>
          <Fieldset title='General'>
            <legend className="title text-xl uppercase mb-3"></legend>
            <Input
              label='Name'
              placeholder='Enter your name'
              type='text'
              name='name'
              handleUpdate={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              label='Last name'
              placeholder='Enter your last name'
              type='text'
              name='last-name'
              handleUpdate={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <Select
              label='Number of passengers'
              name='passengers'
              handleUpdate={(e) => setPassengers(e.target.value)}
              options={passengersData}
              activeOption={passengers}
            />
            <FormText
              text="Maximum eight passengers per van"
            />
            <Select
              label='Hotel'
              name='hotel'
              handleUpdate={(e) => {
                // Save hotel value
                const value = e.target.value
                setHotel(value)
              }}
              options={hotels}
              activeOption={hotel}
            />

            {
              // Render other hotel input
              hotel == "other"
              &&
              <Input
                label='Hotel Name'
                placeholder='Enter the hotel full name'
                type='text'
                name='hotel-name'
                handleUpdate={(e) => { setOtherHotel(e.target.value) }}
                value={otherHotel}
              />
            }

          </Fieldset>

          {getArraivingDepartingForm()}

        </div>

        <p className="total text-center text-2xl w-fulll block mt-10">
          Total
          <span className="px-2 font-bold">
            {total}.00 USD
          </span>
        </p>

        <div
          className={`
            wrapper-submit
            flex items-center justify-center mt-10
          `}>
          <SubmitBtn
            value={"Buy Now"}
            extraClass={`w-48 py-3`}
          />
        </div>

      </form>
    </section>
  )
}