import React from 'react';
import { Card, Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './About.css'; 
import rupesh from '../../assets/images/rupesh.jpg';
import chiemela from '../../assets/images/chiemela.jpg';
import aakansha from '../../assets/images/aakansha.jpg';



const About = () => {
  // Sample data for the CardLayout component
  const cardData = [
    {
      imageUrl: rupesh,
      title: 'Rupesh Rokade',
      description: 'Civil Engineer turned Software Enthusiast, specializing in Full-Stack Development and passionate about emerging technologies like MERN stack and AWS. Bringing leadership from soccer and creativity in film-making, I am eager to collaborate and innovate in the tech space.',
    
    },
    {
      imageUrl: chiemela,
      title: 'Chiemela Onyeoziri',
      description: 'Architect turned Software Engineer driven by an unwavering passion for problem-solving and the creative mindset that architecture instilled in me.',
    },
    {
      imageUrl: aakansha,
      title: 'Aakansha Desai',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' ,
    },
   
    
    // Add more card data as needed
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" id="mynav">
        <Navbar.Brand className="px-5 col-sm-12 col-md-6" as={Link} to="/">
          Apartment Amigo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item className="nav-item px-1">
              <Nav.Link as={Link} to="/">
                Discover
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item px-1">
              <Nav.Link as={Link} to="/features">
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item px-1">
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item px-1">
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Link to="/login" className="btn btn-light px-4" id="loginButton">
            Login
          </Link>
        </Navbar.Collapse>
      </Navbar>

      <Container className="text-center mt-3">
        <h1> Meet the Designers</h1>
      </Container>

       {/* Main Section */}
       <div className="container mt-5">
        {/* ... (Your existing text) */}
        <Row>
          {cardData.map((card, index) => (
            <Col key={index} className="mb-3">
              <Card style={{ marginBottom: '1000px' }}>
                <Card.Img variant="top" src={card.imageUrl} alt={card.title} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
     
    </div>
  );
};

export default About;
