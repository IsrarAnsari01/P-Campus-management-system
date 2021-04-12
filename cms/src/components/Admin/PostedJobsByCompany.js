import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import AdminNavBar from './AdminNavBar'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
export default function PostedJobsByCompany() {
    const history = useHistory()
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [allJobs, setAllJobs] = useState([])
    const getAddJobs = () => {
        setGetResponseFromServer(true)
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(jobs => {
                setAllJobs(jobs.data.jobs)
            }).catch(err => {
                console.log("Error in finding data ", err)
            }).finally(() => setGetResponseFromServer(false))
    }
    useEffect(() => {
        if (!localStorage.getItem("AI")) {
            history.push("/admin", { status: false })
            return
        }
        getAddJobs()
    }, [])
    const delThisUser = (id) => {
        setGetResponseFromServer(true)
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/${id}`)
            .then(success => {
                if (success.status) {
                    getAddJobs()
                }
            }).catch(err => {
                console.log("Error In Deleting User ", err)
            }).finally(() => setGetResponseFromServer(false))
    }
    let Sno = 0;
    return <>
        <AdminNavBar />
        <Container fluid mt-4>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h2> Currently {allJobs.length} jobs Posted by Companies</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {getResponseFromServer ? <Spinner animation="grow" variant="danger" /> :
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Sno</th>
                                            <th>Company Name</th>
                                            <th>Job Title</th>
                                            <th>Skills</th>
                                            <th>Salary</th>
                                            <th>Company Location</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allJobs && allJobs.map(job =>
                                            <tr>
                                                <td>{++Sno}</td>
                                                <td>{job.commpanyName}</td>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.reqSkills}</td>
                                                <td>{job.salary}</td>
                                                <td>{job.companyLocation}</td>
                                                <td>
                                                    {getResponseFromServer ? <Button variant="primary" disabled>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="sr-only">Loading...</span>
                                                    </Button> : <Button variant='danger' onClick={() => delThisUser(job._id)}> Delete</Button>}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
}