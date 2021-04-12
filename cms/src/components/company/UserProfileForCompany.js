import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from '../NavBar'
import { useState } from 'react'
import FooterPage from '../footer/FooterPage'
export default function UserProfileForCompany() {
    const history = useHistory()
    useEffect(() => {
        if(!localStorage.getItem("CI")) {
            history.push("/companyLogIn", {status: "Company Not Login"})
            return
        }
    })
    const location = useLocation()
    const [useInformation, setUserInformation] = useState(location.userInformation)
    const [jobTitle, setJobTitle] = useState(location.jobTitle)
    return <>
        <NavBar />
        <Container>
            <Row style={{ alignItems: 'center', justifyContent: 'center', height: 500 }}>
                <Col lg={{ span: 6 }}>
                    {jobTitle && useInformation && <Card>
                        <Card.Header className='bg-secondary text-white'>
                            <Card.Title>
                                <h2 className='lead'> Candidate Name: {useInformation.fName}  {useInformation.lName} | <span className='text-center'>Apply For {jobTitle}</span> </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className='bg-dark text-white text-center'>
                            <Card.Text>
                                <h4 className='lead'> Email | <b> {useInformation.email}</b></h4> <hr />
                                <h4 className='lead'> Skills | <b> {useInformation.skills}</b></h4> <hr />
                                <h4 className='lead'> Education | <b> {useInformation.education}</b></h4> <hr />
                                <h4 className='lead'> Exprience | <b> {useInformation.exprience}</b></h4>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='bg-secondary text-white text-center'>
                            <Card.Text>
                                <h5> <u> <i> <b> Designed & Developed By IA </b></i></u></h5>
                            </Card.Text>
                        </Card.Footer>
                    </Card>}
                </Col>
            </Row>
        </Container>
        <FooterPage />





    </>
};
