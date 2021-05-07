import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import AppSetting from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
    }
}));
export default function CompanyLoginFrom() {
    const classes = useStyles();
    const history = useHistory()
    let [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginCompany = (e) => {
        e.preventDefault();
        setGetResponseFromServer(true)
        let forEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
        let forPwd = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/
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
        document.getElementById("pwdErr").style.display = 'block'
        let data = { companyInfo: { email, password } }
        axios.post(`${AppSetting.SERVER_URL_PORT}/company/login-company`, data)
            .then(success => {
                history.push("/postjob", { staus: true })
                localStorage.setItem("CI", success.data.company._id)
                cleanField()
            })
            .catch(err => {
                console.log("Something went Wrong ==> ", err)
                alert("Something went wrong check the userName and password")
            }).finally(() => setGetResponseFromServer(false))
    }
    const cleanField = () => {
        setEmail('')
        setPassword('')
    }

    return <>
        <div className={classes.root}>
            <Card>
                <Card.Body>
                    <div id='gernalErr' className='display-gernal-err-for-company-login-form'>
                        <Alert variant='danger'>
                            All field must be field
                        </Alert>
                    </div>
                    <form autoComplete="off">
                        <Container>
                            <Row>
                                <Col lg={1} className='mt-4'>
                                    <EmailIcon />
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

                                    />
                                </Col>
                            </Row>
                            <div id='emailErr' className='display-specific-err-for-company-login-form'>
                                <Alert variant='danger'>
                                    Invalid Email Address
                                </Alert>
                            </div>
                            <Row>
                                <Col lg={1} className='mt-4'>
                                    <LockIcon />
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

                                    />
                                </Col>
                            </Row>
                            <div id='pwdErr' className='display-specific-err-for-company-login-form'>
                                <Alert variant='danger'>
                                    Invalid Password
                                </Alert>
                            </div>
                        </Container>
                        {getResponseFromServer ? <Button variant="danger" className='btn-block' disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Loading...</span>
                        </Button> :
                            <Button className='btn btn-block btn-danger' onClick={loginCompany}> Log In</Button>}
                    </form>
                </Card.Body>
            </Card>
        </div>

    </>
}