import { useState, useEffect, FormEvent } from 'react';
import { searchGithubUser } from '../api/API';

const CandidateSearch = () => {

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({ login: '', name: '', location: '', avatar_url: '', email: '', html_url: '', company: '' });

  const [searchInput, setSearchInput] = useState<string>('');
  const [noCandidatesMessage, setNoCandidatesMessage] = useState<string>('');

  const addToCandidatesList = () => {
    const storedCandidates = localStorage.getItem('candidates');
    let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    if (candidatesList.length === 0) {
      setNoCandidatesMessage('No more candidates are available.');
    } else{
      setNoCandidatesMessage('');
    }

    if (currentCandidate.login) {  
      console.log('currentCandidate', currentCandidate);  
      candidatesList.push(currentCandidate);
    localStorage.setItem('candidates', JSON.stringify(candidatesList));
    }
  };

const searchForCandidates = async (event: FormEvent, username: string) => {
  event.preventDefault();
  try {
  const candidate: Candidate = await searchGithubUser(username);
  if (candidate) {
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
  {noCandidatesMessage ? (<p>{noCandidatesMessage}</p>) : (
  <div>
    <section className="candidateCard">
      <img src={currentCandidate.avatar_url} alt='avatar' className='img' />
      <h2>{currentCandidate.login}</h2>
      <p>{currentCandidate.name}</p>
      <p>{currentCandidate.location}</p>
      <p>{currentCandidate.email}</p>
      <p>{currentCandidate.html_url}</p>
      <p>{currentCandidate.company}</p>
    </section>
    <button onClick={addToCandidatesList}>Add to Candidates List</button>
  </div>
  )}
  </>
  );
};

export default CandidateSearch;
