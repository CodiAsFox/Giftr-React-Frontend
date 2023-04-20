import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import { Button } from "@chakra-ui/react";

const Gift = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  // page context for navigation

  const params = useParams();
  const personId = params.id;
  const giftId = params.giftId;
  
  const shape = {
    txt: '',
    store: '',
    url: '',
  };
  
  const [gift, setGift] = useState({...shape}); // a copy of shape is sent to STATE

  console.log('person id: ', personId);
  console.log('gift id: ', giftId);
  
  function saveGift() {
    //PATCH
    if (giftId) updateGift(gift);

    // POST
    if (!giftId) postGift(gift);
  }

  function doDelete() {
    deleteGift(giftId); 
  }
  // API GET, POST, PATCH, DELETE
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people/${personId}/gifts`;

  function getGift() {
    // api/people/${id}/gifts/${giftId}
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      })
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then((data) => {      
        setGift(data);
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }
  
  function postGift(data) {
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
      .then(()=>navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function updateGift(data) {
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        console.log("response: ", res);
        return res.json();
      })
      .then(()=>navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function deleteGift(giftId) {
    // api/people/${id}
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        console.log('res: ', res)
        return res.json();
      })
      .then(()=>navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  useEffect(()=>{
    if (giftId) {
      getGift(); // fill the inputs with data from GET fetch
    }
  },[]);

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
              onClick={doDelete}
            >
            Delete
            </Button>
            
          </div>
        </form>
    </section>
  )
}

export default Gift