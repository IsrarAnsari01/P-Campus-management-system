import { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import FooterPage from '../footer/FooterPage'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SideManu from '../homePage/SideManu'
import { useLocation } from 'react-router';
import UpdateUserInfo from '../forms/updateUserForm'
export default function UpdateUser(props) {
    const location = useLocation()
    const [userInformation, setUserInformation] = useState(null)
    const getUserInfo = () => {
        setUserInformation(location.state.userInformation)
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return <>
        <NavBar />
        <Container fluid>
            <Row className='mt-4'>
                <Col>
                    <Card >
                        <Card.Header className='bg-info text-center text-white'>
                            <Card.Title>
                                <h2> Updates Your SKills ! we try to give you Better Job!</h2>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row className='mt-4'>
                <Col lg={8}>
                    <Card>
                        <Card.Header className='bg-info text-white text-center'>
                            <Card.Title>
                                <h2 className='lead'><CardMembershipIcon /> Update your information </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                           {userInformation &&  <UpdateUserInfo userInformation={userInformation} />}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <SideManu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}