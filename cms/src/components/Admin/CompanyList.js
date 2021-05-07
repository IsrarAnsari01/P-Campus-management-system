import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import axios from 'axios'
import AppSettings from '../AppSettings'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CompanyList() {
    const [companies, setCompanies] = useState([])
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem("AI")) {
            history.push("/admin", { status: false })
            return
        }
        getCompinesFromServer()
    }, [])
    const getCompinesFromServer = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company`)
            .then(success => {
                setCompanies(success.data.compines)
            })
            .catch(err => {
                console.log("Something went wrong", err)
            })
    }
    const deleteThisCompany = (id) => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company/${id}`)
            .then(succ => {
                axios.get(`${AppSettings.SERVER_URL_PORT}/job/delete-all-job-of-specific-company/id`)
                    .then(succ => {
                        if (succ.status) {
                            getCompinesFromServer()
                            localStorage.removeItem("CI")
                        }
                    })
            })
            .catch(err => {
                console.log("Something went wrong ", err)
            })
    }
    let sno = 0
    return <>
        <AdminNavBar />
        <Container fluid mt-4>
            <Row className='mt-5'>
                <Col lg={{ span: 4, offset: 4 }}>
                    <Link to='/jobpostedbycompany' className='btn btn-block btn-danger text-white'> Go to see the list of Jobs</Link>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h2> Currently We Have More than {companies.length} Registered Companies</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Company Name</th>
                                        <th>Location</th>
                                        <th>Company Owner Name </th>
                                        <th>Company Cetagory </th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map(company => <tr>
                                        <td>{++sno}</td>
                                        <td>{company.companyName}</td>
                                        <td>{company.companyCity}, {company.companyCountry}</td>
                                        <td>{company.companyOwnerName}</td>
                                        <td>{company.companyCetagory}</td>
                                        <td><Button variant='danger' onClick={() => deleteThisCompany(company._id)}> Delete</Button></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
}