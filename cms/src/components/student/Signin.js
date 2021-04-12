import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SideManu from '../homePage/SideManu'
import UserSignUpForm from '../forms/UserSignUpForm'
export default function Signin() {
    return <>
        <NavBar />
        <Container fluid>
            <Row className='mt-4'>
                <Col>
                    <Card >
                        <Card.Header className='bg-info text-center text-white'>
                            <Card.Title>
                                <h2> Enroll with us ! we try to give you Better Job!</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row className='mt-4'>
                <Col lg={8}>
                    <Card>
                        <Card.Header className='bg-info text-white text-center'>
                            <Card.Title>
                                <h2 className='lead'><CardMembershipIcon /> Join With us  </h2> 
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <UserSignUpForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <SideManu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}
