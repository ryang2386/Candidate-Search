import { Link, useLocation } from 'react-router-dom';

const Nav = () => {

  const location = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location === '/' ? 'active' : ''}></Link>
          </li>
          <li>
            <Link to="/candidatesearch" className={location === '/candidatesearch' ? 'active' : ''}>Candidate Search</Link>
          </li>
          <li>
            <Link to="/potentialcandidates" className={location === '/potentialcandidates' ? 'active' : ''}>Potential Candidates</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;
