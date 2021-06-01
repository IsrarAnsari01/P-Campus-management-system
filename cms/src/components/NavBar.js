import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory } from "react-router";
import "./navbar.css"
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
        history.push("/login", { status: "StudentLogOut" })
        setStatus(false)
    }
    const logoutCompany = () => {
        localStorage.removeItem("CI")
        history.push("/login", { status: "CompanyLogOut" })
        setForCompany(false)
    }
    return <>
        <Navbar expand="lg" sticky="top" variant='dark' className='pl-2 pr-2' style={{ backgroundColor: "#2f3233" }}>
            <Navbar.Brand href="/" className='text-white' style={{ fontSize: 30 }}>
                <span style={{ fontSize: 40, fontWeight: '900', color: "rgb(14, 232, 207)", letterSpacing: 5 }}>C</span>ampus  <span style={{ fontSize: 40, fontWeight: '900', color: "rgb(14, 232, 207)", letterSpacing: 5 }}>M</span>anagement  <span style={{ fontSize: 40, fontWeight: '900', color: "rgb(14, 232, 207)", letterSpacing: 5 }}>S</span>ystem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ml-5">
                    <Nav.Link href="/" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Home</Nav.Link>
                    <Nav.Link href="/companies" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Companies</Nav.Link>
                    <Nav.Link href="/student" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Students</Nav.Link>
                    <Nav.Link href="/allJobs" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Jobs</Nav.Link>
                    {localStorage.getItem("CI") ? <Nav.Link href="/postjob" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Post Jobs</Nav.Link> : <></>}
                    {localStorage.getItem("SI") ? <Nav.Link href="/profile" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Student Profile</Nav.Link> : <></>}
                    {localStorage.getItem("CI") || localStorage.getItem("SI") ? <></> :
                        <Nav.Link href="/login" className='forLinks' style={{ color: 'rgb(14, 232, 207)' }}>Login</Nav.Link>
                    }
                </Nav>
                {status ? <Nav className='text-white'>
                    <Nav.Link className='btn btn-danger text-white mr-4' onClick={() => logoutUser()} > Logout </Nav.Link>
                </Nav> : <></>}
                {forCompany ? <Nav className='text-white'>
                    <Nav.Link className='btn btn-danger text-white mr-4' onClick={() => logoutCompany()} > Logout </Nav.Link>
                </Nav> : <></>}
            </Navbar.Collapse>
        </Navbar>
    </>
}


export default NavBar;