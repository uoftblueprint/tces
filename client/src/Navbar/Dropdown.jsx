import './Dropdown.css'
import DropdownItem from './DropdownItem'

import SettingsLogo from '../images/SettingsFilled.svg'
import LogoutLogo from '../images/LogoutFilled.svg'
import PeopleLogo from '../images/PeopleFilled.svg'

function Dropdown({ isAdmin }) {
  return (
    <div className='dropdown-container'>
        <div className='dropdown-title'>Profile</div>
        <div className='dropdown-items'>
            {isAdmin && <DropdownItem label='Admin Dashboard' imageUrl={PeopleLogo} />}
            <DropdownItem label='Settings' imageUrl={SettingsLogo} />
            <DropdownItem label='Log Out' imageUrl={LogoutLogo} />
        </div>
    </div>
  )
}

export default Dropdown