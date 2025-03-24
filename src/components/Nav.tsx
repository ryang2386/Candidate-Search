import { Link, useLocation } from 'react-router-dom';

const Nav = () => {

  const location = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/savedcandidates" className={location === '/savedcandidates' ? 'active' : ''}>Potential Candidates</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;
