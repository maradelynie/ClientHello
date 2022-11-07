import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import './style.scss'

function Header() {
  const navigate = useNavigate()
  
  return (
    <header  className='header_title_h1'>
      <button type='button' onClick={()=>navigate(-1)} ><ChevronLeft size={32} className='clicable'/></button>
        <h1>Hell.0</h1>
      <button type='button' onClick={()=>navigate(1)} ><ChevronRight size={32} className='clicable'/></button>
    </header>
  );
}

export default Header;
