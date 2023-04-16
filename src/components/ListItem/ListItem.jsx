import { NavLink } from 'react-router-dom';

const ListItem = (props) => {
  const person = props.person;

  if(person) {
    return (
      <li>
        <div>
          <p className="person-name">{person.name}</p>
          <p className="person-dob">{person.dob}</p>
        </div>
        <div className="actions">
          <NavLink to={`/people/${person.id}`}>Edit</NavLink>
          <NavLink to={`/gifts/`}>Gifts</NavLink>
        </div>
      </li>
    )
  }
}

export default ListItem;