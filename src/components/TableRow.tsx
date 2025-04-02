// import { useState } from 'react';

function TableRow({ login, name, location, avatar_url, email, html_url, company, removeCandidate }: Candidate & { removeCandidate: () => void }) {

    // const [newCandidatesList, setNewCandidatesList] = useState<Candidate[]>([]);

    const handleRemove = () => {
        const storedCandidates = localStorage.getItem('candidates');
        let candidatesList: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];

        const updatedCandidatesList = candidatesList.filter((candidate: Candidate) => candidate.login !== login);
        console.log('updatedCandidatesList', updatedCandidatesList);
        localStorage.setItem('candidates', JSON.stringify(updatedCandidatesList));
        removeCandidate();
    };

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
            <button onClick={handleRemove}>Reject</button>
        </td>
        </tr>
    );
};

export default TableRow;