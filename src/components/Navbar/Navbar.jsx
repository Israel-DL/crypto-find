import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { CoinContext } from '../../context/CoinContext';
import { HiLink } from "react-icons/hi";
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event)=>{
    switch (event.target.value){
      case "usd": {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur": {
        setCurrency({name: "eur", symbol: "€"});
        break;
      }
      case "ngn": {
        setCurrency({name: "ngn", symbol: "₦"});
        break;
      }
      default : {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }



  return (
    <div className='navbar'>
      <Link to={'/'}><img src={logo} alt="" className='logo' /></Link>
        
        <ul>
            <Link to={'/'}><li>Home</li></Link> 
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="ngn">NGN</option>
            </select>
            {/* <a href="https://github.com/Israel-DL"><FaGithub/></a> */}
            <a href="https://toluwani-portfolio.vercel.app/"><HiLink/></a>
        </div>
    </div>
  )
}

export default Navbar