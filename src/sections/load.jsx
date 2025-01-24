import Spinner from "../components/spinner"

export default function Load () {
  return (
    <div className="load w-full h-full fixed left-0 top-0 bg-green z-20 flex items-center justify-center transition-all duration-500">
      <Spinner 
        size="l"
      />
    </div>
  )
}