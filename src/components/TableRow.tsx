import { CgRemoveR } from "react-icons/cg";

// Function to create a table row for each candidate
function TableRow({ login, name, location, avatar_url, email, html_url, company, removeCandidate }: Candidate & { removeCandidate: () => void }) {
    
    // Function used to remove a candidate from the list
    const handleRemove = () => {
        // gets candidates from local storage and stores them in an array
        const storedCandidates = localStorage.getItem('candidates');
        let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
        // removes candidate from local storage/list
        const updatedCandidatesList = candidatesList.filter((candidate: Candidate) => candidate.login !== login);
        // updates local storage after removal and calls removeCandidate function 
        // to render the new list in SavedCandidates
        localStorage.setItem('candidates', JSON.stringify(updatedCandidatesList));
        removeCandidate();
    };
    // returns table row with candidate information and a remove button
    return (
        <tr>
        <td>
            <a href={html_url}>
            <img src={avatar_url} alt="avatar" style={{ height: '50px', width: '50px' }} />
            </a>
        </td>
        <td>
            {name}
            <br />
            ({login})
        </td>
        <td>{location}</td>
        <td><a href={`mailto:${email}`}>{email}</a></td>
        <td>{company}</td>
        <td>
        <CgRemoveR onClick={handleRemove} style={{ fontSize: '47px', cursor: 'pointer' }}>Reject</CgRemoveR>
        </td>
        </tr>
    );
};

export default TableRow;