import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import AppSettings from '../AppSettings'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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



export default function ListOfAppliedJobs() {
    const classes = useStyles();
    const [jobPostedByThisCompany, setJobPostedByThisCompany] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        const companyInfo = localStorage.getItem("CI")
        getThisCompanyJob(companyInfo)
    }, [])

    const getThisCompanyJob = (id) => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/findCompanyJob/${id}`)
            .then(jobs => {
                setJobPostedByThisCompany(jobs.data.jobs.reverse())
            }).catch(err => {
                console.log("Something went wrong ==> ", err)
            })
    }
    const deleteThisPost = (id) => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/${id}`)
            .then(succ => {
                axios.get(`${AppSettings.SERVER_URL_PORT}/candidate/delete-specfic-job-candidates/${id}`)
                    .then(succ => {
                        axios.get(`${AppSettings.SERVER_URL_PORT}/student/remove-deleted-job-Information/${id}`)
                            .then(succ => {
                                if (succ.status) {
                                    getThisCompanyJob()
                                    return
                                }

                            })
                    })
            })
            .catch(Err => {
                alert("Error in deleting this job ==> ", Err)
            })
    }

    const jobPostedByThisCompanyPerPage = 5;
    const pagesVisited = pageNumber * jobPostedByThisCompanyPerPage
    const displayPostedJobs = jobPostedByThisCompany
        .slice(pagesVisited, pagesVisited + jobPostedByThisCompanyPerPage)
        .map(job => <Accordion className='mt-3'>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}> {job.jobTitle} | {job.companyInfo.companyName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container>
                    <Row>
                        <Col lg={10}>
                            <Typography>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Requirements
                                        </Card.Title>
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
                                <Button  className='btn btn-danger text-white' onClick={() => deleteThisPost(job._id)}> Delete Job </Button>
                            </Typography>
                        </Col>
                    </Row>
                </Container>
            </AccordionDetails>
        </Accordion>)
    const pageCount = Math.ceil(jobPostedByThisCompany.length / jobPostedByThisCompanyPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return <>
        <div className={classes.root}>

            {jobPostedByThisCompany.lenght == 0 ?
                <>
                    <Card>
                        <Card.Header className='bg-danger text-center text-white'>
                            <Card.Title >
                                <h2 className='lead'> Currently you are not post any job </h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </> : <>
                    {displayPostedJobs}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationsButtons"}
                        activeClassName={"paginationActive"}
                    />
                </>

            }
        </div>
    </>
}
