import React from 'react';
import 'date-fns';
const Footer = () => {
  const today=new Date();
  return <footer className='Footer'>
    <p>Copyright &copy; {today.getFullYear()}</p>
  </footer>;
};

export default Footer;
