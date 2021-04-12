import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import AdminNavBar from './AdminNavBar'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
import { useHistory } from 'react-router'
export default function StudentView() {
    const [studentsRecord, setStudentsRecord] = useState([])
    function getAllStudents() {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student`)
            .then(students => {
                setStudentsRecord(students.data.students)
            })
            .catch(err => {
                console.log("Error In finding Students ==> ", err)
            })
    }
    const history = useHistory()
    useEffect(() => {
        if(!localStorage.getItem("AI")) {
            history.push("/admin", {status: false})
            return 
        }
        getAllStudents();
    }, [])
    function deleteThisUser(id) {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student/${id}`)
        .then(succ => {
            getAllStudents();
            localStorage.removeItem("student_Id")
            alert("User delete successfully")
        })
        .catch(err => {
            console.log("Something went Wrong, ==> ", err)
        })
    }
    let SNo = 0
 return <>
        <AdminNavBar />
        <Container fluid mt-4>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h2> Currently We Have More than {studentsRecord.length} Students</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {studentsRecord.length > 0 ? <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>First Name</th>
                                        <th>Exprience</th>
                                        <th>Education</th>
                                        <th>Skills</th>
                                        <th>Email</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsRecord.map(student => 
                                        <tr>
                                            <td>{++SNo}</td>
                                            <td>{student.fName} {' '} {student.lName}</td>
                                            <td>{student.exprience}</td>
                                            <td>{student.education}</td>
                                            <td>{student.skills}</td>
                                            <td>{student.email}</td>
                                            <td><Button variant='danger' onClick = {() => deleteThisUser(student._id)}> Delete</Button></td>
                                        </tr>

                                    )}
                                </tbody>
                            </Table> : <Spinner animation="grow" variant="warning" />}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>








    </>
}