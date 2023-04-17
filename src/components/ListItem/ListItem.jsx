import { NavLink, useParams } from 'react-router-dom';

const ListItem = (props) => {
  const person = props.person;
  const gift = props.data;

  console.log('person', person)
  console.log('giftOBJ', gift)
  console.log('props', props.data)

  if(person) {
    const { id, name, dob } = person;
    return (
      <li>
        <div>
          <p className="person-name">{name}</p>
          <p className="person-dob">{dob}</p>
        </div>
        <div className="actions">
          <NavLink to={`/people/${id}`}>Edit</NavLink>
          <NavLink to={`/people/${id}/gifts/`}>Gifts</NavLink>
        </div>
      </li>
    )
  }

  if(gift) {
    console.log('gift', gift)
    const { id } = useParams();
    const { gift_id, gift_name, store, url} = gift;
    <li>
      <div>
        <p className="gift-name">{gift_name}</p>
        <p className="gift-store">{store}</p>
        <p className="gift-url">{url}</p>
      </div>
      <div className="actions">
        <NavLink to={`/people/${id}/gifts/${gift_id}`}>Edit</NavLink>
        <button>DELETE</button>
      </div>
    </li>
  }
}

export default ListItem;