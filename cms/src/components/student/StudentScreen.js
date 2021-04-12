import { Container, Row, Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
import SideManu from '../homePage/SideManu'
import Slider from '../homePage/Slider'
import UserSignUpForm from '../forms/UserSignUpForm'
import FooterPage from '../footer/FooterPage'
import './StudentScreenStyle.css';
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
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function StudentScreen() {
    const classes = useStyles();
    const [allJobs, setAllJobs] = useState([])
    useEffect(() => {
        getAllJobsFromDb()
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
    return <>
        <NavBar />
        <Image style={{ width: "100vw", height: "100vh" }} id='imageStyle' src="https://images.unsplash.com/photo-1507537509458-b8312d35a233?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" fluid />
        <Container fluid>
            <Row>
                <Col>
                    <Card className='mt-4'>
                        <Card.Header className='bg-dark text-light'>
                            <Card.Title className='text-center'>
                                <h2 className='lead'> Welcome to Compus Management System! Let Us help you to find a JOB    </h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col lg={9}>
                    <Card>
                        <Card.Header className='bg-dark text-white text-center '>
                            <Card.Title className='pt-2'>
                                <h2> See latest Jobs Posted By Repotated Companies </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className='mt-4'>
                            <div className={classes.root}>
                                {allJobs.length > 0 ? allJobs.map(job => <Accordion className='mt-3'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}> {job.jobTitle} | {job.commpanyName}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Container>
                                            <Row>
                                                <Col lg={10}>
                                                    <Typography>
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Text>
                                                                    <b>Requriments </b>
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <b> Education </b> | {job.education}
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <b> Exprience </b>  | {job.exprience}
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <b> Skils </b> | {job.reqSkills}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Typography>
                                                </Col>
                                                <Col lg={2} className='mt-5'>
                                                    <Typography>
                                                        <Link to='#' className='btn btn-dark text-white' onClick={() => updateUserProfile({ jobId: job._id, companyName: job.commpanyName, reqEducation: job.education, reqExprience: job.exprience, reqSkill: job.reqSkills, jobTitle: job.jobTitle })}> Apply Now </Link>
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
                            <Link to='/allJobs' className='btn btn-block btn-dark'> See All Jobs </Link>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col className='mt-5'>
                    <SideManu />
                </Col>
            </Row>
            {localStorage.getItem("CI") ? <Row className='mt-5'>
                <Col>
                    <Card>
                        <Slider />
                    </Card>
                </Col>
            </Row> : <>
                <Row className='mt-5'>
                    <Col>
                        <Card>
                            <Card.Header className='bg-dark text-white pt-2'>
                                <Card.Title>
                                    <h4>Wants to Apply In this Jobs Lets Sign In First </h4>
                                </Card.Title>
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col lg={9}>
                        <Card>
                            <Card.Body>
                                <UserSignUpForm />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Ads />
                    </Col>
                </Row>
            </>}

        </Container>
        <FooterPage />
    </>
}