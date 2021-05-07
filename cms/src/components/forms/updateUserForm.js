import React, { useState, useEffect } from "react";
import { Button, Form, Col, Alert } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import AppSetting from '../AppSettings'
const UpdateUserInfo = (props) => {
  useEffect(() => {
    if (!localStorage.getItem("SI")) {
      history.push("/login", { status: true })
      return
    }
  }, [])
  const education = ["Matriculation", "Intermediate", "Bachlor", "Master", "M.Phill", "PHD"]
  const exprience = ["Freshers", "1 Year or less", "2 Years", "More then two years"]
  let [getResponseFromServer, setGetResponseFromServer] = useState(false)
  let [fName, setFName] = useState(props.userInformation.fName)
  let [lName, setLName] = useState(props.userInformation.lName)
  let [email, setEmail] = useState(props.userInformation.email)
  let [skills, setSkills] = useState(props.userInformation.skills)
  let [studentEducation, setStudentEducation] = useState(props.userInformation.education)
  let [studentExprience, setStudentExprience] = useState(props.userInformation.exprience)
  const history = useHistory();
  const studentId = localStorage.getItem("SI")
  const updateStudent = (e) => {
    e.preventDefault();
    setGetResponseFromServer(true)
    let forName = /^[A-Za-z .]{3,30}$/
    let forEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
    let forSkill = /^[A-Za-z!@#$%+, ]{1,}$/
    if (!(fName && lName && email && skills && studentEducation && studentExprience)) {
      document.getElementById("gernalErr").style.display = 'block'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (!forName.test(fName) || !forName.test(lName)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'block'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    } else if (!forSkill.test(skills)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'none'
      document.getElementById("skillErr").style.display = 'block'
      setGetResponseFromServer(false)
      return
    } else if (!forEmail.test(email)) {
      document.getElementById("gernalErr").style.display = 'none'
      document.getElementById("nameErr").style.display = 'none'
      document.getElementById("emailErr").style.display = 'block'
      document.getElementById("skillErr").style.display = 'none'
      setGetResponseFromServer(false)
      return
    }
    document.getElementById("gernalErr").style.display = 'none'
    document.getElementById("nameErr").style.display = 'none'
    document.getElementById("emailErr").style.display = 'none'
    document.getElementById("skillErr").style.display = 'none'
    const data = { fName, lName, email, skills, education: studentEducation, exprience: studentExprience }
    axios.post(`${AppSetting.SERVER_URL_PORT}/student/update/${studentId}`, data)
      .then(succ => {
        history.push("/profile", { status: true })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setGetResponseFromServer(false))
  }

  return <>
    <div id='gernalErr' className='display-gernal-err-for-student-update-form'>
      <Alert variant='danger'>
        All field must be field
      </Alert>
    </div>
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control type="text" placeholder="Enter you First Name" onChange={(e) => setFName(e.target.value)} value={fName} required />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter you Last Name" value={lName} onChange={(e) => setLName(e.target.value)} required />
        </Form.Group>
      </Form.Row>
      <div id='nameErr' className='display-specific-err-for-student-update-form'>
        <Alert variant='danger'>
          Invalid UserName enter Right user name
        </Alert>
      </div>
      <Form.Group controlId="formGridAddress2">
        <Form.Label> Email </Form.Label>
        <Form.Control type='email' placeholder="Enter Your Valid Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <div id='emailErr' className='display-specific-err-for-student-update-form'>
          <Alert variant='danger'>
            Invalid Email Address enter correct email address
          </Alert>
        </div>
      <Form.Group controlId="formGridAddress2">
        <Form.Label> Skils  </Form.Label>
        <Form.Control type='text' placeholder="Enter Your Skils and Sperated By comma " value={skills} onChange={(e) => setSkills(e.target.value)} required />
      </Form.Group>
      <div id='skillErr' className='display-specific-err-for-student-update-form'>
          <Alert variant='danger'>
            Invalid entry of skills check the field
          </Alert>
        </div>
      <Form.Group controlId="formGridState">
        <Form.Label> Education </Form.Label>
        <Form.Control as="select" defaultValue="chose" value={studentEducation} onChange={(e) => setStudentEducation(e.target.value)} required>
          <option selected value="#">Choose any One .... </option>
          {education.map(e => <option value={e}> {e}</option>)}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Label> Exprience </Form.Label>
        <Form.Control as="select" defaultValue="chose" value={studentExprience} onChange={(e) => setStudentExprience(e.target.value)} required>
          <option selected value="#">Choose any One </option>
          {exprience.map(e => <option value={e}> {e}</option>)}
        </Form.Control>
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
      </Button> : <Button variant="dark" className='btn-block' type="submit" onClick={updateStudent}>
        Update Your Information
      </Button>}
    </Form>
  </>
};

export default UpdateUserInfo;