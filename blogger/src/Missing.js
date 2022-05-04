import React from 'react';
import { Link } from 'react-router-dom';
const Missing = () => {
  return (
    <main className='Missing'>
      <h3>Page not found</h3>
      <p>That's Disappointing, Checkout our homepage </p>
      <p><Link to='/'>Visit Our HomePage</Link></p>
    </main>
  );
};

export default Missing;
