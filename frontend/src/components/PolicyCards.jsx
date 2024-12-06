import PropTypes from 'prop-types';
const PolicyCards = ({logo , title ,descripton}) => {
  return (
    <>
   <div className='flex  justify-center text-center h-44  rounded-md items-center mx-12 shadow-xl bg-gray-50'>
    <div className='flex flex-col items-center '>
        <img className='w-12' src={logo} alt="" />
        <h1 className='font-bold text-lg'>{title}</h1>
        <h2 className='text-md text-gray-500'>{descripton}</h2>
    </div>
    </div> 

    </>
  )
}

PolicyCards.propTypes = {
    logo : PropTypes.string,
    title : PropTypes.string,
    descripton : PropTypes.string
}
export default PolicyCards