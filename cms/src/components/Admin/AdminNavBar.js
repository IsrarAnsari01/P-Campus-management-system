import React from "react";
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
function AdminNavBar() {
    const history = useHistory()
    const logoutAdmin = () => {
        localStorage.removeItem("AI")
        history.push("/admin", { status: "Admin logout" })
    }
    return <>
        <Navbar bg="danger" expand="lg" variant='dark' sticky="top" className='p-4'>
            <Navbar.Brand href="/studentview" className='text-white' style={{ fontSize: 25 }}>Compus Management System | Welcome IA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/companyList" className='text-white' style={{ fontSize: 16 }}>Companies</Nav.Link>
                    <Nav.Link href="/studentview" className='text-white' style={{ fontSize: 16 }}>Students</Nav.Link>
                </Nav>
                <Nav className='text-white'>
                    <Nav.Link className='btn btn-danger text-white mr-4' onClick={logoutAdmin}> Logout </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
}


export default AdminNavBar;