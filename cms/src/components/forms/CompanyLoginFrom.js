import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import AppSetting from '../AppSettings'
import Spinner from 'react-bootstrap/Spinner'
import { Button, Container, Row, Col } from 'react-bootstrap'
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
        let data = { companyInfo: { email, password } }
        axios.post(`${AppSetting.SERVER_URL_PORT}/company/login-company`, data)
            .then(success => {
                history.push("/postjob", {staus: true})
                localStorage.setItem( "CI", success.data.company._id )
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
        </div>

    </>
}