import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
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
export default function ActionsAginstPost() {
    const classes = useStyles();
    const [appliedCandidates, setAppliedCandidates] = useState([])
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const getResponseAgainstJobs = () => {
        const id = localStorage.getItem("CI")
        axios.get(`${AppSettings.SERVER_URL_PORT}/candidate/${id}`)
            .then(succ => {
                setAppliedCandidates(succ.data.details.reverse())
                console.log(succ.data.details)
            }).catch(err => {
                console.log("Something went Wrong", err)
            })
    }
    useEffect(() => {
        getResponseAgainstJobs()
    }, [])
    const delSpecificCandidate = (id) => {
        setGetResponseFromServer(true)
        axios.get(`${AppSettings.SERVER_URL_PORT}/candidate/delete/${id}`)
            .then(succ => {
                if (succ.status) {
                    getResponseAgainstJobs()
                }
            }).catch(err => {
                alert(err.message)
            }).finally(() => setGetResponseFromServer(false))
    }
    const appliedCandidatesPerPage = 5;
    const pagesVisited = pageNumber * appliedCandidatesPerPage
    
    if (appliedCandidates && appliedCandidates.length > 0 ) {
        var appliedCandiatesList = appliedCandidates
            .slice(pagesVisited, pagesVisited + appliedCandidatesPerPage)
            .map(candidate => <Accordion className='mt-3'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}> {candidate.jobTitle} | {candidate.companyName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <Typography>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text> {candidate.candidateInfo.fName} { } {candidate.candidateInfo.lName} Apply for this Job </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Typography>
                            </Col>
                            <Col lg={3} className='mt-2'>
                                <Typography>
                                    <Link to={
                                        {
                                            pathname: '/candidateProfile',
                                            userInformation: candidate.candidateInfo,
                                            jobTitle: candidate.jobTitle,
                                        }
                                    } className='btn btn-secondary text-white'> View his Profile </Link>
                                </Typography>
                            </Col>
                            <Col lg={3} className='mt-2'>
                                {getResponseFromServer ? <>
                                    <Button variant="danger" disabled >
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </Button>
                                </> : <Button variant="danger" active onClick={() => delSpecificCandidate(candidate._id)}>
                                    Delete Request
                                </Button>}

                            </Col>
                        </Row>
                    </Container>
                </AccordionDetails>
            </Accordion>)
    }
    const pageCount = Math.ceil(appliedCandidates.length / appliedCandidatesPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return <>
        <div className={classes.root}>
            {appliedCandidates && appliedCandidates.length > 0 ? <>
                {appliedCandiatesList}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationsButtons"}
                    activeClassName={"paginationActive"}
                />
            </>: <Card>
                    <Card.Header className ='bg-danger text-white text-center'>
                        <Card.Title>
                            <Card.Text>
                                <h2 className ='lead'>For Now no one apply For this jobs</h2>
                            </Card.Text>
                        </Card.Title>
                    </Card.Header>
                </Card>}
        </div>


    </>
}
