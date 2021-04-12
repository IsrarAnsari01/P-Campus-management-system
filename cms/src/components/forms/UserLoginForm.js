import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import AppSetting from '../AppSettings'
import { Button, Container, Row, Col } from 'react-bootstrap'
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
    const loginUser = (e) => {
        e.preventDefault();
        setGetResponseFromServer(true)
        let data = { userData: { email, password } }
        axios.post(`${AppSetting.SERVER_URL_PORT}/student/login-user`, data)
            .then(user => {
                localStorage.setItem("SI", user.data.student._id)
                console.log(user.data.student._id)
                history.push("/allJobs", { status: true })
                cleanFields()
            })
            .catch(err => {
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
        </div>

    </>
}