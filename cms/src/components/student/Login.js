import {Container, Row, Col, Card} from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import UserLoginForm from '../forms/UserLoginForm'
import { Link } from 'react-router-dom'
export default function Login() {  
  return <> 
        <NavBar/>
        <Container>
            <Row className =' mt-5'>
            <Col>
            <Card  className ='mt-5'>
                <Card.Header className ='bg-secondary text-white text-center'>
                <Card.Title>
                    <h2> Lets ! Login to Apply for Jobs</h2>
                </Card.Title>
                </Card.Header>
                <Card.Body>
                    <UserLoginForm />
                </Card.Body>
                <Card.Footer className ='text-center'>
                    <Card.Link>
                        <Link to = "/Signin" > If you don't have any account lets ! Sign In</Link>
                    </Card.Link>
                </Card.Footer>
            </Card>
            </Col>
            </Row>
        </Container>
        <Container>
            <Row className ='mt-5'>
            </Row>
        </Container>
        <Container>
            <Row className ='mt-3'>
            </Row>
        </Container>
        <FooterPage />    
    </>
}
