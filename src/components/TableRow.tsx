function TableRow({ login, name, location, avatar_url, email, html_url, company }: Candidate) {
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
            <button onClick={() => {}}>Reject</button>
        </td>
        </tr>
    );
};

export default TableRow;