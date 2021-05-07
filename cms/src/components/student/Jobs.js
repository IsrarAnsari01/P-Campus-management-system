import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, FormControl, Button, Spinner } from 'react-bootstrap'
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
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function Jobs() {
    const classes = useStyles();
    const [allJobs, setAllJobs] = useState([])
    const [copyAllJobs, setCopyAllJobs] = useState([])
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
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
    const appliedJobsIndex = []
    const updateUserProfile = (obj) => {
        if (!localStorage.getItem("SI")) {
            history.push("/login", { err: "user are not Login" })
            return
        }
        setGetResponseFromServer(true)
        if (appliedJobsIndex.length > 0) {
            let matchingIndex = appliedJobsIndex.includes(obj.indexNum)
            if (matchingIndex) {
                alert("Dear User you already Apply for this job")
                return
            }
        }
        appliedJobsIndex.push(obj.indexNum)
        const id = localStorage.getItem("SI")
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

    }
    function filterList(jobTitle) {
        let filterArray = copyAllJobs.filter((job) => job.jobTitle.includes(jobTitle))
        if (!filterArray) {
            setCopyAllJobs(allJobs)
        }
        setAllJobs(filterArray)
    }
    const jobsPerPage = 20;
    const pagesVisited = pageNumber * jobsPerPage

    const displayJobs = allJobs
        .slice(pagesVisited, pagesVisited + jobsPerPage)
        .map((job, index) => <Accordion className='mt-3'>
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
                                {getResponseFromServer ? <>
                                    <Button variant="dark" disabled >
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </Button>
                                </> : <Button variant='dark' onClick={() => updateUserProfile(
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
        </Accordion>
        )
    const pageCount = Math.ceil(allJobs.length / jobsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return <>
        <Container>
            <Row>
                <Col className='mt-4'>
                    <Card>
                        <Card.Header className='bg-secondary'>
                            <Form>
                                <FormControl type="text" placeholder="Search By Job Title" className=" mr-lg-2" onChange={(e) => { filterList(e.target.value) }} />
                            </Form>
                        </Card.Header>
                    </Card>
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