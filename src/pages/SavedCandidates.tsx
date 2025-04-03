import { useState, useEffect } from "react";
import TableRow from "../components/TableRow";

const SavedCandidates = () => {
  // sets the state for the candidate array and the message when no candidates are found
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');
  
  // using useEffect to see if there are any candidates in local storage
  // if no, set the no candidates message
  // if yes, set the candidates list to the candidates in local storage
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

  // function to render the new list of candidates after one is removed
  // from the list
  const renderNewList = () => {
    // gets candidates from local storage and stores them in an array
    const storedCandidates = localStorage.getItem('candidates');
    let newCandidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    // checks to see if there are any candidates in local storage
    // if no, set the no candidates message
    // if yes, set the candidates list to the candidates currently in local storage
    if (newCandidatesList.length === 0) {
      setNoCandidatesMessage('No candidates found. Please search for candidates.');
    } else {
      setCandidatesList(newCandidatesList);
      setNoCandidatesMessage('');
    }
};

  // returns the table with the candidates in local storage
  return (
      <>
          <h1>Potential Candidates</h1>
      {/* if there are no candidates in local storage, display the message
      if there are candidates, display the table with the candidates     */}
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
