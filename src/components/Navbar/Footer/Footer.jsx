import React from 'react'
import './Footer.css'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
        <p>Copyright <a href="https://github.com/Israel-DL"><FaGithub/></a> 2024, CryptoFind - All Right Reserved</p>
    </div>
  )
}

export default Footer