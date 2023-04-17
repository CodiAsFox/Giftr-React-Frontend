import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import ListItem from "../ListItem/ListItem";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [token, setToken] = useToken();

  const { id } = useParams();
  console.log('person id: ' + id)

  useEffect(()=>{
    const api = import.meta.env.VITE_API_URL;
    const url = `${api}/people/${id}/gifts`;
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
      .then(gfts=>{
        console.log(gfts);
        return gfts.map(gft=>{
          const gf = {
            gift_id: gft._id,
            gift_name:gft.txt,
            url: gft.url,
            store: gft.store
          }
          return gf;
        })
      })
      .then(giftArr=>{
        setGifts(giftArr);
      })
      .catch(err=>{
        console.warn(err.message);
        setToken(null)
        navigate('/');
      });
  },[]);

  return (
    <section className="gifts">
      <ul className="giftList">
        <h2>Gifts</h2>
        {gifts.map(gift=>{
          {console.log('gift map list time', gift)}
          {console.log('gift id ', gift.gift_id)}
          <ListItem key={gift.gift_id} data={gift}/>
        })}
      </ul>
    </section>
  )
}

export default Gifts