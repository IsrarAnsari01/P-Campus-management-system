import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import UserLoginForm from '../forms/UserLoginForm'
import { Link } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "./paginationCss.css"
export default function Login() {
    let [companySwitch, setCompanySwitch] = useState(false)
    {/* <NavBar /> */ }
    return <>
        <div className='loginPageBackgroundColor'>
            <Container>
                <Row>
                    <Col className='mt-5'>
                        <Card className='mt-4' style={{ borderRadius: 80, boxShadow: "20px 20px 20px #242123", backgroundColor: "#f0f0f0" }}>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col lg={4}>
                                            <Card className='mt-5'>
                                                <Image style={{ width: "100vw", height: "65vh" }} src='https://image.freepik.com/free-vector/job-finder-logo-template_7791-83.jpg' fluid />
                                            </Card>
                                        </Col>
                                        <Col lg={8}>
                                            <Card className='mt-5'>
                                                <Card.Header className='bg-secondary text-white text-center'>
                                                    <Card.Title>
                                                        <h2> Login in our Portal</h2>
                                                    </Card.Title>
                                                </Card.Header>
                                                <Card.Body className ='bg-light'>
                                                    <UserLoginForm />
                                                </Card.Body>
                                                <Card.Footer className='text-center'>
                                                    <FormControlLabel
                                                        control={<Switch checked={companySwitch} onChange={() => setCompanySwitch(!companySwitch)} name="Company" />}
                                                        label="For Company" style = {{color: "#9c8797"}}
                                                    />
                                                    <br />
                                                    {companySwitch ? <Card.Link>
                                                        <Link to="/companySignIn" > If you don't have any account lets ! Sign In</Link>
                                                    </Card.Link> : <Card.Link>
                                                        <Link to="/Signin" > If you don't have any account lets ! Sign In</Link>
                                                    </Card.Link>}
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        {/* <Container>
            <Row className='mt-5'>
            </Row>
        </Container>
        <Container>
            <Row className='mt-3'>
            </Row>
        </Container> */}
        {/* <FooterPage /> */}
    </>
}
