import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, FormControl, Button, Spinner, Modal } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import AppSettings from '../AppSettings'
import ReactPaginate from 'react-paginate'
import "./paginationCss.css"
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function Jobs() {
    const classes = useStyles();
    const [allJobs, setAllJobs] = useState([])
    const [copyAllJobs, setCopyAllJobs] = useState([])
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    useEffect(() => {
        getAllJobsFromDb()
    }, [])
    const history = useHistory()
    const getAllJobsFromDb = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(AllJobs => {
                setAllJobs(AllJobs.data.jobs.reverse())
                setCopyAllJobs(AllJobs.data.jobs)
            }).catch(err => {
                console.log("Something went wrong ==> ", err)
            })
    }
    // const appliedJobsIndex = []
    //   Model for error
    // const showModel = () => {
    //     return <>
    //         <Modal
    //             show={show}
    //             onHide={handleClose}
    //             backdrop="static"
    //             keyboard={false}
    //         >
    //             <Modal.Header closeButton className='bg-danger text-white'>
    //                 <Modal.Title>Error In requesting for Jobs</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 I think you already apply for this job please see your profile than try again
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="success" onClick={handleClose}>
    //                     Close
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     </>
    // }
    //   Model for error

    const updateUserProfile = (obj) => {
        if (!localStorage.getItem("SI")) {
            history.push("/login", { err: "user are not Login" })
            return
        }
        setGetResponseFromServer(true)
        const id = localStorage.getItem("SI")
        const checkData = {
            jobId: obj.jobId
        }
        axios.post(`${AppSettings.SERVER_URL_PORT}/student/check-user-aleary-apply-for-this-job/${id}`, checkData)
            .then(success => {
                if (success.data.userData === null) {
                    const data = {
                        candidate: {
                            candidateInfo: id,
                            companyInfo: obj.companyInfo,
                            jobInfo: obj.jobId,
                            companyName: obj.companyName,
                            jobTitle: obj.jobTitle
                        }
                    }
                    axios.post(`${AppSettings.SERVER_URL_PORT}/student/apply/${id}`, obj)
                        .then(success => {
                            axios.post(`${AppSettings.SERVER_URL_PORT}/candidate/`, data)
                                .then(succ => {
                                    alert("Request Successfully Send to the company")
                                })
                        }).catch(err => {
                            console.log("Something went Wrong", err)
                        }).finally(() => setGetResponseFromServer(false))
                    return
                }
                alert("You already apply for this job")
                
            }).catch(err => {
                console.log("Something went Wrong in check jobs for Student", err)
            }).finally(() => setGetResponseFromServer(false))


    }
    function filterList(jobTitle) {
        let filterArray = copyAllJobs.filter((job) => job.jobTitle.includes(jobTitle))
        if (!filterArray) {
            setCopyAllJobs(allJobs)
        }
        setAllJobs(filterArray)
    }
    const jobsPerPage = 10;
    const pagesVisited = pageNumber * jobsPerPage

    const displayJobs = allJobs
        .slice(pagesVisited, pagesVisited + jobsPerPage)
        .map((job, index) => <Accordion className='mt-3 mb-3 pt-2 pb-2' style={{ boxShadow: "10px 10px 10px #b5b5b5" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading} > {job.jobTitle} | {job.commpanyName}</Typography>
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
                                            <b style={{ fontSize: 30, fontWeight: 'bold', textDecoration: 'underline' }}>Requriments </b>
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: 20, }}>
                                            <b> Education </b> | {job.education}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: 20, }}>
                                            <b> Exprience </b>  | {job.exprience}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: 20, }}>
                                            <b> Skils </b> | {job.reqSkills}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-5'>
                            <Typography>
                                {getResponseFromServer ? <>
                                    <Button variant="info" block disabled >
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </Button>
                                </> : <Button variant='info' style={{ borderRadius: '15px' }} block onClick={() => updateUserProfile(
                                    {
                                        jobId: job._id,
                                        companyName: job.commpanyName,
                                        reqEducation: job.education,
                                        reqExprience: job.exprience,
                                        reqSkill: job.reqSkills,
                                        jobTitle: job.jobTitle,
                                        companyInfo: job.companyInfo,
                                        indexNum: index
                                    })}> Apply Now </Button>}

                            </Typography>
                        </Col>
                    </Row>
                </Container>
            </AccordionDetails>
        </Accordion >
        )
    const pageCount = Math.ceil(allJobs.length / jobsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return <>
        <Container>
            <Row className='mt-4 '>
                <Col className='mb-5'>
                    <Form>
                        <FormControl style={{ borderWidth: '5px', borderRadius: '20px', borderColor: '#a6aba6', boxShadow: '5px 5px 5px #b5b5b5' }} type="text" placeholder="Search By Job Title" className="mr-lg-2 pt-4 pb-4" onChange={(e) => { filterList(e.target.value) }} />
                    </Form>
                </Col>
            </Row>
        </Container>
        <div className={classes.root}>
            {allJobs.length > 0 ? <>
                {displayJobs}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationsButtons"}
                    activeClassName={"paginationActive"}
                />
            </>
                : <Card className='mt-3'>
                    <Card.Header className='bg-danger text-center text-white'>
                        <Card.Title>
                            <h2 className='lead'> OPPS! Please Wait for Jobs</h2>
                        </Card.Title>
                    </Card.Header>
                </Card>}
        </div>
    </>
}