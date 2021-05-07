import { Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import { Card } from 'react-bootstrap'
import axios from 'axios'
import AppSettings from '../AppSettings'
import "./homepage.css"
export default function SliderForFrontPage() {
    useEffect(() => {
        getAllCompanies()
        getAllStudents()
        getAllJobs()
    }, [])
    const [totalCompanies, setTotalCompaines] = useState(0)
    const [totalJobs, setTotalJobs] = useState(0)
    const [totalStudent, setTotalStudents] = useState(0)
    const getAllCompanies = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company/`)
            .then(companies => {
                setTotalCompaines(companies.data.compines.length)
            }).catch(err => {
                console.log("Error in Fetching Compines")
            })
    }
    const getAllJobs = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(companies => {
                setTotalJobs(companies.data.jobs.length)
            }).catch(err => {
                console.log("Error in Fetching Compines")
            })
    }
    const getAllStudents = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student/`)
            .then(companies => {
                setTotalStudents(companies.data.students.length)
            }).catch(err => {
                console.log("Error in Fetching Compines")
            })
    }

    return <>
        <Carousel>
            <Carousel.Item interval = {5000}>
                <Card style={{ backgroundColor: '#2f3233', boxShadow: "20px 10px 20px #33302c" }} className='mb-5'>
                    <Card.Header className='text-white ml-5 pl-5'>
                        <Card.Title className='text-center ml-5 pl-5'>
                            <div className='test ml-5'>
                                <BusinessIcon className='text-white text-center mt-4' style={{ fontSize: 80 }} />
                            </div>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className='text-center text-white' style={{ fontSize: 40 }}><span style={{ color: "rgb(14, 232, 207)" }}>Total</span> Companies</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text className='text-center text-white mt-4'>
                            <h3>
                                We have more then <span style={{ color: "rgb(14, 232, 207)", fontSize: 35 }}>{totalCompanies}</span> resgisterd company in our web
                            </h3>
                        </Card.Text>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
            <Carousel.Item interval = {5000}>
                <Card style={{ backgroundColor: '#2f3233', boxShadow: "20px 10px 20px #33302c" }} className='mb-5'>
                    <Card.Header className='text-white ml-5 pl-5'>
                        <Card.Title className='text-center ml-5 pl-5'>
                            <div className='test ml-5'>
                                <PeopleIcon className='text-white text-center mt-4' style={{ fontSize: 80 }} />
                            </div>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className='text-center text-white' style={{ fontSize: 40 }}>Total <span style={{ color: "rgb(14, 232, 207)" }}>Students</span></Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text className='text-center text-white mt-4'>
                            <h3>
                                We have more then <span style={{ color: "rgb(14, 232, 207)", fontSize: 35 }}>{totalStudent}</span> resgisterd Student in our web
                            </h3>
                        </Card.Text>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
            <Carousel.Item interval = {5000}>
                <Card style={{ backgroundColor: '#2f3233', boxShadow: "20px 10px 20px #33302c" }} className='mb-5'>
                    <Card.Header className='text-white ml-5 pl-5'>
                        <Card.Title className='text-center ml-5 pl-5'>
                            <div className='test ml-5'>
                                <WorkIcon className='text-white text-center mt-4' style={{ fontSize: 80 }} />
                            </div>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className='text-center text-white' style={{ fontSize: 40 }}><span style={{ color: "rgb(14, 232, 207)" }}>Total</span> Jobs</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text className='text-center text-white mt-4'>
                            <h3>
                                We have more then <span style={{ color: "rgb(14, 232, 207)", fontSize: 35 }}>{totalJobs}</span> resgisterd Jobs in our web
                            </h3>
                        </Card.Text>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        </Carousel>





    </>
};
