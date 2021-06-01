import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Jobs from './Jobs'
import "./StudentScreenStyle.css"
export default function AllJobs() {
    return <>
        <NavBar />
        {/* Job Banner */}
        <section className='jobBanner'>
            <Container className='pt-5 pb-5'>
                <Row className='pt-5 pb-5'>
                    <Col className='pt-5 pb-5'>
                        <h1> <span style={{ color: "rgb(14, 232, 207)" }}>Wait!</span> If you want to find a job and if <br /> you worry about your <span style={{ color: "rgb(14, 232, 207)" }}>financial expenses</span></h1> <br />
                        <h5> Then you come to the right place we have <span style={{ color: "rgb(14, 232, 207)" }}>enough jobs</span> find a job that matches with your Skils</h5>
                        <p className='text-danger'> If you don't sign in yet! lets do this</p>
                        <Link to="/Signin" className='btn btn-warning'> Click now</Link>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* Job Banner */}
        {/* Jobs Details */}
        <section style={{ backgroundColor: "#f5f5f5" }}>
            <Container fluid>
                <Row className='pt-5'>
                    <Col>
                        <h2 className='text-center' style = {{fontWeight: 'bold'}}> Jobs posted by reputated companies </h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className='mt-4'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Jobs />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section >
        {/* Jobs Details */}
        {/* Recently get jobs */}
        <section className='forSuccessfullCandidate'>
            <Container className='pt-5 pb-3'>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <h2 style={{ color: "rgb(14, 232, 207)", fontSize: 40, fontWeight: '900', textDecoration: 'underline' }} className='text-center'> Our successfull candidates </h2>
                    </Col>
                </Row>
            </Container>
            <Container className='pt-4 pb-5' fuild>
                <Row>
                    <Col>
                        <div className='list-group'>
                            <Row>
                                <Col lg={4}>
                                    <img src="https://images.unsplash.com/photo-1618456724660-3cde90b19a28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80/600x314" class="img-fluid rounded" alt="" />
                                </Col>
                                <Col lg={8}>
                                    <h3 style={{ color: "rgb(14, 232, 207)" }} className="pb-3">Israr Mehmood</h3>
                                    <h5 style={{ color: "rgb(14, 232, 207)" }}> I get the Job from this Protal, now I can support my family Thanks Admin </h5>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ad officia, ipsa expedita corporis dolor aut magnam sit quos enim quidem corrupti dolorum ipsum distinctio, labore natus, libero in! Ipsa.
                                        <br />
                                        <span style={{ color: "rgb(14, 232, 207)" }} > Exprience</span>
                                        <br />
                                        <span style={{ color: "rgb(14, 232, 207)" }}> So far exprience of this site is pretty much average but admin will improve it </span>
                                    </p>
                                </Col>
                            </Row>
                            <Row className='pt-5 mt-2'>
                                <Col lg={8} className='text-right'>
                                    <h3 style={{ color: "rgb(14, 232, 207)" }} className="pb-3"> John </h3>
                                    <h5 style={{ color: "rgb(14, 232, 207)" }}> I get the Job from this Protal, now I can support my family Thanks Admin </h5>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ad officia, ipsa expedita corporis dolor aut magnam sit quos enim quidem corrupti dolorum ipsum distinctio, labore natus, libero in! Ipsa.
                                        <br />
                                        <span style={{ color: "rgb(14, 232, 207)" }} > Exprience</span>
                                        <br />
                                        So far exprience of this site is pretty much average but admin will improve it
                                    </p>
                                </Col>
                                <Col lg={4}>
                                    <img src="https://images.unsplash.com/photo-1582070595814-fe36a8d39532?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80/600x314" class="img-fluid rounded" alt="" />
                                </Col>
                            </Row>
                            <Row className='pt-5 mt-2'>
                                <Col lg={4}>
                                    <img src="https://images.unsplash.com/photo-1612214495858-4f32b96155a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80" class="img-fluid rounded" alt="" />
                                </Col>
                                <Col lg={8}>
                                    <h3 style={{ color: "rgb(14, 232, 207)" }} className="pb-3"> Alexa </h3>
                                    <h5 style={{ color: "rgb(14, 232, 207)" }}> I get the Job from this Protal, now I can support my family Thanks Admin </h5>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ad officia, ipsa expedita corporis dolor aut magnam sit quos enim quidem corrupti dolorum ipsum distinctio, labore natus, libero in! Ipsa.
                                        <br />
                                        <span style={{ color: "rgb(14, 232, 207)" }} > Exprience</span>
                                        <br />
                                        So far exprience of this site is pretty much average but admin will improve it
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* Recently get jobs */}
        {/* Login Link */}
        <Container>
            <Row>
                <Col className ='mt-5'>
                    <h2>Join with us and get Jobs that suits your personality</h2>
                </Col>
            </Row>
            <Row className ='justify-content-center'>
                <Col className ='mt-4'>   
                    <a href ='#' className ='btn btn-primary' >Sign in</a>
                </Col>
            </Row>
        </Container>
        {/* Login Link */}
        <FooterPage />







    </>
}