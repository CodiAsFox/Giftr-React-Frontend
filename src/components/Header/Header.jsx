import React from 'react'
import Logout from "./Logout/Logout"

const Header = () => {
  return (
    <header>Header
      <CheckToken />
      <Logout />
    </header>
  )
}

export default Header