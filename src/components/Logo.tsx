import { Img as ReactImage } from 'react-image';
import { Link } from 'react-router-dom';


export const Logo =()=> {
  return (
    <Link to="/">
      <ReactImage
        src="./Logo.png"
        alt="Desola-logo"
        width={120}
        height={50}
        className=""
      />
    </Link>
    
  );
}

