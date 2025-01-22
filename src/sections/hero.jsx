import Logo from '../components/logo'

export default function Hero () {
  return (
    <section className="hero">
      <div className="wrapper-logo mx-auto my-0">
        <img src="./imgs/page-logo.webp" alt="event logo" className="w-56 mx-auto"/>
      </div>

      <div className="hero-image relative">

        <div className="text-wrapper mt-16 mb-10 w-full z-10 text-center flex flex-col items-center justify-center sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:m-0">
          <h1 className='py-2 px-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl leading-snug bg-white inline-block lg:py-5 lg:px-20 '>
            Complimentary transportation will be provided for all guests traveling on November 9th and November 12th
            <br />
            <span
              className={`
              text-sm
              md:text-xl
              lg:text-2xl
              `}
              >
              PLEASE BOOK NOW AND SECURE YOUR AIRPORT TRANSPORTATION SERVICE
            </span>
          </h1>
        </div>

        <img src="./imgs/hero.png" alt="transport image" className="w-full"/>
      </div>
    </section>
  )
}