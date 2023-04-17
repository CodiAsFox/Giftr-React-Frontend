import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
// import { useGiftr } from '../../context/GiftrContext';
import ListItem from '../ListItem/ListItem';

const People = () => {
  const [people, setPeople] = useState([]);
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  
  // setting to giftrContext
  useEffect(() =>{
    const api = import.meta.env.VITE_API_URL;
    const url = `${api}/people`;
    let request = new Request(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    fetch(request)
      .then(res=>{
        if(res.status === 401) throw new Error('Unauthorized access to API.');
        if(!res.ok) throw new Error('Invalid response');
        return res.json();
      })
      .then((data)=>{
        console.log(data);
        return data.map(ppl=>{
          const person = {
            id: ppl._id,
            name: ppl.name,
            dob: ppl.dob,
            gifts: ppl.gifts
          }
          return person;
        }
        )
      })
      .then(ppl=>{
        console.log('ppl', ppl)
        setPeople(ppl);
      })
      .catch(err=>{
        console.warn(err.message);
        setToken(null)
        navigate('/');
      })
  },[]);

  return (
    <section className="people">
      <h2>People</h2>
      {console.log('people', people)}
      <ul className="pplList">
        {people.map(person=>(
          <ListItem key={person.id} person={person}/>
        ))}
      </ul>
    </section>
  )
}

export default People