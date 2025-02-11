import React from 'react';
import { Text } from './TextComp';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900  text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-left">
          <div>
            <Text
              as="h3"
              size="lg"
              weight="semibold"
              className="mb-3 text-white"
            >
              Page
            </Text>
            <ul className="space-y-2">
              <li>
                <Text as="p" size="sm" className="text-white hover:text-white ">
                  Home
                </Text>
              </li>
              <li>
                <Text as="p" size="sm" className="text-white hover:text-white ">
                  Services
                </Text>
              </li>
              <li>
                <Text as="p" size="sm" className="text-white hover:text-white ">
                  Contact
                </Text>
              </li>
              <li>
                <Text as="p" size="sm" className="text-white hover:text-white ">
                  404
                </Text>
              </li>
            </ul>
          </div>

          <div>
            <Text
              as="h3"
              size="lg"
              weight="semibold"
              className="mb-3 text-white"
            >
              Contact
            </Text>
            <Text as="p" size="sm" className="text-white">
              +234 908 4737 963
            </Text>
            <Text as="p" size="sm" className="text-white">
              desola@gmail.com
            </Text>
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
            <div className="flex  gap-3">
              <FaInstagram className="text-xl text-white cursor-pointer" />
              <FaTwitter className="text-xl text-white cursor-pointer" />
              <FaLinkedin className="text-xl text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm">
          <Text as="p" size="sm" className="text-white">
            © {new Date().getFullYear()} Desola. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
