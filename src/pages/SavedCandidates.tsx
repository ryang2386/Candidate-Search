import { useState, useEffect } from "react";
import TableRow from "../components/TableRow";
// import { useNavigate } from "react-router-dom";
// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';

const SavedCandidates = () => {

  // const [candidate, setCandidate] = useState<Candidate>({
  //   login: '',
  //   name: '',
  //   location: '',
  //   avatar_url: '',
  //   email: '',
  //   html_url: '',
  //   company: ''
  // });

  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');
  
  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    let storedCandidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    setCandidatesList(storedCandidatesList);
  });

  // useEffect(() => {
  //   const storedCandidates = localStorage.getItem('candidates');
  //   let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
  //   console.log('candidatesList', candidatesList);
  //   setCandidate(candidatesList[0]);
  // }, []);

  return (
      <>
          <h1>Potential Candidates</h1>
        <div>
          <table>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Reject</th>
            </tr>
              {
                candidatesList.map((candidate, index) => (
                  <TableRow
                    key={index}
                    login={candidate.login}
                    name={candidate.name}
                    location={candidate.location}
                    avatar_url={candidate.avatar_url}
                    email={candidate.email}
                    html_url={candidate.html_url}
                    company={candidate.company}
                  />
                )
              )}
            {/* <tr>
              <td><a href={candidate.html_url}><img src={candidate.avatar_url} alt="avatar" style={{ height: '50px', width: '50px' }} /></a></td>
              <td>{candidate.name}
                <br />
                ({candidate.login})
              </td>
              <td>{candidate.location}</td>
              <td><a href={`mailto:${candidate.email}`}>{candidate.email}</a></td>
              <td>{candidate.company}</td>
              <td>
                <button onClick={() => {}}>Reject</button>
              </td>
            </tr> */}
          </table>
        </div>
      </>
  );
};

export default SavedCandidates;
