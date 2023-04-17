import { useNavigate } from 'react-router-dom';
import { useGiftr } from '../context/GiftrContext';
import { useToken } from '../context/TokenContext';
import { useEffect } from 'react';

export default function CheckToken() {
  const [token,setToken] = useToken();
  const [giftr,setGiftr] = useGiftr();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) {
      navigate('/');
    }
  },[]);

  return null;
}