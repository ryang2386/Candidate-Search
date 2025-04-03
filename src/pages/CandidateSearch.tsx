import { useState, useEffect, FormEvent } from 'react';
import { searchGithubUser } from '../api/API';
import { useNavigate } from 'react-router-dom';
import { CgAddR } from "react-icons/cg";
import { CgRemoveR } from "react-icons/cg";

const CandidateSearch = () => {
  // sets the state for the candidate object
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({ login: '', name: '', location: '', avatar_url: '', email: '', html_url: '', company: '' });
  // sets the state for the input field
  const [searchInput, setSearchInput] = useState<string>('');
  // sets the state for the message when no candidates are found
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');
  const [CandidateExistMessage, setCandidateExistMessage] = useState<string>('');
  // used to redirect to the home page when last candidate is removed from 
  // local storage/list
  const navigate = useNavigate();
  
  // function to add candidate to the list
  const addToCandidatesList = () => {
    // gets candidates from local storage and stores them in an array
    const storedCandidates = localStorage.getItem('candidates');
    let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];

    // if current candidate exists, add to local storage/list
    const candidateExists = candidatesList.some((candidate: Candidate) => candidate.login === currentCandidate.login);
    if (candidateExists) {
      // if candidate already exists, set the message to display
      setCandidateExistMessage('Candidate already exists in the list.');
    } else {
      // if candidate does not exist, add to local storage/list
      candidatesList.push(currentCandidate);
      localStorage.setItem('candidates', JSON.stringify(candidatesList));
      setCandidateExistMessage('');
    // message to display after candidate is added
    setNoCandidatesMessage('Candidate added to the list. Please search for another.');
    }
  };

// function to remove candidate from the list  
const removeFromCandidatesList = () => {
  const storedCandidates = localStorage.getItem('candidates');
    let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
  
  // if current candidate exists, remove from list
  if (currentCandidate.login) {  
    
    candidatesList.shift();

    // if there are no candidates in local storage, reset the candidate state
    // and redirect to the home page
    if (candidatesList.length === 0) {
      localStorage.removeItem('candidates');
      setCurrentCandidate({ login: '', name: '', location: '', avatar_url: '', email: '', html_url: '', company: '' });
      navigate('/');
    } else {
      // update local storage with the new list of candidates
      // and set the current candidate to the first candidate in the list
      localStorage.setItem('candidates', JSON.stringify(candidatesList));
      setCurrentCandidate(candidatesList[0]);
    }
    }
};

// function to search for candidates by username
const searchForCandidates = async (event: FormEvent, username: string) => {
  event.preventDefault();
  // resets candidate exist message to an empty string
  setCandidateExistMessage('');
  try {
  // checks to see if username exists, if so, update current candidate state
  const candidate: Candidate = await searchGithubUser(username);
  if (candidate && candidate.login) {
    
    setCurrentCandidate(candidate);
    setNoCandidatesMessage('');
  } else {
    // if candidate does not exist, set the no candidates message
    setNoCandidatesMessage('No candidate found with that username.');
  }
  } catch (error) {
    setNoCandidatesMessage('No candidate found with that username.');
  }
};

// using useEffect to check if there are any candidates in local storage
// if so, set the current candidate state to the first candidate in the list
useEffect(() => {
  const storedCandidates = localStorage.getItem('candidates');
  if (storedCandidates) {
    const candidatesList: Candidate[] = JSON.parse(storedCandidates);
    if (candidatesList.length > 0) {
      setCurrentCandidate(candidatesList[0]);
    }
  }
}, []);

// returns the HTML to render on the Candidate Search page
return (
    <>
      <div>
        <h1>Candidate Search</h1>
        {/* form submit button that handles event for search and call the searchForCandidates function */}
        <form onSubmit={(event: FormEvent) => searchForCandidates(event, searchInput)}>
          <input type='text' name='' placeholder='Enter Candidate Username' onChange={(event) => setSearchInput(event.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </div>
      {/* if noCandidatesMessage is set, display the message
      if not, display the candidate information */}
      {noCandidatesMessage ? (<p>{noCandidatesMessage}</p>) : currentCandidate.login ? (
      <div>
        <section className="candidateCard">
          <img src={currentCandidate.avatar_url} alt='avatar' className='img' />
          <h2>{currentCandidate.login}</h2>
          {currentCandidate.name ? (<p>Name: {currentCandidate.name}</p>) : null}
          {currentCandidate.location ? (<p>Location: {currentCandidate.name}</p>) : null}
          {currentCandidate.email ? (<p>Email: {currentCandidate.email}</p>) : null}
          <p>URL: {currentCandidate.html_url}</p>
          {currentCandidate.company ? (<p>Company: {currentCandidate.company}</p>) : null}
        </section>
          {CandidateExistMessage ? (<p>{CandidateExistMessage}</p>) : null} 
        <section className="button">
          {/* buttons to handle actions for adding and removing candidates from localStorage
          and the list */}
          <CgAddR onClick={addToCandidatesList} style={{ fontSize: '50px', cursor: 'pointer' }}>Add</CgAddR>
          <CgRemoveR onClick={removeFromCandidatesList} style={{ fontSize: '47px', cursor: 'pointer' }}>Remove</CgRemoveR>

        </section>
      </div>
      ) : null }
      </>
      );
    };

export default CandidateSearch;
