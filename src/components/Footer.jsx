import React, { useRef } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_s32txyp', 'template_sx9480b', form.current, {
        email: form.current.email.value,
        publicKey: 'z2Krqg9m3zMwnV9y8',
      })
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

    emailjs
    .sendForm('service_s32txyp', 'template_v8rrle8', formRef.current, {
      publicKey: 'z2Krqg9m3zMwnV9y8',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
    
    form.current.reset();
  };
  
  return (
    <footer className="footer">
      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <form ref={form} onSubmit={sendEmail}>
          <input name="email" type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="social-media">
        <a href="https://www.facebook.com"><FaFacebook /></a>
        <a href="https://www.twitter.com"><FaTwitter /></a>
        <a href="https://www.instagram.com"><FaInstagram /></a>
      </div>
      <p>&copy; 2024 YourStore. All rights reserved.</p>
    </footer>
  );
}

export default Footer;