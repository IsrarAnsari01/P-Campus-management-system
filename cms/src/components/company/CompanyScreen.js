import { useEffect, useState } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import SideManu from '../homePage/SideManu'
import ComapnySignUpForm from '../forms/ComapnySignUpForm'
import { Link } from 'react-router-dom'
import Ads from './Ads'
import axios from 'axios'
import AppSettings from '../AppSettings'
import "./companyStyle.css"
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
        {/* Company Banner */}
        <section className='companyBanner'>
            <Container className='pt-5 pb-5'>
                <Row className='pt-5 pb-5'>
                    <Col className='pt-5 pb-5'>
                        <h2> Welcome to Campus Management System</h2>
                        <h5> If you worried about batter candidates for your jobs <br /> Then you are in right place</h5>
                        <p className='text-danger pt-2 pb-2'>We have many companies in our portal its Safe platform Lets! login</p>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* Company Banner */}
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
                            <Link to='/login'> If you alerady have an account lets Login!</Link> | <Link to='/companySignIn'> Sign Up</Link>
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
