import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import img1 from '../assets/images/anh1.png';
import img2 from '../assets/images/anh2.png';
import img3 from '../assets/images/anh3.png';



function Home() {
  return (<>
    <Container className='w-75'>
      <Carousel>
        <Carousel.Item interval={1000} className='w-100'>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
         
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
         
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
         
        </Carousel.Item>
      </Carousel>
    </Container>
  </>);
}

export default Home;
