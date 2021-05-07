import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Col, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import AppSetting from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
import "./alerts.css"
export default function ComapnySignUpForm() {
    let city = ["Karachi", "Lahore", "Islamabad", "Punjab", "Peshawar", "KPK", "Mumbai", "Dehli", "PunjabInd", "Tokyo"]
    let coutries = ["Pakistan", "India", "Chaina"]
    let cetagory = ["IT", "Textile", "Agriculture", "Media", "Educational", "Medical", "Transportations"]
    let [getResponseFromServer, setGetResponseFromServer] = useState(false)
    let [companyName, setCompanyName] = useState('')
    let [companyEmail, setCompanyEmail] = useState('')
    let [companyOwnerName, setCompanyOwnerName] = useState('')
    let [companyCountry, setCompanyCountry] = useState(' ')
    let [companyCity, setCompanyCity] = useState(' ')
    let [companyCetagory, setCompanyCetagory] = useState(' ')
    let [password, setPassword] = useState('')
    let [rePassword, setRePassword] = useState('')
    const history = useHistory()
    const registerNewCompany = (e) => {
        e.preventDefault();
        setGetResponseFromServer(true)
        let forName = /^[A-Za-z .0-9]{3,}$/
        let forPwd = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/ // pwd contain atleast one special character
        let forCompanyOwnerName = /^[A-Za-z. ]{3,}$/ // Regex form mobile number 
        let forEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
        if (!(companyName && companyEmail && companyOwnerName && companyCountry && companyCity && companyCetagory && password && rePassword)) {
            document.getElementById("gernalErr").style.display = 'block'
            document.getElementById("nameErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'none'
            document.getElementById("rePwdErr").style.display = 'none'
            document.getElementById("companyOwnerName").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forPwd.test(password)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("nameErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'block'
            document.getElementById("rePwdErr").style.display = 'none'
            document.getElementById("companyOwnerName").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (password !== rePassword) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("nameErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'none'
            document.getElementById("rePwdErr").style.display = 'block'
            document.getElementById("companyOwnerName").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forEmail.test(companyEmail)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("nameErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'block'
            document.getElementById("pwdErr").style.display = 'none'
            document.getElementById("rePwdErr").style.display = 'none'
            document.getElementById("companyOwnerName").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forName.test(companyName)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("nameErr").style.display = 'block'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'none'
            document.getElementById("rePwdErr").style.display = 'none'
            document.getElementById("companyOwnerName").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forCompanyOwnerName.test(companyOwnerName)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("nameErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'none'
            document.getElementById("rePwdErr").style.display = 'none'
            document.getElementById("companyOwnerName").style.display = 'block'
            setGetResponseFromServer(false)
            return
        }
        document.getElementById("gernalErr").style.display = 'none'
        document.getElementById("nameErr").style.display = 'none'
        document.getElementById("emailErr").style.display = 'none'
        document.getElementById("pwdErr").style.display = 'none'
        document.getElementById("rePwdErr").style.display = 'none'
        document.getElementById("companyOwnerName").style.display = 'none'
        let data = {
            companyData: { companyName, companyEmail, companyOwnerName, companyCountry, companyCity, companyCetagory, password }
        }
        axios.post(`${AppSetting.SERVER_URL_PORT}/company/add-new`, data)
            .then(succ => {
                    history.push("/thanksUser", {status: true})
                    cleanField()
            })
            .catch(err => {
                console.log("Something went wrong ==>", err)
            }).finally(() => setGetResponseFromServer(false))
    }
    function cleanField() {
        setCompanyName('')
        setCompanyEmail('')
        setCompanyOwnerName('')
        setCompanyCountry('')
        setCompanyCity('')
        setCompanyCetagory('')
        setPassword('')
        setRePassword('')
    }

    return <>
        <div id='gernalErr' className='display-gernal-err-for-company-signin-form'>
            <Alert variant='danger'>
                All field must be field
            </Alert>
        </div>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Company Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Company Email Address" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} required />
                </Form.Group>
            </Form.Row>
            <div id='nameErr' className='display-specific-err-for-company-signin-form '>
                <Alert variant='danger'>
                    Invalid company Name
                </Alert>
            </div>
            <div id='emailErr' className='display-specific-err-for-company-signin-form '>
                <Alert variant='danger'>
                    Invalid email address
                </Alert>
            </div>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Owner Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Owner Name" value={companyOwnerName} onChange={(e) => setCompanyOwnerName(e.target.value)} required />
            </Form.Group>
            <div id='companyOwnerName' className='display-specific-err-for-company-signin-form '>
                <Alert variant='danger'>
                    Invalid  company owner name
                </Alert>
            </div>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company Country</Form.Label>
                <Form.Control as="select" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} required >
                    <option selected value='#' > Chose One</option>
                    <hr />
                    {coutries.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company City</Form.Label>
                <Form.Control as="select" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} required>
                    <option selected value='#'> Chose One</option>
                    <hr />
                    {city.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company Cetagory</Form.Label>
                <Form.Control as="select" value={companyCetagory} onChange={(e) => setCompanyCetagory(e.target.value)} required>
                    <option selected value='#'> Chose One</option>
                    <hr />
                    {cetagory.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <div id='pwdErr' className='display-specific-err-for-company-signin-form '>
                <Alert variant='danger'>
                    Invalid password || password must contain one special character and password length must be 6 alphabet 
                </Alert>
            </div>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Conform Password</Form.Label>
                <Form.Control type="password" placeholder=" Repeat Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
            </Form.Group>
            <div id='rePwdErr' className='display-specific-err-for-company-signin-form '>
                <Alert variant='danger'>
                   Repeat Password must be match with password 
                </Alert>
            </div>
            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            {getResponseFromServer ? <Button variant="primary" className='btn-block' disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
            </Button> :
                <Button variant="info" type="submit" onClick={registerNewCompany} block>
                    Register Your Company
                </Button>}
        </Form>








    </>
}
