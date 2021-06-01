import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppSetting from '../AppSettings'
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap'
import "./alerts.css"
const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
    }
}));
export default function UserLoginForm() {
    const classes = useStyles();
    const history = useHistory()
    let [getResponseFromServer, setGetResponseFromServer] = useState(false)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [companySwitch, setCompanySwitch] = useState(false)
    const loginUser = (e) => {
        e.preventDefault();
        setGetResponseFromServer(true)
        let forEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
        let forPwd = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/ // pwd contain atleast one special character
        if (!(email && password)) {
            document.getElementById("gernalErr").style.display = 'block'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forEmail.test(email)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'block'
            document.getElementById("pwdErr").style.display = 'none'
            setGetResponseFromServer(false)
            return
        } else if (!forPwd.test(password)) {
            document.getElementById("gernalErr").style.display = 'none'
            document.getElementById("emailErr").style.display = 'none'
            document.getElementById("pwdErr").style.display = 'block'
            setGetResponseFromServer(false)
            return
        }
        document.getElementById("gernalErr").style.display = 'none'
        document.getElementById("emailErr").style.display = 'none'
        document.getElementById("pwdErr").style.display = 'none'
        let data = { userData: { email, password } }
        if (companySwitch) {
            axios.post(`${AppSetting.SERVER_URL_PORT}/company/login-company`, data)
                .then(success => {
                    history.push("/postjob", { staus: true })
                    localStorage.setItem("CI", success.data.company._id)
                    cleanFields()
                })
                .catch(err => {
                    console.log("Something went Wrong ==> ", err)
                    alert("Something went wrong check the userName and password")
                }).finally(() => setGetResponseFromServer(false))
            return
        }
        axios.post(`${AppSetting.SERVER_URL_PORT}/student/login-user`, data)
            .then(user => {
                localStorage.setItem("SI", user.data.student._id)
                history.push("/allJobs", { status: true })
                cleanFields()
            })
            .catch(err => {
                // console.log("unable to find user ", err)
                console.log("Unable to find User Error ==>", err)
                alert("Password !== password")
            }).finally(() => setGetResponseFromServer(false))

    }
    const cleanFields = () => {
        setEmail('')
        setPassword('')
    }
    return <>
        <div className={classes.root}>
            <Card className='forStudentLoginForm bg-light'>
                <Card.Body>
                    <div id='gernalErr' className='display-gernal-err-for-student-login-form'>
                        <Alert variant='danger'>
                            All field must be field
                        </Alert>
                    </div>
                    <form autoComplete="off">
                        <Container>
                            <Row className='bg-light'>
                                <Col lg={1} className='mt-4'>
                                    <EmailIcon style = {{color: "rgb(14, 232, 207)"}} />
                                </Col>
                                <Col lg={11}>
                                    <TextField
                                        id="standard-full-width"
                                        label="Enter Your Email"
                                        type="email"
                                        style={{ margin: 8 }}
                                        placeholder="Enter Your Email Here"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                </Col>
                            </Row>
                            <div id='emailErr' className='display-specific-err-for-student-login-form'>
                                <Alert variant='danger'>
                                    Invalid Email Address
                                </Alert>
                            </div>
                            <Row>
                                <Col lg={1} className='mt-4'>
                                    <LockIcon style = {{color: "rgb(14, 232, 207)"}} />
                                </Col>
                                <Col lg={11}>
                                    <TextField
                                        id="standard-full-width"
                                        label="Enter Your Password"
                                        type="password"
                                        style={{ margin: 8 }}
                                        placeholder="Enter Your Password Here"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControlLabel
                                        control={<Switch checked={companySwitch} onChange={() => setCompanySwitch(!companySwitch)} name="Company" />}
                                        label="Company" style = {{color: "#9c8797"}}
                                    />
                                </Col>
                            </Row>
                            <div id='pwdErr' className='display-specific-err-for-student-login-form'>
                                <Alert variant='danger'>
                                    Invalid Password
                                </Alert>
                            </div>
                        </Container>
                        {getResponseFromServer ? <Button className='btn btn-block btn-info' disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Loading...</span>
                        </Button> : <Button className='btn btn-block btn-info' onClick={loginUser}> Log In</Button>}
                    </form>
                </Card.Body>
            </Card>
        </div>

    </>
}