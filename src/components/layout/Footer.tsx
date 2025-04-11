import React from 'react';
import { Text } from '../ui/TextComp';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Img as ReactImage } from 'react-image';
import usePageContent from '../../hooks/usePageContent';
import { WEB_PAGES } from '../../utils/constants';
import { ENDPOINTS_API_PATH } from '../../utils/endpoints';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const Footer: React.FC = () => {
  const { content: faqData } = usePageContent(`/${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.contact}`, "PhoneAndEmail");
  const smoothScroll = useSmoothScroll()

  const phoneNumber = faqData?.RowValue?.split(";")[0];
  const emailAddr = faqData?.RowValue?.split(";")[1];

  const location = useLocation();
  const router = location.pathname;

  const routes = [
    { name: 'Home', path: 'home' },
    { name: 'Services', path: 'why-choose-us' },
    { name: 'Contact', path: 'contact' },
  ]

  return (
    <footer className={` ${router !== '/' ? 'hidden' : ''} bg-[url('/Landscape.svg')] bg-center bg-cover`}>
      <div className="w-full h-full py-8 mt-8 bg-black/30 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReactImage
            src={'/DESOLA.svg'}
            alt='Desola'
            className='w-full mb-20'
          />
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-left md:text-left">
            <div className="flex flex-col gap-3 max-w-[300px]">
              <ReactImage
                src={'/Alt-Logo.svg'}
                alt='Desola'
                className='w-[120px] lg:w-[200px]'
              />
              <Text as="p" size="sm" className="text-white ">
                Your guide to finding efficient and cost-effective flight options. We search the best deals so you don't have to.
              </Text>
            </div>
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
                {routes.map((item, idx) => {
                  const route = `#${item?.path.toLowerCase()}`
                  return (
                    <li key={idx} >
                      <div onClick={() => smoothScroll(route)} >
                        <Text as="p" size="sm" className="text-white hover:font-bold">
                          {item?.name}
                        </Text>
                      </div>
                    </li>
                  )
                })
                }
              </ul>
            </div>

            <div className='space-y-4'>
              <Text
                as="h3"
                size="lg"
                weight="semibold"
                className="mb-3 text-white"
              >
                Contact
              </Text>
              <Link to={`tel:${phoneNumber}`} target='_blank'>
                <Text as="p" size="sm" className="text-white hover:underline mb-2">
                  {phoneNumber}
                </Text>
              </Link>
              <Link to={`mailto:${emailAddr}`} target='_blank'>
                <Text as="p" size="sm" className='text-white hover:underline'>
                  {emailAddr}
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
              <div className="flex gap-4">
                <Link to="">
                  <FaInstagram className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" />
                </Link>
                <Link to="">
                  <FaTwitter className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" />
                </Link>
                <Link to="">
                  <FaLinkedin className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" />
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
      </div>
    </footer>
  );
};

export default Footer;
