import './Navbar.css'
import ArrowLogo from '../images/ArrowForwardFilled.svg'

function DropdownItem({ label, imageUrl }) {
  return (
    <div className='dropdown-item-container'>
        <div className='dropdown-item-left-content'>
            <img src={imageUrl} alt='logo' width='24' height='24' />
            <div className='dropdown-item-text'>{label}</div>
        </div>
        <img src={ArrowLogo} alt='logo' width='24' height='24' />
    </div>
  )
}


export default DropdownItem