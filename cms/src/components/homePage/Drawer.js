import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import clsx from 'clsx';
import BusinessIcon from '@material-ui/icons/Business';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from './Slider'
import { Link } from 'react-router-dom';
import AboutCard from './AboutCard'
import axios from 'axios'
import AppSettings from '../AppSettings'
import FooterPage from '../footer/FooterPage'
import "./homepage.css"
import SliderForFrontPage from './SliderForFrontPage'
import { Form, Button } from 'react-bootstrap';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowY: 'hidden',
        backgroundColor: '#2f3233'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 30,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: '#2f3233'

    },
    drawerOpen: {
        backgroundColor: "#262d30",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        backgroundColor: "#262d30",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        backgroundColor: '#2f3233',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        backgroundColor: '#2f3233'

    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [featureJobs, setFeatureJobs] = useState([])
    const [topJobs, setTopJobs] = useState([])
    const [companies, setCompaines] = useState([])
    useEffect(() => {
        getAllJobsFromDb()
        getCompanies()
    }, [])
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const getCompanies = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/company/`)
            .then(getcompanies => {
                setCompaines(getcompanies.data.compines.reverse().slice(0, 2))
            }).catch(err => {
                console.log("Error in fetching Companies ", err)
            })
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const getAllJobsFromDb = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(job => {
                setTopJobs(job.data.jobs.reverse().slice(0, 8))
                setFeatureJobs(job.data.jobs.slice(8, 12))
            })
            .catch(err => {
                console.log("Some thing went wrong", err)
            })
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{
                    backgroundColor: "#262d30",
                    height: 70
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap>
                        <span className='mainHeading'>C</span>ampus <span className='mainHeading' >M</span>anagement <span className='mainHeading'>S</span>ystem
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                style={{
                    backgroundColor: '#2f3233'
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }} /> : <ChevronLeftIcon style={{ color: 'white' }} />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/student">
                        <ListItem button>
                            <ListItemIcon><GroupAddIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }} > Students </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/allJobs'>
                        <ListItem button>
                            <ListItemIcon><WorkRoundedIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}> See Jobs</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/companies'>
                        <ListItem button>
                            <ListItemIcon><BusinessIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}> Companies</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/postjob'>
                        <ListItem button>
                            <ListItemIcon><DnsRoundedIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}> Post Job </ListItemText>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List style={{ listStyle: "none" }}>
                    <a href='https://www.facebook.com/'>
                        <ListItem button>
                            <ListItemIcon><FacebookIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}> Facebook </ListItemText>
                        </ListItem></a>
                    <a href='https://www.instagram.com/'>
                        <ListItem button>
                            <ListItemIcon><InstagramIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}>Instagram</ListItemText>
                        </ListItem></a>
                    <a href='https://twitter.com/?lang=en'>
                        <ListItem button>
                            <ListItemIcon> <TwitterIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}>Twitter</ListItemText>
                        </ListItem></a>
                    <a href='https://www.linkedin.cn/signup/cold-join'>
                        <ListItem button>
                            <ListItemIcon> <LinkedInIcon style={{ color: "rgb(14, 232, 207)", fontSize: 40 }} /></ListItemIcon>
                            <ListItemText style={{ color: 'white' }}>LinkedIn</ListItemText>
                        </ListItem></a>
                </List>
            </Drawer>
            <main className={classes.content} >
                <div className={classes.toolbar} />
                <Container fluid>
                    <Row>
                        <Col>
                            <Slider />
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={12}>
                            <h1 className='mainHeadingAfterSlider mt-5'>
                                <span className='spanInsideMainHeading'>S</span>hort <span className='spanInsideMainHeading'>M</span>essage <span className='spanInsideMainHeading'>F</span>rom <span className='spanInsideMainHeading'>A</span>dmin
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className='mt-5'>
                            <Card style={{ backgroundColor: '#2f3233', boxShadow: "10px 10px 10px #eba12a" }}>
                                <Card.Body>
                                    <h2 className='quotesOfMainHeading mt-5'>
                                        We <span className="spanInsideQuotes">listen</span>, we <span className="spanInsideQuotes">understand</span>, we think, we <span className="spanInsideQuotes">care</span> and most importantly, we stay focused on <span className="spanInsideQuotes">creating</span> opportunity for you to get the best job and best <span className="spanInsideQuotes">Candidate</span> for your job
                                    </h2>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col lg={12} className='mt-5 mb-5'>
                            <h1 style={{ fontSize: 60, fontWeight: 'bold', color: "rgb(14, 232, 207)" }}> Recent Posted Jobs </h1>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        {topJobs && topJobs.length > 0 ? topJobs.map(job =>
                            <Col lg={3}>
                                <Card style={{ backgroundColor: "#2f3233", boxShadow: "6px 6px 6px #33302c" }} className='test02'>
                                    <Card.Header className='text-center'>
                                        <div className='pt-2  ml-4 test'>
                                            <Card.Title className='text-white text-center mt-5'> {job.commpanyName.length > 15 ? job.commpanyName.substr(0, 15) + "....." : job.commpanyName}</Card.Title>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <h4 className='text-center text-white'> {job.jobTitle} </h4>
                                            <p className='pt-4 text-center text-white muted'> Salary {job.salary} </p>
                                            <p className=' text-center text-white muted'> {job.companyLocation}</p>
                                            <p className='text-center text-white muted small'>{job.addedOn}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>) : <Card style={{ backgroundColor: "#2f3233" }}>
                            <Card.Header>
                                <Card.Title className='lead text-white text-center'>
                                    Opps! Jobs will update very soon
                                </Card.Title>
                            </Card.Header>
                        </Card>}
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col lg={6} className="mt-5">
                            <Image style={{ width: "100vw", height: "80vh" }} id='imageStyle' src="https://monix.netlify.app/assets/img/about.png" fluid />
                        </Col>
                        <Col lg={6} className="mt-5">
                            <Card style={{ backgroundColor: '#2f3233' }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h4 style={{ color: 'white', lineHeight: 2, letterSpacing: 2 }} className='mt-5 pt-5 text-justify'>
                                            <span style={{ color: "rgb(14, 232, 207)" }}>Exprienced Company</span> are enrolled with us ! More than <span style={{ color: "rgb(14, 232, 207)" }}>20 jobs</span> posted in a day why you waiting for come join <span style={{ color: "rgb(14, 232, 207)" }}>with us</span>
                                        </h4>
                                        <p className='muted text-light text-center pt-4' style={{ fontSize: 15 }}>
                                            Sed sollicitudin ligula mi, ut accumsan est dapibus a. Cras pharetra dolor gravida, mattis tellus at, dapibus velit. Aenean dictum enim a augue aliquet posuere eget quis nibh efficitur uet varius.
                                        </p>
                                    </Card.Text>
                                    <Link to='/login' className='btn btn-block mt-5 forSigninButton' style={{ backgroundColor: "rgb(14, 232, 207)", borderRadius: 60 }}> Sign In</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className='mt-5'>
                        <Col lg={12}>
                            <h5 className='text-center' style={{ color: "rgb(14, 232, 207)" }}> <s>Registered Companies</s> </h5>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={12}>
                            <h3 className='text-center' style={{ color: "rgb(14, 232, 207)", fontSize: 40 }}> Registered Best Companies </h3>
                        </Col>
                    </Row>
                    <Row>
                        {companies && companies.length > 0 ? companies.map(company =>
                            <Col lg={6} className='mt-5'>
                                <Card style={{ backgroundColor: '#2f3233', boxShadow: "20px 10px 20px #33302c" }}>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3 className='text-center' style={{ color: "rgb(14, 232, 207)", fontWeight: 'bold' }}>{company.companyName}</h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text className='text-light'>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                        </Card.Text>
                                    </Card.Body>
                                    <Divider />
                                    <Card.Footer>
                                        <p className='pt-4 text-center text-white muted'> Owner Name : {company.companyOwnerName} </p>
                                        <p className='pt-4 text-center text-white muted'> Location : {company.companyCity} | {company.companyCountry}</p>
                                        <p className=' text-center text-white muted'> Cetaory : {company.companyCetagory} </p>
                                    </Card.Footer>
                                </Card>
                            </Col>) : <Card style={{ backgroundColor: "#2f3233" }}>
                            <Card.Header>
                                <Card.Title className='lead text-white text-center'>
                                    Opps! Companies will update very soon
                                </Card.Title>
                            </Card.Header>
                        </Card>}
                    </Row>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={12}>
                            <h3 className='text-center text-white' style={{ fontSize: 40 }}> <span style={{ color: "rgb(14, 232, 207)", fontSize: 40 }}>CMS</span> Records </h3>
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={2}>
                        </Col>
                        <Col lg={8}>
                            <SliderForFrontPage />
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={12}>
                            <h2 style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}> Featured  <span style={{ color: "rgb(14, 232, 207)" }}> Jobs </span> </h2>
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5 mb-5'>
                    <Row>
                        {featureJobs && featureJobs.length > 0 ? featureJobs.map(job =>
                            <Col lg={6} className='mt-4 mb-4'>
                                <Card style={{ backgroundColor: "#2f3233", boxShadow: "30px 30px 30px #33302c" }}>
                                    <Card.Header className='text-center'>
                                        <Card.Title className='text-center mt-5' style={{ color: "rgb(14, 232, 207)", fontSize: 40 }}> {job.commpanyName}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <h4 className='text-center text-white'> {job.jobTitle} </h4>
                                            <p className='pt-4 text-center text-white '> Salary {job.salary} </p>
                                            <p className=' text-center text-white '> {job.companyLocation}</p>
                                            <p className='text-center text-white '>{job.addedOn}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>) : <Card style={{ backgroundColor: "#2f3233" }}>
                            <Card.Header>
                                <Card.Title className='lead text-white text-center'>
                                    Opps! Featured Jobs will update very soon
                                </Card.Title>
                            </Card.Header>
                        </Card>}
                    </Row>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={12}>
                            <AboutCard />
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5 mb-4'>
                    <Row>
                        <Col>
                            <h2 className='text-center' style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}> Want to <span style={{ color: "rgb(14, 232, 207)" }}> Join </span> with  <span style={{ color: "rgb(14, 232, 207)" }}> US </span> </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className='mt-5'>
                            <h3 style={{ color: "rgb(14, 232, 207)", fontSize: 55, textAlign: 'center' }}>  Sign in </h3>
                        </Col>
                        <Col lg={4}>
                            <Link to='/login' className='btn btn-block mt-5 p-1 forSignButtonAtTop' style={{ backgroundColor: "rgb(14, 232, 207)", borderRadius: 20, fontSize: 30 }}> Click Now </Link>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='mt-5 mb-2'>
                    <Row className='mt-2'>
                        <Col>
                            <h2 style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}> Send Us <span style={{ color: "rgb(14, 232, 207)", textDecoration: 'underline' }}> Your Feedback </span></h2>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <Card style={{ backgroundColor: '#2f3233' }}>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label style={{ fontSize: 40, color: "rgb(14, 232, 207)" }}>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" className='pt-4 pb-4 text-white' style={{ backgroundColor: "#2f3233", borderColor: "rgb(14, 232, 207)" }} />
                                            <Form.Text className="text-muted text-white">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label style={{ fontSize: 40, color: "rgb(14, 232, 207)" }}>Write Comments Here </Form.Label>
                                            <Form.Control as="textarea" rows={5} placeholder="I Like this page ......" className='text-white' style={{ backgroundColor: "#2f3233", borderColor: "rgb(14, 232, 207)" }} />
                                        </Form.Group>
                                        <Button style={{ backgroundColor: "rgb(14, 232, 207)" }} type="submit" className="btn-block text-dark">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                        </Col>
                    </Row>
                </Container>
                <FooterPage />
            </main>
        </div>
    );
}