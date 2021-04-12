import {useState, useEffect} from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import { Card } from 'react-bootstrap'
import axios from 'axios'
import AppSettings from '../AppSettings'
export default function SideManu() {
    useEffect(() => {
        getAllCompanies()
        getAllStudents()
        getAllJobs()
    }, [])
    const [totalCompanies , setTotalCompaines] = useState(0)
    const [totalJobs , setTotalJobs] = useState(0)
    const [totalStudent , setTotalStudents] = useState(0)
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
        <Card className='bg-secondary text-white'>
            <Card.Body>
                <Card.Title><BusinessIcon /> Total Companies</Card.Title>
                <Card.Text>
                    <p>We have more then <b>{totalCompanies}</b> resgisterd company in our web</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className='bg-primary text-white mt-5'>
            <Card.Body>
                <Card.Title> <PeopleIcon /> Total Students</Card.Title>
                <Card.Text>
                    <p>We have more then <b>{totalStudent}</b> resgisterd Student in our web</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className='bg-info text-white mt-5'>
            <Card.Body>
                <Card.Title> <WorkIcon /> Total Jobs</Card.Title>
                <Card.Text>
                    <p>Currently more then <b>{totalJobs}</b> Jobs Posted in Our web </p>
                </Card.Text>
            </Card.Body>
        </Card>

    </>
}
