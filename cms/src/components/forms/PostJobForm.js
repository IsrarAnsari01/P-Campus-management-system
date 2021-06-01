import { useEffect, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AppSettings from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
import { Alert } from 'react-bootstrap'
export default function PostJobForm() {
    let education = ["Matriculation", "Intermediate", "Bechelor", "Master", "M.Phill", "PHD", "No Degree Requried"]
    let exprience = ["Freshers", "6 months", "1 year", "2 Years", "5 Year", "More than 5 years"]
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("CI")) {
            history.push("/login", { err: "Company not Login" })
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
        let forJobTitle = /^[A-Za-z0-9. \/]{2,}$/
        let forJobPosition = /^[A-Za-z ]{2,}$/
        let forSalary = /^[0-9., ]{3,}$/
        let forName = /^[A-Za-z .0-9]{3,}$/
        let forSkill = /^[A-Za-z!@#$%+,:() ]{1,}$/
        let forCompanyLoacation = /^[A-Za-z, !@#$%^&*0-9.-]{2,}$/
        if (!(jobTitle && jobPosition && reqSkills && reqEducation && reqExprience && salary && commpanyName && companyLocation)) {
            document.getElementById("gernalErr").style.display = 'block'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forJobTitle.test(jobTitle)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'block'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forJobPosition.test(jobPosition)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'block'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forSkill.test(reqSkills)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'block'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forSalary.test(salary)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'block'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forName.test(commpanyName)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'block'
            document.getElementById("companyLocationErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forCompanyLoacation.test(companyLocation)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("jobTitle").style.display = 'none'
            document.getElementById("jobPosition").style.display = 'none'
            document.getElementById("skillErr").style.display = 'none'
            document.getElementById("salaryErr").style.display = 'none'
            document.getElementById("companyNameErr").style.display = 'none'
            document.getElementById("companyLocationErr").style.display = 'block'
            setGetResponseFromServer(false)
            return
        }
        document.getElementById("gernalErr").style.display = 'none'
        document.getElementById("jobTitle").style.display = 'none'
        document.getElementById("jobPosition").style.display = 'none'
        document.getElementById("skillErr").style.display = 'none'
        document.getElementById("salaryErr").style.display = 'none'
        document.getElementById("companyNameErr").style.display = 'none'
        document.getElementById("companyLocationErr").style.display = 'none'
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
        <div id='gernalErr' className='display-gernal-err-for-company-job-form'>
            <Alert variant='danger'>
                All field must be field
            </Alert>
        </div>
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
            <div id='jobTitle' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter Valid job Title
                </Alert>
            </div>
            <div id='jobPosition' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter Valid job Position
                </Alert>
            </div>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Requried Skills | Sperated By Comma </Form.Label>
                <Form.Control type="text" placeholder="Enter Requried Skills" value={reqSkills} onChange={(e) => setReqSkills(e.target.value)} />
            </Form.Group>
            <div id='skillErr' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter Valid skills for candidate
                </Alert>
            </div>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Name </Form.Label>
                <Form.Control type="text" placeholder="Enter Company Name" value={commpanyName} onChange={(e) => setCompanyName(e.target.value)} />
            </Form.Group>
            <div id='companyNameErr' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter Valid company name
                </Alert>
            </div>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Location | Sperated By Comma </Form.Label>
                <Form.Control type="text" placeholder="Enter Company Location" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} />
            </Form.Group>
            <div id='companyLocationErr' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter Valid company location
                </Alert>
            </div>
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
            <div id='salaryErr' className='display-specific-err-for-company-job-form'>
                <Alert variant='danger'>
                    Enter valid candidate Salary
                </Alert>
            </div>
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
