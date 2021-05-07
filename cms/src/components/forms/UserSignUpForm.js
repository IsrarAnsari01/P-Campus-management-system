import React, { useState } from "react";
import { Button, Form, Col, Alert, Card } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import AppSetting from '../AppSettings'
import "./alerts.css"
const UserSignUpForm = () => {
  const education = ["Matriculation", "Intermediate", "Bachelor", "Master", "M.Phill", "PHD"]
  const exprience = ["Freshers", "1 Year or less", "2 Years", "More then two years"]
  let [getResponseFromServer, setGetResponseFromServer] = useState(false)
  let [fName, setFName] = useState("")
  let [lName, setLName] = useState("")
  let [email, setEmail] = useState(null)
  let [skills, setSkills] = useState("")
  let [studentEducation, setStudentEducation] = useState("")
  let [studentExprience, setStudentExprience] = useState(" ")
  let [password, setPassword] = useState("")
  let [rePassword, setRePassword] = useState("")
  const history = useHistory();
  const saveNewStudent = (e) => {
    e.preventDefault();
    setGetResponseFromServer(true)
    let forName = /^[A-Za-z .]{3,30}$/
    let forPwd = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/ // pwd contain atleast one special character
    let forNumber = /^[0-9-]{6,14}$/ // Regex form mobile number 
    let forEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
    let forSkill = /^[A-Za-z!@#$%+, ]{1,}$/
    if (!(fName && lName && email && skills && studentEducation && studentExprience && password && rePassword)) {
      document.getElementById("gernalErr").style.display = 'block'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("pwdErr").style.display = 'none'
      document.getElementById("rePwdErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (!forPwd.test(password)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("pwdErr").style.display = 'block'
      document.getElementById("rePwdErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (password !== rePassword) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("pwdErr").style.display = 'none'
      document.getElementById("rePwdErr").style.display = 'block'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (!forName.test(fName) || !forName.test(lName)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'block'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("pwdErr").style.display = 'none'
      document.getElementById("rePwdErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (!forSkill.test(skills)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("pwdErr").style.display = 'none'
      document.getElementById("rePwdErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'block'
      setGetResponseFromServer(false)
      return
    } else if (!forEmail.test(email)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'block'
      document.getElementById("pwdErr").style.display = 'none'
      document.getElementById("rePwdErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    }
    document.getElementById("gernalErr").style.display = 'none'
    document.getElementById("nameErr").style.display = 'none'
    document.getElementById("emailErr").style.display = 'none'
    document.getElementById("pwdErr").style.display = 'none'
    document.getElementById("rePwdErr").style.display = 'none'
    document.getElementById("skillErr").style.display = 'none'
    const data = {
      userData: { fName, lName, email, skills, education: studentEducation, exprience: studentExprience, password, rePassword }
    }
    axios.post(`${AppSetting.SERVER_URL_PORT}/student/add-new`, data)
      .then(succ => {
        cleanField()
        history.push("/thanksUser", { status: true })
      })
      .catch(err => {
        if (err.message) {
          alert("Error in Submiting form Please Check the Form and Fill Again")
        }
      }).finally(() => setGetResponseFromServer(false))
}
function cleanField() {
  setFName('')
  setLName("")
  setEmail('')
  setSkills("")
  setStudentEducation('')
  setStudentExprience('')
  setPassword(" ")
  setRePassword("")
}

return <>
  <Card className='forForm'>
    <Card.Header className='bg-white'>
      <Card.Title className='text-center cardTitleForSignInIUser'> Sign In </Card.Title>
    </Card.Header>
    <Card.Body>
      <div id='gernalErr' className='display-gernal-err-for-student-signin-form'>
        <Alert variant='danger'>
          All field must be field
        </Alert>
      </div>
      <Form>
        <Form.Group controlId="formGridEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control type="text" placeholder="Enter you First Name" minLength='5' maxLength='20' value={fName} onChange={(e) => setFName(e.target.value)} required />
        </Form.Group>
        <div id='nameErr' className='display-pwd-err'>
          <Alert variant='danger'>
            Invalid UserName enter Right user name
          </Alert>
        </div>
        <Form.Group controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter you Last Name" minLength='5' maxLength='20' value={lName} onChange={(e) => setLName(e.target.value)} required />
        </Form.Group>
        <div id='nameErr' className='display-pwd-err'>
          <Alert variant='danger'>
            Invalid UserName enter Right user name
          </Alert>
        </div>
        <Form.Group controlId="formGridAddress2">
          <Form.Label> Email </Form.Label>
          <Form.Control type='email' placeholder="Enter Your Valid Email Address" required
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div id='emailErr' className='display-pwd-err'>
          <Alert variant='danger'>
            Invalid Email Address enter correct email address
          </Alert>
        </div>
        <Form.Group controlId="formGridAddress2">
          <Form.Label> Skils  </Form.Label>
          <Form.Control type='text' placeholder="Enter Your Skils and Sperated By comma " value={skills}
            onChange={(e) => setSkills(e.target.value)} required />
        </Form.Group>
        <div id='skillErr' className='display-pwd-err'>
          <Alert variant='danger'>
            You provide wrong skill information, Please enter right information
          </Alert>
        </div>
        <Form.Group controlId="formGridState">
          <Form.Label> Education </Form.Label>
          <Form.Control as="select" defaultValue="chose" value={studentEducation}
            onChange={(e) => setStudentEducation(e.target.value)} required>
            <option selected value="#">Choose any One .... </option>
            {education.map(e => <option value={e}> {e}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGridState">
          <Form.Label> Exprience </Form.Label>
          <Form.Control as="select" defaultValue="chose" value={studentExprience}
            onChange={(e) => setStudentExprience(e.target.value)} required>
            <option selected value="#">Choose any One </option>
            {exprience.map(e => <option value={e}> {e}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type='password' placeholder="Repeat Your Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
          </Form.Group>
        </Form.Row>
        <div id='pwdErr' className='display-pwd-err'>
          <Alert variant='danger'>
            Invalid Password! Password contain atleast one special charater || minimum length of password must be 6 characters
          </Alert>
        </div>
        <div id='rePwdErr' className='display-pwd-err'>
          <Alert variant='danger'>
            Repeat password should be match with password
          </Alert>
        </div>
        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Accept All Term and Condition" />
        </Form.Group>
        {getResponseFromServer ? <Button variant="dark" className='btn-block' disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button> : <Button variant="dark" className='btn-block' type="submit" onClick={saveNewStudent}>
          Submit
        </Button>}
        <Link to='/login'> If you have alerady Account Lets Login</Link>
      </Form>
    </Card.Body>
  </Card>
</>
}
export default UserSignUpForm;