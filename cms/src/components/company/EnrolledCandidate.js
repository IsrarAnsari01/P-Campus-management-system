import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import NavBar from '../NavBar'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Ads from './Ads'
import FooterPage from '../footer/FooterPage'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
export default function EnrolledCandidate() {
    const [studentsRecord, setStudentsRecord] = useState([])
    const colums = [
        { title: "Name", field: "fName" },
        { title: "Email", field: "email" },
        { title: "Education", field: "education" },
        { title: "Skills", field: "skills" },
        { title: "Exprience", field: "exprience" },
    ]
    useEffect(() => {
        getAllStudents()
    }, [])
    function getAllStudents() {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student`)
            .then(students => {
                setStudentsRecord(students.data.students)
            })
            .catch(err => {
                console.log("Error In finding Students ==> ", err)
            })
    }
    return <>
        <NavBar />
        <Container fluid>
            <Row>
                <Col>
                    <Card className='mt-5'>
                        <Card.Header className='bg-success text-center text-white'>
                            <Card.Title>
                                <h2 className='lead'> Total Number of Enroll Students is {studentsRecord.length}</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col lg={9}>
                    <Card>
                        <Card.Body>
                            {studentsRecord.length > 0 ? < MaterialTable title='Here Is the List of Enroll Student'
                                data={studentsRecord}
                                columns={colums}
                            /> : <Spinner animation="grow" variant="warning" />}

                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Ads />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}