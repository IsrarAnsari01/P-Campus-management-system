import { Card, Row, Col, Container } from 'react-bootstrap'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
export default function AboutCard() {
    return <>
        <Card style={{ backgroundColor: "#2f3233", boxShadow: "30px 30px 30px #33302c" }}>
            <Card.Header>
                <Card.Title className='text-center'>
                    <h2 className='h2' style={{ color: 'rgb(14, 232, 207)', fontSize: 40 }}> About Us</h2>
                </Card.Title>
            </Card.Header>
            <Card.Body className='text-justify'>
                <Card.Text className='text-white'>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                        passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </p>
                </Card.Text>
                <hr />
                <Card.Text className='mt-5'>
                    <h2 className='text-white'><b> <span style={{ color: 'rgb(14, 232, 207)', fontSize: 40, fontWeight: 'bold' }}>A</span>dmin | <span style={{ color: 'rgb(14, 232, 207)', fontSize: 40, fontWeight: 'bold' }}>I</span>srar <span style={{ color: 'rgb(14, 232, 207)', fontSize: 40, fontWeight: 'bold' }}>M</span>ehmood</b> </h2>
                    <br />
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <Card.Text className='text-left text-primary'>
                                    <h3 style={{ color: 'rgb(14, 232, 207)' }}>Soical Media</h3>
                                </Card.Text>
                                <List>
                                    <ListItem button>
                                        <a href='https://www.facebook.com/'> <ListItemIcon><FacebookIcon style={{ color: 'rgb(14, 232, 207)' }} /></ListItemIcon></a>
                                        <ListItemText className='text-white'> Facebook </ListItemText>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://www.instagram.com/'><ListItemIcon><InstagramIcon style={{ color: 'rgb(14, 232, 207)' }} /></ListItemIcon></a>
                                        <ListItemText className='text-white'>Instagram</ListItemText>
                                    </ListItem> <ListItem button>
                                        <a href='https://twitter.com/?lang=en'><ListItemIcon> <TwitterIcon style={{ color: 'rgb(14, 232, 207)' }} /></ListItemIcon></a>
                                        <ListItemText className='text-white'>Twitter</ListItemText>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://www.linkedin.cn/signup/cold-join'><ListItemIcon> <LinkedInIcon style={{ color: 'rgb(14, 232, 207)' }} /></ListItemIcon></a>
                                        <ListItemText className='text-white'>LinkedIn</ListItemText>
                                    </ListItem>
                                </List>
                            </Col>
                            <Col lg={4}>
                                <Card.Text className='text-left' style={{ color: 'rgb(14, 232, 207)' }}>
                                    <h2> Projects </h2>
                                </Card.Text>
                                <List className='text-white'>
                                    <ListItem>
                                        <ListItemText> OlX Type App</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText> Chat App</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText> CRUD && YAMBA </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText> CMS </ListItemText>
                                    </ListItem>
                                </List>
                            </Col>
                            <Col lg={4}>
                                <Card.Text className='text-left' style={{ color: 'rgb(14, 232, 207)' }}>
                                    <h2> Project Code </h2>
                                </Card.Text>
                                <List className='text-white'>
                                    <ListItem button>
                                        <a href='https://github.com/IsrarAnsari01/P-olx_c' style={{ color: 'rgb(14, 232, 207)' }}>https://github.com/IsrarAnsari01/P-olx_c</a>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://github.com/IsrarAnsari01/T-ChatApp-IA' style={{ color: 'rgb(14, 232, 207)' }}>https://github.com/IsrarAnsari01/T-ChatApp-IA</a>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://github.com/IsrarAnsari01/T-CRUD_APP_IA' style={{ color: 'rgb(14, 232, 207)' }}>https://github.com/IsrarAnsari01/T-CRUD_APP_IA</a>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://github.com/IsrarAnsari01/P-Campus-management-system' style={{ color: 'rgb(14, 232, 207)' }}>https://github.com/IsrarAnsari01/P-Campus-management-system</a>
                                    </ListItem>
                                </List>
                            </Col>
                        </Row>
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    </>
}
