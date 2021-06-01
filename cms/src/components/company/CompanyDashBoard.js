import { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import ListOfPostedJobs from './ListOfPostedJobs'
import ActionsAginstPost from './ActionsAginstPost'
import { useHistory } from 'react-router'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Ads from './Ads'
export default function CompanyDashBoard() {
    const history = useHistory()
    const [companyDetails, setCompanyDetails] = useState({})
    useEffect(() => {
        if (!localStorage.getItem("CI")) {
            history.push("/login", { companyError: "User are not Log in" })
            return
        }
        getSpecficCompanyFromDB()
    }, [])
    const getSpecficCompanyFromDB = () => {
        const companyId = localStorage.getItem("CI")
        axios.get(`${AppSettings.SERVER_URL_PORT}/company/specficCompany/${companyId}`)
            .then(success => {
                setCompanyDetails(success.data.company)
            })
            .catch(err => {
                console.log("Something went wrong ==> ", err)
            })
    }
    return <>
        <NavBar />
        <Container>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Header className='bg-success text-white'>
                            <Card.Title className='text-center'>
                                <h2 className='lead'> Welcome to CMS | Dear {companyDetails.companyOwnerName}</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container fluid>
            <Row className="mt-4">
                <Col lg={9}>
                    <Card>
                        <Card.Header >
                            <h2> <i>{companyDetails.companyName} </i> </h2>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h2 className='lead'> Owner Name | {companyDetails.companyOwnerName} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Cetagory | {companyDetails.companyCetagory} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Email  |  {companyDetails.companyEmail} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Address | {companyDetails.companyCity}, {companyDetails.companyCountry} </h2>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card>
                                <Card.Header className='bg-danger text-white'>
                                    <Card.Title>
                                        <h4 className='text-center'> List Of Posted Jobs </h4>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <ListOfPostedJobs />
                                </Card.Body>
                            </Card>
                            <hr />
                            <Card>
                                <Card.Header className='bg-success text-white'>
                                    <Card.Title>
                                        <h4 className='text-center'> Response Against Jobs </h4>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <ActionsAginstPost />
                                </Card.Body>
                            </Card>
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