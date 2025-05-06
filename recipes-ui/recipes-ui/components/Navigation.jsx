import React from 'react';
import {Link} from 'react-router-dom'
import './Navigation.css'; 


function Navigation() {
    return (
        <nav className="nav-container">
            <ul className="nav-list">
                <li><Link to="/" title="View our generated recipe suggestions">Our Suggestions</Link></li>
                <li><Link to="/home" title='View your saved recipes'>See My Recipes</Link></li>
                <li><Link to="/create" title='Add a new recipe to your collection'>Add Recipe</Link></li>
                <li><Link to="/login" title='Login to view your stuff'>LOGIN</Link></li>
            </ul>
        </nav>
    );
  }
export default Navigation;
