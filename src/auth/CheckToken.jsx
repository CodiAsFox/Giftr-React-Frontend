import { useNavigate } from 'react-router-dom';
import {useToken } from '../context/TokenContext';
import { useEffect } from 'react';

export default function CheckToken() {
  const [token,setToken] = useToken();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) navigate('/');
  },[]);

  return null;
}