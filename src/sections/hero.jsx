export default function Hero() {
  return (
    <section
      className={`
        hero
        flex
        flex-col-reverse md:flex-row
        items-center
        justify-center
        text-purple
        font-bold
        container
      `}
    >
      {/* main image */}
      <img
        src='./imgs/hero.webp'
        alt='transport image'
        className={`
          w-full md:w-1/2 lg:w-7/12
          my-8 md:my-0
        `}
      />

      <div
        className={`
          texts
          px-6
          text-center
          w-full md:w-1/2 lg:w-5/12
        `}
      >
        <h1
          className={`
            text-5xl lg:text-6xl
            mt-8 lg:mt-12
            mb-4 lg:mb-8
            font-normal
          `}
        >
          Tony &
          <br />
          Thoa's
          <br />
          Wedding
        </h1>
        <p>November 8 - 12, 2025</p>

        <a
          href='https://withjoy.com/tony-and-thoa/welcome'
          target='_blank'
          className={`
            bg-gold hover:bg-white
            text-white hover:text-gold
            font-bold
            px-12
            py-2
            text-2xl md:text-xl
            rounded-full
            my-6
            md:mb-12
            inline-block
            border-4
            border-gold
            duration-300
          `}
        >
          Nizuc Resort
        </a>

        <p
          className={`
            my-4
            w-full lg:w-3/4 xl:w-1/2
            mx-auto
          `}
        >
          Complimentary transportation will be provided for all guests traveling on November 8th, on November 9th, on November 10th, and on November 12th.
        </p>

        <p
          className={`
            my-4
            w-full lg:w-3/4 xl:w-1/2
            mx-auto
          `}
        >
          Please book and secure your airport transportation service below.
        </p>
      </div>
    </section>
  )
}
