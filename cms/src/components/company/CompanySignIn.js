import { Container, Card, Row, Col } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import ComapnySignUpForm from '../forms/ComapnySignUpForm'
import SideManu from '../homePage/SideManu'
export default function CompanySignIn() {
    return <>
        <NavBar />
        <Container>
            <Row>
                <Col>
                    <Card className='mt-4'>
                        <Card.Header className='bg-secondary text-white text-center'>
                            <Card.Title>
                                <Card.Title> <h2>Enroll With us We Trying to Give You best candidate for you job</h2></Card.Title>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <Card className='mt-5'>
                        <Card.Header>
                            <Card.Title>
                                <h2 className='lead'> Fill Our Form | Please Fill Form ClearFully</h2>
                            </Card.Title>
                        </Card.Header>
                        <hr />
                        <Card.Body>
                            <ComapnySignUpForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg = {3} className = 'mt-5 pt-5'>
                    <SideManu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}