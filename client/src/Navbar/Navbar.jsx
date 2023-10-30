import { useState } from 'react'
import logo from '../images/tces-logo.png'
import Profile from '../images/ProfileFilled.svg'
import Dropdown from './Dropdown'
import NavbarProfile from './NavbarProfile'
import NavbarButton from './NavbarButton'

function Navbar() {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className='nav-container'>
      <div className='left-content'>
      <div className='image'>
        <img src={logo} alt='logo' width='46' height='50' />
      </div>
      <div className='left-content-buttons'>
        <NavbarButton title='CLIENTS' />
        <NavbarButton title='JOB LEADS' />
        <NavbarButton title='EMPLOYERS' />
      </div>
      </div>
      <div className='right-content'>
        <NavbarProfile imageUrl={Profile} toggleDropdown={toggleDropdown} />
      </div>
      {isDropdownVisible && <Dropdown isAdmin={true} />}
    </div>
  )
}

export default Navbar