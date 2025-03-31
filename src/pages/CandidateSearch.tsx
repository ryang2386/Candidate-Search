import { useState, useEffect, FormEvent } from 'react';
import { searchGithubUser } from '../api/API';
import { useNavigate } from 'react-router-dom';

const CandidateSearch = () => {

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({ login: '', name: '', location: '', avatar_url: '', email: '', html_url: '', company: '' });

  const [searchInput, setSearchInput] = useState<string>('');
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');

  const navigate = useNavigate();

  const addToCandidatesList = () => {
    const storedCandidates = localStorage.getItem('candidates');
    let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];

    if (currentCandidate.login) {  
      // console.log('currentCandidate', currentCandidate);  
      candidatesList.push(currentCandidate);
    localStorage.setItem('candidates', JSON.stringify(candidatesList));
    setNoCandidatesMessage('Candidate added to the list. Please search for another.');
    }
  };

const removeFromCandidatesList = () => {
  const storedCandidates = localStorage.getItem('candidates');
    let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
  
  
  if (currentCandidate.login) {  
    // if last candidate is removed from local storage, default back to home page
    candidatesList.shift();
    // console.log('currentCandidate', currentCandidate);
    if (candidatesList.length === 0) {
      localStorage.removeItem('candidates');
      setCurrentCandidate({ login: '', name: '', location: '', avatar_url: '', email: '', html_url: '', company: '' });
      navigate('/');
    } else {
      localStorage.setItem('candidates', JSON.stringify(candidatesList));
      setCurrentCandidate(candidatesList[0]);
    }
    }
};

const searchForCandidates = async (event: FormEvent, username: string) => {
  event.preventDefault();
  try {
  const candidate: Candidate = await searchGithubUser(username);
  if (candidate && candidate.login) {
    console.log('Candidate:', candidate);
    setCurrentCandidate(candidate);
    setNoCandidatesMessage('');
  } else {
    setNoCandidatesMessage('No candidate found with that username.');
  }
  } catch (error) {
    setNoCandidatesMessage('No candidate found with that username.');
  }
};

useEffect(() => {
  const storedCandidates = localStorage.getItem('candidates');
  if (storedCandidates) {
    const candidatesList: Candidate[] = JSON.parse(storedCandidates);
    if (candidatesList.length > 0) {
      setCurrentCandidate(candidatesList[0]);
    }
  }
}, []);

return (
    <>
      <div>
        <h1>Candidate Search</h1>
        <form onSubmit={(event: FormEvent) => searchForCandidates(event, searchInput)}>
          <input type='text' name='' placeholder='Enter Candidate Username' onChange={(event) => setSearchInput(event.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </div>
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
        <button onClick={addToCandidatesList}>Add</button>
        <button onClick={removeFromCandidatesList}>Remove</button>
      </div>
      ) : null }
      </>
      );
    };

export default CandidateSearch;
