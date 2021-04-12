import { Container, Row, Col, Card } from 'react-bootstrap'
import AdminLoginForm from './AdminLoginForm'
export default function AdminLogin() {
    return <>
        <div className='d-flex justify-content-center align-items-center' style = {{height: 700}}>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header className='bg-danger text-white text-center'>
                                <Card.Title><h2> Hello Admin Lets! Login </h2></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <AdminLoginForm />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>




    </>
}