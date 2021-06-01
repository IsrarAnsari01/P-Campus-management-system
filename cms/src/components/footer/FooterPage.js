import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import "./footerPageCss.css"
const FooterPage = () => {
  return <>
    <footer className="site-footer mt-5">
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h6> <span style={{ fontSize: 30, fontWeight: '900', color: "rgb(14, 232, 207)", letterSpacing: 3 }}>About</span></h6>
            <p className="text-justify">CompusManagementSystem.com <i> WANTS TO YOU A BETTER CANDIDATE AS WELL AS BETTER COMPANY FOR JOBS </i>
              ALHUMDULIULLAH  We have More than 10 compaines , More than 12 Studens and also more then 15 jobs in our WEBSITE.</p>
          </Col>
          <Col xs={6} md={3}>
            <h6><span style={{ fontSize: 30, fontWeight: '900', color: "rgb(14, 232, 207)" }}>Specification</span></h6>
            <ul className="footer-links">
              <li><a href="/companies">Companies</a></li>
              <li><a href="/student">Students</a></li>
              <li><a href="/allJobs">Jobs</a></li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h6><span style={{ fontSize: 25, fontWeight: '900', color: "rgb(14, 232, 207)" }}>Enroll with us</span></h6>
            <ul className="footer-links">
              <li><a href="/Signin">Student Sign In</a></li>
              <li><a href="/login">Student Login</a></li>
              <li><a href="/companySignIn">Company Sign In</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container>
        <Row>
          <Col md={8} sm={6} xs={12}>
            <p className="copyright-text"  style = {{ color: "rgb(14, 232, 207)"}}>Copyright &copy; 2021 All Rights Reserved by
              <a href="#"  style = {{ color: "rgb(14, 232, 207)"}}> IA.com</a>.
            </p>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <ul className="social-icons">
              <li><a className="facebook" href="https://www.facebook.com/"><FacebookIcon /></a></li>
              <li><a className="twitter" href="https://www.instagram.com/"><TwitterIcon /></a></li>
              <li><a className="dribbble" href="https://ads.twitter.com/login"><InstagramIcon /></a></li>
              <li><a className="linkedin" href="https://www.linkedin.com/"><LinkedInIcon /></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
}
export default FooterPage;
