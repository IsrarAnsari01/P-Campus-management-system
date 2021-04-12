import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import AppSetting from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
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
        if (password !== rePassword) {
            alert("Password Does not match plz try again")
            return
        }
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
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Company Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Company Email Address" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Company Owner Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Company Owner Name" value={companyOwnerName} onChange={(e) => setCompanyOwnerName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company Country</Form.Label>
                <Form.Control as="select" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)}>
                    <option selected value='#' > Chose One</option>
                    <hr />
                    {coutries.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company City</Form.Label>
                <Form.Control as="select" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)}>
                    <option selected value='#'> Chose One</option>
                    <hr />
                    {city.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
                <Form.Label>Enter Company Cetagory</Form.Label>
                <Form.Control as="select" value={companyCetagory} onChange={(e) => setCompanyCetagory(e.target.value)}>
                    <option selected value='#'> Chose One</option>
                    <hr />
                    {cetagory.map(c => <option value={c}> {c}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Conform Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
            </Form.Group>
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
                <Button variant="primary" type="submit" onClick={registerNewCompany}>
                    Register Your Company
                </Button>}
        </Form>








    </>
}
