import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
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
import SideManu from './SideManu'
import UserSignUpForm from '../forms/UserSignUpForm'
import axios from 'axios'
import AppSettings from '../AppSettings'
import FooterPage from '../footer/FooterPage'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowY: 'hidden',
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
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(6) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [featureJobs, setFeatureJobs] = useState([])
    const [topJobs, setTopJobs] = useState([])
    useEffect(() => {
        getAllJobsFromDb()
    }, [])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const getAllJobsFromDb = () => {
        axios.get(`${AppSettings.SERVER_URL_PORT}/job/`)
            .then(job => {
                setTopJobs(job.data.jobs.reverse().slice(0, 4))
                setFeatureJobs(job.data.jobs.slice(4, 8))
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
                        Campus Management System | IA
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
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/student">
                        <ListItem button>
                            <ListItemIcon><GroupAddIcon /></ListItemIcon>
                            <ListItemText> Students </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/allJobs'>
                        <ListItem button>
                            <ListItemIcon><WorkRoundedIcon /></ListItemIcon>
                            <ListItemText> See Jobs</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/companies'>
                        <ListItem button>
                            <ListItemIcon><BusinessIcon /></ListItemIcon>
                            <ListItemText> Companies</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to='/postjob'>
                        <ListItem button>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText> Post Job </ListItemText>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <a href='https://www.facebook.com/'>
                        <ListItem button>
                            <ListItemIcon><FacebookIcon /></ListItemIcon>
                            <ListItemText> Facebook </ListItemText>
                        </ListItem></a>
                    <a href='https://www.instagram.com/'>
                        <ListItem button>
                            <ListItemIcon><InstagramIcon /></ListItemIcon>
                            <ListItemText>Instagram</ListItemText>
                        </ListItem></a>
                    <a href='https://twitter.com/?lang=en'>
                        <ListItem button>
                            <ListItemIcon> <TwitterIcon /></ListItemIcon>
                            <ListItemText>Twitter</ListItemText>
                        </ListItem></a>
                    <a href='https://www.linkedin.cn/signup/cold-join'>
                        <ListItem button>
                            <ListItemIcon> <LinkedInIcon /></ListItemIcon>
                            <ListItemText>LinkedIn</ListItemText>
                        </ListItem></a>
                </List>
            </Drawer>
            <main className={classes.content} >
                <div className={classes.toolbar} />
                <Slider />
                <Container className='mt-5'>
                    <Row>
                        <Col lg={6} className='text-center'>
                            <Card>
                                <Card.Header className='bg-primary'>
                                    <Card.Text>
                                        <h2 className="lead text-left text-light"> Top Jobs in Our Site</h2>
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body className='text-left'>
                                    {topJobs.length ? topJobs.map(job => <Card.Text>
                                        <p> <b> {job.jobTitle} - {job.commpanyName} </b> <br />
                                            <span className='small'> {job.companyLocation}</span> | <span className='small  lead'> {job.addedOn} </span></p>
                                    </Card.Text>) : <></>}
                                    <hr />
                                    <Card.Link>
                                        <Link to='/allJobs'> See All Jobs </Link>
                                    </Card.Link>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Text className='lead small text-left'>
                                        <b>Want to apply for jobs lets! Sign In</b>
                                    </Card.Text>
                                    <Link to='/login' className='btn btn-block btn-primary'> Sign In</Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <Card.Header className='bg-primary'>
                                    <Card.Text>
                                        <h2 className="lead text-left text-light"> Featured Jobs In our Company </h2>
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body className='text-left'>
                                    <Row>
                                        {featureJobs.length > 0 ? featureJobs.map(job =>
                                            <Col lg={6}>
                                                <Card.Text>
                                                    <p> <b> {job.jobTitle } - {job.commpanyName} </b> <br />
                                                        <span className='small'> {job.companyLocation} </span> | <span className='small  lead'> {job.addedOn} </span></p>
                                                </Card.Text>
                                                <hr />
                                            </Col>
                                            ) : <></>}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <Card.Header className='text-white bg-primary p-3 text-center'>
                                <Card.Title>
                                    <h2 className='lead'> Wait Why wasting a time lets! Enroll With us and Find a Suitable job for You</h2>
                                </Card.Title>
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={9}>
                        <Card className='mt-5'>
                            <Card.Title className='text-primary text-center'>
                                <h2> SignUp! | Student</h2>
                            </Card.Title>
                            <Card.Body>
                                <UserSignUpForm />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5'>
                        <SideManu />
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-5'>
                        <AboutCard />
                    </Col>
                </Row>
                </Container>
        <FooterPage />
            </main>
        </div >
    );
}
