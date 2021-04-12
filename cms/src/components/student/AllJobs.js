import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import { Container, Row, Col, Card, Form, FormControl } from 'react-bootstrap'
import SideManu from '../homePage/SideManu'
import Jobs from './Jobs'
export default function AllJobs() { 
    return <>
        <NavBar />
        <Container fluid>
            <Row className='mt-3'>
                <Col>
                    <Card>
                        <Card.Header className='bg-secondary text-white text-center'>
                            <Card.Title>
                                <h2 className='lead'> Job Posted By Repoteted Companies </h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Jobs />
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