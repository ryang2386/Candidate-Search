import { useState, useEffect } from "react";
import TableRow from "../components/TableRow";

const SavedCandidates = () => {

  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');
  
  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    let storedCandidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    
    if (storedCandidatesList.length === 0) {
      setNoCandidatesMessage('No candidates found. Please search for candidates.');
    } else {
      setCandidatesList(storedCandidatesList);
      setNoCandidatesMessage('');
    }
  }, []);

  const renderNewList = () => {
    const storedCandidates = localStorage.getItem('candidates');
    let newCandidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    if (newCandidatesList.length === 0) {
      setNoCandidatesMessage('No candidates found. Please search for candidates.');
    } else {
      setCandidatesList(newCandidatesList);
      setNoCandidatesMessage('');
    }
};

  return (
      <>
          <h1>Potential Candidates</h1>
      {noCandidatesMessage ? (<p>{noCandidatesMessage}</p>) : candidatesList.length > 0 ? (
        <div>
            <table>
              <thead>
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
                      removeCandidate={renderNewList}
                    />
                  )
                  )
                }
              </thead>
            </table>
        </div>                  
              ) : null }
      </>
  );
};

export default SavedCandidates;
