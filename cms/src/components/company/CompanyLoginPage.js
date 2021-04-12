import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import CompanyLoginFrom from '../forms/CompanyLoginFrom'
import { Link } from 'react-router-dom'
export default function CompanyLoginPage() {
    return <>
        <NavBar />
        <Container>
            <Row className=' mt-5'>
                <Col>
                    <Card className='mt-5'>
                        <Card.Header className='bg-danger text-white text-center'>
                            <Card.Title>
                                <h2> Lets ! Login For Post New Jobs</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <CompanyLoginFrom />
                        </Card.Body>
                        <Card.Footer className='text-center'>
                            <Card.Link>
                                <Link to="/companySignIn" > If you don't have any account lets ! Sign In</Link>
                            </Card.Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row className='mt-5'>
            </Row>
        </Container>
        <FooterPage />
    </>
}
