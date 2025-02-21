import React from 'react';
import { Text } from './TextComp';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';



const Footer: React.FC = () => {
  const location = useLocation();
  const router = location.pathname;

  return (
    <footer className={` ${router !== '/' ? 'hidden' : ''} bg-primary-700  text-white py-8 mt-8`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-left md:text-left">
          <Logo/>
          <div>
            <Text
              as="h3"
              size="lg"
              weight="semibold"
              className="mb-3 text-white"
            >
              Page
            </Text>
            <ul className="space-y-2 ml-1">
              { ['Home', 'Services', 'Contact', '404' ].map((item)=> {
                  const route = `#${item.toLowerCase()}`
                  return(
                  <li key={item} >
                    <Link to={route}>
                      <Text as="p" size="sm" className="text-white hover:font-bold">
                        {item}
                      </Text>
                    </Link>
                  </li>
                )})
              }
            </ul>
          </div>

          <div className='space-y-3'>
            <Text
              as="h3"
              size="lg"
              weight="semibold"
              className="mb-3 text-white"
            >
              Contact
            </Text>
            <Link to={'tel:'}>
              <Text as="p" size="sm" className="text-white hover:font-bold">
                +234 908 4737 963
              </Text>
            </Link>
            <Link to={'mailto:'}>
              <Text as="p" size="sm" className="text-white hover:font-bold">
                desola@gmail.com
              </Text>
            </Link>
            
          </div>

          <div>
            <Text
              as="h3"
              size="lg"
              weight="semibold"
              className="mb-3 text-white"
            >
              Follow Us
            </Text>
            <div className="flex gap-3">
              <Link to="">
                <FaInstagram className="text-xl text-white cursor-pointer" />
              </Link>
              <Link to="">
                <FaTwitter className="text-xl text-white cursor-pointer" />
              </Link>
              <Link to="">
                <FaLinkedin className="text-xl text-white cursor-pointer" />
              </Link>
              
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-5">
          <Text as="p" size="sm" className="text-white">
            © {new Date().getFullYear()} Desola. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
