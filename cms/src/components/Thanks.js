import { Container, Row, Col, Card } from 'react-bootstrap'
import NavBar from './NavBar'
import Ads from './company/Ads'
import FooterPage from './footer/FooterPage'
export default function Thanks() {
    return <>
        <NavBar />
        <Container fluid>
            <Row className='mt-4'>
                <Col lg={9}>
                    <Card>
                        <Card.Header className='mb-4 bg-success text-white text-center'>
                            <Card.Title><h2 className='lead'>Thanks for sign in | We send you a conformation Email</h2></Card.Title>
                        </Card.Header>
                        <Card.Img variant="top" src="https://1030z2bnst92zo6j523feq9e-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/ping.png" />
                        <Card.Body>
                            <Card.Text style = {{lineHeight:3, wordSpacing: 2}}>
                                <h2 className='lead'>
                                 You’re in!
                                </h2>
                                <p className='text-center'>
                                    Hey there, <br />

                                    First off, I’d like to extend a warm welcome and ‘thank you’ for subscribing to the Compus Management System. I recognize that your time is valuable and I’m seriously flattered that you chose to join us.

                                    The Compus Management System try to provide your desire job as well as desire Condidate, with actionable steps you can take to grow your business online and off. If we ever stray from that, just send me an email and I’ll do my damndest to get it straightened out.

                                    In the meantime, I’d love to hear from you about why you’ve subscribed to our list, and what you’re interested in learning about. So long as you reply to this email, I promise I will too.

                                    If you need anything, please feel free to give me a shout at israr46ansari@gmail.com. <br />

                                    <b>Again, welcome!</b><br />
                                    <b>Regards</b> <br />
                                    <b><u> <i> Israr Ansari</i></u></b>
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg = {3}>
                <Ads />
                </Col>
            </Row>
        </Container>
        <FooterPage />





    </>
}