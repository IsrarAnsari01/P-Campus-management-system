import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
    }
}));
export default function CompanyLoginFrom() {
    const classes = useStyles();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const AdminEmail = "israr46ansari@gmail.com"
    const Adminpassword = "#####";
    const AdminId = "12014514514adsadfaf49851618100515"
    const loginAdmin = () => {
        if(email != AdminEmail && password != Adminpassword) {
            alert("Admin not found Check your Email And Password")
            return
        }
        localStorage.setItem("AI", AdminId)
        history.push("/studentview", {status: true})
    }
return <>
        <div className={classes.root}>
            <form autoComplete="off">
                <Container>
                    <Row>
                        <Col lg={1} className='mt-4 pt-2'>
                            <EmailIcon />
                        </Col>
                        <Col lg={11}>
                            <TextField
                                id="standard-full-width"
                                label="Enter Your Email"
                                type="email"
                                value={email}
                                style={{ margin: 20 }}
                                placeholder="Enter Your Email Here"
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1} className='mt-4 pt-2'>
                            <LockIcon />
                        </Col>
                        <Col lg={11}>
                            <TextField
                                id="standard-full-width"
                                label="Enter Your Password"
                                type="password"
                                style={{ margin: 20 }}
                                placeholder="Enter Your Password Here"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                        </Col>
                    </Row>
                </Container>
                <Button className='btn btn-block btn-danger' onClick = {loginAdmin}> Log In</Button>
            </form>
        </div>

    </>
}
