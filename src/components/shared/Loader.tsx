import loadericon from "/asebridge/assets/icons/loader.svg"

function Loader() {
  return (
    <div className='flex-center w-full' >
        <img src={loadericon} alt="loader" width={24} height={24} />
    </div>
  )
}

export default Loader