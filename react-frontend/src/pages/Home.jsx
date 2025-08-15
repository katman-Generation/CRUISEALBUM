import React from 'react';
import './Welcome.css'; // custom CSS

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="overlay">
        <div className="welcome-text container text-white">
          <h1 className="display-4 fw-bold">Welcome!</h1>
          <p className="lead">
            I’ve had the incredible privilege of working aboard a cruise ship—an experience that has taken me to some of the most breathtaking and inspiring places around the world.
          </p>
          <p>
            As someone who’s always had a passion for coding and building websites, I felt inspired to create a platform where I could collaborate with talented photographers to share the beauty we’ve encountered.
          </p>
          <p>
            This website is designed not only to showcase stunning images from these journeys but also to provide you with visuals that you can use in your creative projects—or simply explore the world from wherever you are.
          </p>
          <p>
            If you're planning to visit any of the listed cities, you’ll find a glimpse of what to expect.
          </p>
          <p className="mt-4">
            Thank you for visiting and being part of this visual journey.<br />
            <strong>📬 For suggestions or recommendations, feel free to reach out via email or WhatsApp!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
