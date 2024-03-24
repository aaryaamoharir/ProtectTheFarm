import React from 'react';
import Button from './Button'
import './Style.css'; // Import your CSS file
import { NavLink } from 'react-router-dom';


function HomePage() {
    const handleClick = () => {
        alert('Button clicked!');
      };

  return (
    <div className="gradient-background">
      <div className="bigRectangle">
        <div className='leftRectangle'>
            <div className='custom-text'>
            Protect
            The
            Farm
            </div>
        </div>
        <div className='rightRectangle'>
            <div className='custom-text'>
                Welcome!
            </div>
            <input 
                type="text"
                placeholder='Username'
                className='text-field'
            ></input>
            <input 
                type="password"
                placeholder='Password'
                className='text-field'
            ></input>
        </div>


        <div>
            <NavLink to="/Parameters">
            <Button 
                className='login-button'
            >Login
            </Button>
            </NavLink>
            
        </div>
      </div>
    </div>
  );
}

export default HomePage;
