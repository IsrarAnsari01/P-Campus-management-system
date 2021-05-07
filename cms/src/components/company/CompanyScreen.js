import { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import SideManu from '../homePage/SideManu'
import ComapnySignUpForm from '../forms/ComapnySignUpForm'
import { Link } from 'react-router-dom'
import Ads from './Ads'
import axios from 'axios'
import AppSettings from '../AppSettings'
export default function CompanyScreen() {
    const [compines, setcompines] = useState([])
    const getCompinesFromServer = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company`)
            .then(success => {
                setcompines(success.data.compines.reverse().slice(0, 6))
            })
            .catch(err => {
                console.log("Something went wrong", err)
            })
    }
    useEffect(() => {
        getCompinesFromServer()
    }, [])

    return <>
        <NavBar />
        <Image style={{ width: "100vw", height: "100vh", }} src="https://images.unsplash.com/photo-1603357465999-241beecc2629?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1104&q=80" fluid />
        <Container fluid>
            <Row>
                <Col>
                    <Card className='mt-4'>
                        <Card.Header>
                            <Card.Title>
                                <h2 className='lead text-center'> Welcome To CMS | Register your company and find a valueable Candidate for Your Company</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col lg={8}>
                    <Card className='mt-4'>
                        <Card.Header>
                            <Card.Title>
                                <h4> Recently Join Companies </h4>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {compines && compines.length > 0 ? compines.map(company => <>
                                <Card.Title> {company.companyName}</Card.Title>
                                <Card.Text className='pl-5'> Location | {company.companyCity} , {company.companyContry} <br />
                                    Added in our website | {company.addedOn} <br /> Owner | {company.companyOwnerName} <br /> Company Email | {company.companyEmail}  <br /> Cetagory | {company.companyCetagory}</Card.Text>
                                <hr />
                            </>) : <Card>
                                <Card.Header>
                                    <Card.Title className='text-danger text-center m-4'>
                                        Opps!
                                    </Card.Title>
                                    <Card.Body>
                                        Currently No company registered with us Stay connected compines join with us very soon
                                    </Card.Body>
                                </Card.Header>
                            </Card>}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className='mt-4'>
                    <SideManu />
                </Col>
            </Row>
        </Container>
        <hr />
        <Container fluid>
            <Row className='mt-4'>
                <Col lg={9}>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>
                                <h2 className='lead'> Don't Wait Register right now!</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className='mt-4'>
                            <ComapnySignUpForm />
                        </Card.Body>
                        <Card.Footer className='text-center'>
                            <Link to='/companyLogIn'> If you alerady have an account lets LogIn!</Link> | <Link to='/companySignIn'> Sign Up</Link>
                        </Card.Footer>
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
