import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function ListOfAppliedJobs(props) {
    let appliedJobsofUser = props.appliedJobs
    let [userAppliedJobs, setUserAppliedJobs] = useState([])
    useEffect(() => {
        setUserAppliedJobs(appliedJobsofUser)
    },[])
    const classes = useStyles();
    // const studentId = localStorage.getItem("SI") 
    // const delteReq = (id) => {
    //     axios.post(`${AppSettings.SERVER_URL_PORT}/student/pull/:id`)
    // }
    return <>
        {userAppliedJobs.length === 0 ?
            <Card>
                <Card.Header className='bg-danger text-white text-center'>
                    <Card.Title>
                        <h2 className='lead'> Current Student not applied for any job</h2></Card.Title>
                </Card.Header>
            </Card> :
            userAppliedJobs.map(job => <div className={classes.root}>
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
                                <Col lg={10}>
                                    <Typography>
                                        <Card>
                                            <Card.Header>
                                                <Card.Title>
                                                    <h4 className ='lead'> <b>Requirements</b> </h4>
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
                                <Col lg={2} className='mt-5'>
                                    <Typography>
                                        <Link to='#' className='btn btn-danger text-white' onClick = {() => delteReq(job._id)}> Cancel Request </Link>
                                    </Typography>
                                </Col>
                            </Row>
                        </Container>
                    </AccordionDetails>
                </Accordion> 
                </div>) }

    </>
}
