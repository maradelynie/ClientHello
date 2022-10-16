import { useNavigate } from 'react-router-dom';
import './style.scss'

function Header() {
  const navigate = useNavigate()
  return (
    <h1 className='header_title_h1' onClick={()=>navigate('/')}>Hell.O</h1>

  );
}

export default Header;
