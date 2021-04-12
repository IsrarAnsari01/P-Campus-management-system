import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory } from "react-router";

function NavBar() {
    let [status, setStatus] = useState(false)
    const [forCompany, setForCompany] = useState(false)
    useEffect(() => {
        if (localStorage.getItem("SI")) {
            setStatus(true)
        } else if (localStorage.getItem("CI")) {
            setForCompany(true)
        }
    }, [])
    const history = useHistory()
    const logoutUser = () => {
        localStorage.removeItem("SI")
        history.push("/login", {status: "StudentLogOut"})
        setStatus(false)
    }
    const logoutCompany = () => {
        localStorage.removeItem("CI")
        history.push("/companyLogIn", {status: "CompanyLogOut"})
        setForCompany(false)
    }
    return <>
        <Navbar bg="dark" expand="lg" variant='dark' sticky="top" className='p-4'>
            <Navbar.Brand href="/" className='text-white' style={{ fontSize: 25 }}>Campus Management System |</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" className='text-white' style={{ fontSize: 16 }}>Home</Nav.Link>
                    <Nav.Link href="/companies" className='text-white' style={{ fontSize: 16 }}>Companies</Nav.Link>
                    <Nav.Link href="/student" className='text-white' style={{ fontSize: 16 }}>Students</Nav.Link>
                    <Nav.Link href="/allJobs" className='text-white' style={{ fontSize: 16 }}>Jobs</Nav.Link>
                    {localStorage.getItem("CI") ? <Nav.Link href="/postjob" className='text-white' style={{ fontSize: 16 }}>Post Jobs</Nav.Link> : <></>}
                    {localStorage.getItem("SI") ? <Nav.Link href="/profile" className='text-white' style={{ fontSize: 16 }}>Student Profile</Nav.Link> : <></>}
                    {localStorage.getItem("CI") || localStorage.getItem("SI") ? <></> :
                        <NavDropdown title="Login" id="basic-nav-dropdown" className='bg-dark text-white' style={{ fontSize: 16 }}>
                            <NavDropdown.Item href="/companyLogIn">Company Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login" >Student Login</NavDropdown.Item>
                        </NavDropdown>}
                </Nav>
                {status ? <Nav className='text-white'>
                    <Nav.Link className='btn btn-danger text-white mr-4' onClick={() => logoutUser()} > Logout </Nav.Link>
                </Nav> : <></>}
                {forCompany ? <Nav className='text-white'>
                    <Nav.Link className='btn btn-danger text-white mr-4' onClick={() => logoutCompany()} > Logout </Nav.Link>
                </Nav> : <></>}
                <Nav className='text-white'>
                    <Nav.Item className='h5'> <b> <u> <i> Designed & Developed By IA</i></u></b> </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
}


export default NavBar;