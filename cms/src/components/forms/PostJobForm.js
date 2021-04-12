import { useEffect, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
export default function PostJobForm() {
    let education = ["Matriculation", "Intermediate", "Bechelor", "Master", "M.Phill", "PHD", "No Degree Requried"]
    let exprience = ["Freshers", "6 months", "1 year", "2 Years", "5 Year", "More than 5 years"]
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("CI")) {
            history.push("/companyLogIn", { err: "Company not Login" })
            return
        }
    }, [])
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [jobTitle, setJobTitle] = useState('')
    const [jobPosition, setJobPosition] = useState('')
    const [reqSkills, setReqSkills] = useState('')
    const [reqEducation, setReqEducation] = useState('')
    const [reqExprience, setReqExprience] = useState('')
    const [salary, setSalary] = useState('')
    const [commpanyName, setCompanyName] = useState('')
    const [companyLocation, setCompanyLocation] = useState('')
    const companyInfo = localStorage.getItem("CI")
    const postNewJob = (e) => {
        e.preventDefault();
        setGetResponseFromServer(true)
        let data = {
            jobData: {
                jobTitle, jobPosition, reqSkills, education: reqEducation, exprience: reqExprience, commpanyName, companyLocation, salary, companyInfo
            }
        }
        axios.post(`${AppSettings.SERVER_URL_PORT}/job/add-new`, data)
            .then(res => {
                cleanFields();
                alert("Successfully uploaded new Job")
            })
            .catch(err => {
                console.log("Unable to post new Job ==>", err)
                alert("Something went wrong try Again", err)
            }).finally(() => setGetResponseFromServer(false))
    }
    const cleanFields = () => {
        setJobTitle('')
        setJobPosition('')
        setReqSkills("")
        setReqEducation('')
        setReqExprience('')
        setSalary('')
        setCompanyName('')
        setCompanyLocation('')
    }
    return <>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label> Job Position </Form.Label>
                    <Form.Control type="text" placeholder="Enter Job position" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Requried Skills | Sperated By Comma </Form.Label>
                <Form.Control type="text" placeholder="Enter Requried Skills" value={reqSkills} onChange={(e) => setReqSkills(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Name </Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" value={commpanyName} onChange={(e) => setCompanyName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Location | Sperated By Comma </Form.Label>
                <Form.Control type="text" placeholder="Enter Company Location" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Minimum Education</Form.Label>
                <Form.Control as="select" defaultValue="null" value={reqEducation} onChange={(e) => setReqEducation(e.target.value)}>
                    <hr />
                    <option value='null'> Chose One</option>
                    {education.map(e => <option value={e}> {e}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Minimum Exprience</Form.Label>
                <Form.Control as="select" defaultValue="null" value={reqExprience} onChange={(e) => setReqExprience(e.target.value)}>
                    <option value='null'> Chose One</option>
                    <hr />
                    {exprience.map(e => <option value={e}> {e}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Expected Salary</Form.Label>
                <Form.Control type="text" placeholder="Candidate Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </Form.Group>
            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            {getResponseFromServer ? <Button className='btn btn-primary' disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
            </Button> : <Button variant="primary" type="submit" onClick={postNewJob}>
                Register Your Job
            </Button>}
        </Form>
    </>
}
