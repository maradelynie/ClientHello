import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import './style.scss'

function Header() {
  const navigate = useNavigate()
  
  return (
    <header  className='header_title_h1'>
      <button type='button'><ChevronLeft size={32} onClick={()=>navigate(-1)} className='clicable'/></button>
        <h1>Hell.0</h1>
      <button type='button'><ChevronRight size={32}  onClick={()=>navigate(1)} className='clicable'/></button>
    </header>
  );
}

export default Header;
