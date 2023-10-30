import './Navbar.css'

function NavbarProfile({ imageUrl, toggleDropdown}) {
  return (
    <button className="right-content-image" onClick={toggleDropdown}>
      <img src={imageUrl} alt='NavButton'/>
    </button>
  )
}

export default NavbarProfile