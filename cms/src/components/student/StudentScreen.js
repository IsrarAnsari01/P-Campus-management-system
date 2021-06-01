import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
import SideManu from '../homePage/SideManu'
import StudentSlider from './StudentSlider'
import FooterPage from '../footer/FooterPage'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import AppSettings from '../AppSettings'
import Ads from '../company/Ads'
import "./StudentScreenStyle.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function StudentScreen() {
    const classes = useStyles();
    const [allJobs, setAllJobs] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [Companies, setCompanies] = useState([]);
    const [CompanyDetails, setCompanyDetails] = useState({});
    useEffect(() => {
        getAllJobsFromDb()
        getAllCompaines()
    }, [])
    const history = useHistory()
    const getAllJobsFromDb = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(AllJobs => {
                setAllJobs(AllJobs.data.jobs.reverse().slice(0, 5))
            }).catch(err => {
                console.log("Something went wrong ==> ", err)
            })
    }
    const getAllCompaines = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company`)
            .then(companies => {
                setCompanies(companies.data.compines.reverse().slice(0, 4))
            }).catch(err => {
                console.log("Error in Fetching Compines")
            })
    }
    const updateUserProfile = (obj) => {
        if (!localStorage.getItem("SI")) {
            history.push("/login", { err: "user are not Login" })
            return
        }
        const id = localStorage.getItem("SI")
        axios.post(`${AppSettings.SERVER_URL_PORT}/student/apply/${id}`, obj)
            .then(success => {
                alert("Request Successfully Send to the company")
            }).catch(err => {
                console.log("Something went Wrong", err)
            })
    }

    function MyVerticallyCenteredModal(props) {
        return <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {CompanyDetails.companyName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Owner Name: <b> {CompanyDetails.companyOwnerName} </b></h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                            </p>
                        </li>
                        <li className='list-group-item'>
                            <p>
                                Company Email: <b> {CompanyDetails.companyEmail}</b>
                            </p>
                        </li>
                        <li className='list-group-item'>
                            <p>
                                Company Address: <b> {CompanyDetails.companyCity}, {CompanyDetails.companyCountry} </b>
                            </p>
                        </li>
                        <li className='list-group-item'>
                            <p>
                                Cetagory: <b> {CompanyDetails.companyCetagory} </b>
                            </p>
                        </li>
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    }

    return <>
        <NavBar />
        {/* Home Banner */}
        <header className='main-header'>
            <Container>
                <Row className="justify-content-center" >
                    <Col lg={8} className='mt-5 pt-5'>
                        <div className='bannerContent pt-5'>
                            <h2> Welcome to <b> <span style={{ fontSize: 40, fontWeight: '900', color: "rgb(14, 232, 207)" }}>Campus Management System </span></b> </h2>
                            <p> Successfully we provide more then <span style={{ fontWeight: '900', color: "rgb(14, 232, 207)", fontStyle: 'italic', textDecoration: 'underline' }}>50 jobs</span> per day enroll with us to get a suitable job for you</p>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center" >
                    <Col lg={8} className='mb-5 pb-5'>
                        <a href='/login' className='btn btn-success bannerButton'> Enroll with us </a>
                    </Col>
                </Row>
            </Container>
        </header>
        {/* Home Banner */}
        {/* Companies in our Portal */}
        <section className='companies pt-4 pb-4'>
            <Container>
                <Row>
                    <Col lg={8} className="mb-3">
                        <h2> Recently Join Companies in our portal </h2>
                    </Col>
                </Row>
                <Row>
                    {Companies && Companies.length > 0 ? Companies.map(company => <Col lg={6}>
                        <Card style={{ boxShadow: "10px 10px 10px #b5b5b5" }} className='mt-3 mb-4'>
                            <Card.Header>
                                <Card.Title>
                                    <h4 className='text-lead pt-1'> {company.companyName}</h4>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Owner Name: <b>{company.companyOwnerName}</b> <br />
                                    Location: {company.companyCity}, {company.companyCountry}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" onClick={() => {
                                    setModalShow(true)
                                    setCompanyDetails(company)
                                }}>
                                    See Details
                                </Button>
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </Card.Footer>
                        </Card>
                    </Col>) : <Card>
                        <Card.Header>
                            <Card.Title>
                                <h2> Ohhh! Something went wrong we will fix bugs as soon as possible </h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>}
                </Row>
            </Container>
        </section>
        {/* Companies in our Portal */}
        {/* Our goals */}
        <Container className ='mt-4 mb-4'>
            <Row className = "pt-4 pb-4">
                <Col className="mt-5 pt-4">
                    <h2 className='text-lead text-center '> Our goals</h2>
                    <p className='text-center mt-2 pb-4'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                    </p>
                </Col>
            </Row>
        </Container>
        {/* Our goals */}
        {/* Jobs */}
        <Container className='mt-5' fluid>
            <Card style={{ boxShadow: "-10px -10px 10px #b5b5b5" }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <h1> Recently Posted <strong>Jobs</strong></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={9}>
                            <Card>
                                <Card.Body>
                                    <div className={classes.root}>
                                        {allJobs.length > 0 ? allJobs.map(job => <Accordion className='mt-3' expanded="true" style={{ boxShadow: "10px 10px 10px #b5b5b5" }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}> {job.jobTitle} | {job.commpanyName}</Typography>
                                            </AccordionSummary>
                                            <div className='customDivider'></div>
                                            <AccordionDetails>
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            <Typography>
                                                                <Card>
                                                                    <Card.Body>
                                                                        <Card.Text>
                                                                            <b style={{ fontSize: 20, }}>Requriments </b>
                                                                        </Card.Text>
                                                                        <Card.Text style={{ fontSize: 20, }}>
                                                                            <b> Education </b> | {job.education}
                                                                        </Card.Text>
                                                                        <Card.Text style={{ fontSize: 20, }}>
                                                                            <b> Exprience </b>  | {job.exprience}
                                                                        </Card.Text>
                                                                        <Card.Text style={{ fontSize: 20, }}>
                                                                            <b > Skils </b> | {job.reqSkills}
                                                                        </Card.Text>
                                                                    </Card.Body>
                                                                    <Card.Footer>
                                                                        <Link to='#' className='btn btn-success btn-block text-white' onClick={() => updateUserProfile({ jobId: job._id, companyName: job.commpanyName, reqEducation: job.education, reqExprience: job.exprience, reqSkill: job.reqSkills, jobTitle: job.jobTitle })}> Apply Now </Link>
                                                                    </Card.Footer>
                                                                </Card>
                                                            </Typography>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </AccordionDetails>
                                        </Accordion>) : <Card>
                                            <Card.Header className='bg-danger text-center text-white'>
                                                <Card.Title>
                                                    <h2> OPPS! Please Wait for JObs</h2>
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>}
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to='/allJobs' className='btn btn-block btn-info'> See All Jobs </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Ads />
                            <SideManu />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
        {/* Jobs */}
        {/* Recently join Students */}
        <section style={{ backgroundColor: "#fafafa" }}>
            <Container className='mt-5 pt-4'>
                <Row>
                    <Col>
                        <h4 className='text-center' style={{ fontWeight: "bold" }}> <s> Recently join Students</s></h4>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <h4 className='text-center' style={{ fontWeight: "bold", textDecoration: 'underline' }}>Recently join Skill full Students</h4>
                    </Col>
                </Row>
            </Container>
            <StudentSlider />
        </section>
        {/* Recently join Students */}
        {/* Review Section */}
        <section className='forReview'>
            <Container className='pt-5 pb-3'>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <h2 style={{ color: "rgb(14, 232, 207)", fontSize: 40, fontWeight: '900', textDecoration: 'underline' }} className='text-center'> Students Reviews </h2>
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
                            <Row className='pt-5 mt-2'>
                                <Col lg={8}>
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
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* Review Section */}
        {/* Last SigninPart */}
        {localStorage.getItem("CI") ? <></> : <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <h2> Want to join with us Lets! Sign in</h2>
                </Col>
            </Row>
            <Row className='justify-content-center mt-4'>
                <Col lg={6}>
                    <a href='/Signin' className='text-center btn btn-success'> Click now</a>
                </Col>
            </Row>
        </Container>}
        {/* Last SigninPart */}
        <FooterPage />
    </>
}