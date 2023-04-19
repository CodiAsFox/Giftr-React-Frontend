import { useState } from 'react';
import { useToken } from '../../context/TokenContext';
import { Button } from "@chakra-ui/react";

const AddGift = ({personId}) => {
  const [token, setToken] = useToken();
  
  const shape = {
    txt: '',
    store: '',
    url: '',
  };
  
  const [gift, setGift] = useState({...shape}); // a copy of shape is sent to STATE

  console.log('person id: ', personId);
  
  function saveGift() {
    postGift(gift);
  }

  function postGift(data) {
    const api = import.meta.env.VITE_API_URL;
    const url = `${api}/people/${personId}/gifts/`;
    let request = new Request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then(res=>{
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        console.log('response: ', res);
        return res.json();
      })
  }
  return (
    <section className='addGift'>
      <form>
          <div className="formBox">
            <label htmlFor="gift_idea">Gift Idea</label>
            <input 
              type="text" 
              name="gift_idea" 
              maxLength="80"
              placeholder="Enter your gift idea"
              value={`${gift.txt}`} 
              onChange={(ev) => setGift({ ...gift, txt: ev.target.value })}
              required />
          </div>
          <div className="formBox">
            <label htmlFor="store">Store</label>
            <input 
            type="text" 
            name="store" 
            maxLength="80"  
            value={`${gift.store}`} 
            onChange={(ev) => setGift({ ...gift, store: ev.target.value })} 
            required />
          </div>
          <div className="formBox">
            <label htmlFor="url">URL</label>
            <input 
            type="text" 
            name="url" 
            maxLength="80"  
            value={`${gift.url}`} 
            onChange={(ev) => setGift({ ...gift, url: ev.target.value })} 
            required />
          </div>
          <div className="formBox">
            <Button
              colorScheme="teal"
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              mr={3}
              onClick={saveGift}
            >
            Save
            </Button>
            <Button
              colorScheme="teal"
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              mr={3}
            >
            Delete
            </Button>
            
          </div>
        </form>
    </section>
  )
}

export default AddGift