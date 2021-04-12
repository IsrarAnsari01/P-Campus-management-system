import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import Ads from '../company/Ads'
import axios from 'axios'
import AppSettings from '../AppSettings'
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'react-bootstrap/Spinner'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
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
export default function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({})
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [appliedJobsList, setAppliedJobsList] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        if (!localStorage.getItem("SI")) {
            history.push("/login", { err: "Student not login" })
            return
        }
        getUserDetails();
    }, [])
    const studentId = localStorage.getItem("SI")
    const getUserDetails = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student/findSpecfic/${studentId}`)
            .then(userfromDb => {
                setUser(userfromDb.data.student)
                setAppliedJobsList(userfromDb.data.student.appliedJobs.reverse())
            })
            .catch(err => {
                console.log("Unable to find user err ==> ", err)
            })
    }
    const delteReq = (id) => {
        setGetResponseFromServer(true)
        let data = {
            id
        }
        axios.post(`${AppSettings.SERVER_URL_PORT}/student/pull/${studentId}`, data)
            .then(success => {

            }).catch(err => {
                console.log("err in updating object ", err)
            }).finally(() => {
                axios.get(`${AppSettings.SERVER_URL_PORT}/student/findSpecfic/${studentId}`)
                    .then(userfromDb => {
                        setAppliedJobsList(userfromDb.data.student.appliedJobs.reverse())
                        setGetResponseFromServer(false)
                    })
                    .catch(err => {
                        console.log("Unable to find user err ==> ", err)
                    })


            })
    }
    const updateUserInfo = () => {
        history.push({
            pathname: '/updateUser',
            state: { userInformation: { fName: user.fName, lName: user.lName, education: user.education, email: user.email, exprience: user.exprience, skills: user.skills } }
        })
    }
    const appliedJobsPerPage = 5;
    const pagesVisited = pageNumber * appliedJobsPerPage
    const displayAppliedJobs = appliedJobsList
        .slice(pagesVisited, pagesVisited + appliedJobsPerPage)
        .map(job => <div className={classes.root}>
            <Accordion className='mt-3'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}> {job.jobTitle} | {job.companyName} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Row>
                            <Col lg={9}>
                                <Typography>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>
                                                <h4 className='lead'> <b>Requirements</b> </h4>
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <b> Education </b> | {job.reqEducation}
                                            </Card.Text>
                                            <Card.Text>
                                                <b> Exprience </b>  | {job.reqExprience}
                                            </Card.Text>
                                            <Card.Text>
                                                <b> Skils </b> | {job.reqSkill}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Typography>
                            </Col>
                            <Col lg={3} className='mt-5'>
                                <Typography>
                                    {getResponseFromServer ? <Button variant="danger" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </Button> : <Button variant="danger" onClick={() => delteReq(job.jobId)}> Cancel Request </Button>}

                                </Typography>
                            </Col>
                        </Row>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>)
    const pageCount = Math.ceil(appliedJobsList.length / appliedJobsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return <>
        <NavBar />
        <Container>
            <Row className='mt-4'>
                <Col lg={10}>
                    <Card>
                        <Card.Header className='bg-danger text-white'>
                            <Card.Title className='text-center'>
                                <h2> Welcome to CMS | Dear {user.fName}</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card>
                        <Button variant="success" onClick={updateUserInfo}> Update Your Information</Button>
                    </Card>

                </Col>
            </Row>
        </Container>
        <Container fluid>
            <Row className='mt-5'>
                <Col lg={9}>
                    <Card>
                        <Card.Header >
                            <h2> <i>{user.fName} {' '} {user.lName} </i> </h2>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h2 className='lead'> Name | {user.fName} {' '} {user.lName} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Education | {user.education} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Email  | {user.email} </h2>
                            </Card.Text>
                            <Card.Text>
                                <h2 className='lead'> Exprience | {user.exprience} </h2>
                            </Card.Text>
                            <hr />
                            <Card.Text>
                                <h2 className='lead'> Skills | {user.skills} </h2>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card>
                                <Card.Header className='bg-danger text-white'>
                                    <Card.Title>
                                        <h4 className='text-center'> List Of Apply Jobs </h4>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {appliedJobsList.length === 0 ?
                                        <Card>
                                            <Card.Header className='bg-danger text-white text-center'>
                                                <Card.Title>
                                                    <h2 className='lead'> Current Student not applied for any job</h2></Card.Title>
                                            </Card.Header>
                                        </Card> : <>
                                            {displayAppliedJobs}
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
                                </Card.Body>
                            </Card>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col className={3}>
                    <Ads />
                </Col>
            </Row>
        </Container>
        <FooterPage />




    </>
}
