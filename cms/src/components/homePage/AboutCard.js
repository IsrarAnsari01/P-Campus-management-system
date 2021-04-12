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
        <Card>
            <Card.Header>
                <Card.Title className='text-center'>
                    <h2 className='h2'> About Us</h2>
                </Card.Title>
            </Card.Header>
            <Card.Body className='text-center'>
                <Card.Text>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                        passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </p>
                </Card.Text>
                <hr />
                <Card.Text className='mt-5'>
                    <h2><b> Admin | Israr Mehmood</b> </h2>
                    <br />
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <Card.Text className='text-left text-primary'>
                                    <h3>Soical Media</h3>
                                </Card.Text>
                                <List>
                                    <ListItem button>
                                        <a href='https://www.facebook.com/'> <ListItemIcon><FacebookIcon className='text-primary' /></ListItemIcon></a>
                                        <ListItemText> Facebook </ListItemText>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://www.instagram.com/'><ListItemIcon><InstagramIcon className='text-primary' /></ListItemIcon></a>
                                        <ListItemText>Instagram</ListItemText>
                                    </ListItem> <ListItem button>
                                        <a href='https://twitter.com/?lang=en'><ListItemIcon> <TwitterIcon className='text-primary' /></ListItemIcon></a>
                                        <ListItemText>Twitter</ListItemText>
                                    </ListItem>
                                    <ListItem button>
                                        <a href='https://www.linkedin.cn/signup/cold-join'><ListItemIcon> <LinkedInIcon className='text-primary' /></ListItemIcon></a>
                                        <ListItemText>LinkedIn</ListItemText>
                                    </ListItem>
                                </List>
                            </Col>
                            <Col lg={6}>
                                <Card.Text className='text-primary text-left'>
                                    <h2> Personal Info </h2>
                                </Card.Text>
                                <List>
                                    <Card.Text className ='text-left'>
                                        <h6> Projects </h6>
                                    </Card.Text>
                                    <ListItem>
                                        <ListItemText> Chat App</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText> Student Management System </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText> CRUD </ListItemText>
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
