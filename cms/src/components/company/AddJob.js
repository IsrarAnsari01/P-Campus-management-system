import { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from '../NavBar'
import { Link, useHistory } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FooterPage from '../footer/FooterPage'
import PostJobForm from '../forms/PostJobForm'
import Slider from '../homePage/Slider'
import axios from 'axios'
import AppSettings from '../AppSettings'
export default function AddJob() {
    const [companyDetails, setCompanyDetails] = useState({})
    const history = useHistory()
    const [totalStudent ,setTotalStudents] = useState(0)
    useEffect(() => {
        if (!localStorage.getItem("CI")) {
            history.push("/companyLogIn", { companyError: "Company Not Login" })
            return
        }
        getSpecficCompanyFromDB()    
        getAllStudents()       
    }, [])
    const getSpecficCompanyFromDB = () => {
        const companyId = localStorage.getItem("CI")
        axios.get(`${AppSettings.SERVER_URL_PORT}/company/specficCompany/${companyId}`)
            .then(success => {
                setCompanyDetails(success.data.company)
            })
            .catch(err => {
                console.log("Something went wrong ==> ", err)
            })
    }
    const getAllStudents = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student/`)
        .then(companies => {
            setTotalStudents(companies.data.students.length)
        }).catch(err => {
            console.log("Error in Fetching Compines")
        })
    }
    return <>
        <NavBar />
        <Container>
            <Row>
                <Col>
                    <Card className='mt-4'>
                        <Card.Header className='bg-light'>
                            <Card.Title>
                                <h2> Welcome {companyDetails.companyOwnerName} | {companyDetails.companyName}</h2>
                            </Card.Title>
                            <Card.Subtitle>
                                <Card.Text className='lead'> Post New Job </Card.Text>
                            </Card.Subtitle>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <Card className='mt-4'>
                        <Card.Header>
                            <Card.Title>
                                <h2 className='lead'> Post New Job | Clearfully Fill Form</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <PostJobForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} className='mt-4'>
                    <Slider />
                    <hr />
                    <Card className='bg-light text-dark mt-5'>
                        <Card.Body>
                            <Card.Title> <PeopleAltIcon /> Total Candidates</Card.Title>
                            <Card.Text>
                                <p>Currently more then <b>{totalStudent}</b> Candidates Enroll with US </p>
                            </Card.Text>
                            <Card.Link >
                                <Link to='/enrolledStudent'>See Candidate Record </Link>
                            </Card.Link>
                        </Card.Body>
                    </Card>
                    <Card className='bg-light text-dark mt-2'>
                        <Card.Body>
                            <Card.Title> <DashboardIcon /> See Your DashBoard</Card.Title>
                            <Card.Link >
                                <Link to='/companyDashBoard'>See Your Deshboard </Link>
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <FooterPage />




    </>
}