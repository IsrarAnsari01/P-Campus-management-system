import React, { useState } from "react";
import { Button, Form, Col, Alert } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import AppSetting from '../AppSettings'
const UserSignUpForm = () => {
  const education = ["Matriculation", "Intermediate", "Bachelor", "Master", "M.Phill", "PHD"]
  const exprience = ["Freshers", "1 Year or less", "2 Years", "More then two years"]
  let [getResponseFromServer, setGetResponseFromServer] = useState(false)
  let [errorIndicator, setError] = useState(false)
  let [fName, setFName] = useState("")
  let [lName, setLName] = useState("")
  let [email, setEmail] = useState(null)
  let [skills, setSkills] = useState("")
  let [studentEducation, setStudentEducation] = useState("")
  let [studentExprience, setStudentExprience] = useState(" ")
  let [password, setPassword] = useState("")
  let [rePassword, setRePassword] = useState("")
  const history = useHistory();
  const error = {}
  const emailExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameExp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/
  const saveNewStudent = (e) => {
    e.preventDefault();
    setGetResponseFromServer(true)
    if (password !== rePassword) {
      alert("Password Does not Match with eact other")
      return
    }
    // if (!(fName && lName && email && skills && studentEducation && studentExprience && password && rePassword)) {
    //   error.gernalError = "Something Went wrong please fill the correct form"
    //   setError(true)
    //   return
    // }
    // if (!(nameExp.test(fName) && nameExp.test(lName))) {
    //   error.nameError = "Invalid Name Please fill the Correct Name"
    //   setError(true)
    // } else if (!(emailExp.test(email.toLowerCase()))) {
    //   error.emailError = ' Please Enter your Correct Email Address'
    //   setError(true)
    // } else if (((studentEducation === "#") && (studentExprience === "#"))) {
    //   error.selectError = ' Please Select the correct Options'
    //   setError(true)
    // } else {
    // setError(false)
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
      })
      .finally(() => setGetResponseFromServer(false))
    // }
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
    {errorIndicator && error.gernalError? <Alert variant="danger">
      {error.gernalError}
    </Alert> : <></>}
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control type="text" placeholder="Enter you First Name" minLength='5' maxLength='20' value={fName} onChange={(e) => setFName(e.target.value)} required />
          {/* {errorIndicator && error.nameError ? <span style = {{color : 'red'}}> {error.nameError} </span> : <></>} */}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter you Last Name" minLength='5' maxLength='20' value={lName} onChange={(e) => setLName(e.target.value)} required />
          {/* {errorIndicator && error.nameError ? <span style = {{color : 'red'}}> {error.nameError} </span> : <></>} */}
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="formGridAddress2">
        <Form.Label> Email </Form.Label>
        <Form.Control type='email' placeholder="Enter Your Valid Email Address" required
          value={email} onChange={(e) => setEmail(e.target.value)}
           />
          {/* {errorIndicator && error.emailError ? <span style = {{color : 'red'}}> {error.emailError} </span> : <></>} */}

      </Form.Group>
      <Form.Group controlId="formGridAddress2">
        <Form.Label> Skils  </Form.Label>
        <Form.Control type='text' placeholder="Enter Your Skils and Sperated By comma " value={skills} 
        onChange={(e) => setSkills(e.target.value)} required /> 
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Label> Education </Form.Label>
        <Form.Control as="select" defaultValue="chose" value={studentEducation}
         onChange={(e) => setStudentEducation(e.target.value)} required>
          <option selected value="#">Choose any One .... </option>
          {education.map(e => <option value={e}> {e}</option>)}
          {/* {errorIndicator && error.selectError ? <span style = {{color : 'red'}}> {error.selectError} </span> : <></>} */}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Label> Exprience </Form.Label>
        <Form.Control as="select" defaultValue="chose" value={studentExprience}
         onChange={(e) => setStudentExprience(e.target.value)} required>
          {/* {errorIndicator && error.selectError ? <span style = {{color : 'red'}}> {error.selectError} </span> : <></>} */}
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
  </>
};

export default UserSignUpForm;