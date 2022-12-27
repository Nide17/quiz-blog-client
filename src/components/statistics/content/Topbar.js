import React, { useState } from "react"
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap"
import { Link } from "react-router-dom"
import Logout from '../../auth/Logout'

const Topbar = ({ toggleSidebar, auth }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true)
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen)

  const userName = auth && auth.user && auth.user.name

  return (
    <Navbar color="light" light 
    className="navbar shadow-sm p-3 my-2 bg-white rounded" expand="md"
      style={{ position: "-webkit-sticky", position: "sticky", top: "0", zIndex: "2"}}>

      <Button color="info" onClick={toggleSidebar}>
        <i className="fa fa-align-left mr-2"></i>
      </Button>

      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>

        <strong className="font-weight-bold ml-4">
          {userName && userName}
          </strong>

        <Nav className="ml-auto align-items-center" navbar>

          <NavItem>
            <NavLink tag={Link} to={"/"} className="text-success font-weight-bold">
              Home
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/webmaster"} className="text-success font-weight-bold">
              Webmaster
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/course-notes"} className="text-success font-weight-bold">
              Notes
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/blog"} className="text-success font-weight-bold">
              Blog
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Logout />
            </NavLink>
          </NavItem>

        </Nav>

      </Collapse>
    </Navbar>
  )
}

export default Topbar
