import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthInfo } from "../hooks/useAuthInfo";
import { AZURE_B2C } from "../utils/constants";
import { Logo } from "./Logo";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Navbar = () => {
    const [slider, setSlider] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);


    const { userName, isAuthenticated, logout } = useAuthInfo();

    const handleDrawer = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | SVGElement>) => {
        if ((e.target as HTMLElement).id !== 'drawer') { setSlider(prevState => !prevState) }
    };

    const Navigation = [
        { href: '#home', path: 'Home' },
        { href: '#how-it-works', path: 'How It Works' },
        { href: '#why-choose-us', path: 'Why Choose Us' },
        { href: '#support', path: 'FAQ/Support' }
    ];

    const location = useLocation();
    const router = location.pathname;

    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {

        const path = location.pathname;
        const sectionId = path.replace('/', '');
        setActiveSection(`#${sectionId}`)
    }, [location])

    useEffect(()=> {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
              setIsDesktop(true);
            } else {
              setIsDesktop(false);
            }
          };
      
          window.addEventListener('resize', handleResize);
          handleResize();
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
      
    },[])

    const smoothScroll = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className={`fixed ${ router !== '/' && router !== '/dashboard' || isDesktop ? 'hidden' : 'flex'}  items-center w-screen z-40 bg-transparent  left-0 backdrop-blur-[2px] `}>
            <div className="flex w-full justify-between items-center px-4 md:px-8 lg:px-14 xl:px-28 py-4 bg-background">
                {/* Logo */}
                
                <div className="block ">
                    <Logo />
                </div>
                <div onClick={() => setSlider(prevState => !prevState)}
                    className={`block lg:hidden ${ router === '/dashboard' ? 'text-primary-600':'text-neutral-900'} text-2xl`}>
                    <GiHamburgerMenu />
                </div>
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center px-1 py-1 bg-white rounded-[48px] border border-border">
                    {
                        Navigation?.map((item, index) => {
                            return (
                                <NavLink to={item?.href}
                                    key={index}
                                    onClick={(e) => { e.preventDefault(); smoothScroll(item?.href); }}
                                    className={() => `font-work h-full p-3 text-base text-neutral-900 font-medium rounded-[48px] text-nowrap hover:bg-secondary-100 hover:scale-105 transition-transform duration-300 ease-in-out ${location.pathname === item?.href ? 'bg-secondary-100' : 'bg-transparent'}`}
                                >
                                    {item?.path}
                                </NavLink>
                            )
                        })
                    }
                </nav>

                {isAuthenticated ? (
                    <div className="hidden lg:flex items-center space-x-4">
                        <span className="text-base text-neutral-700">Hello, {userName}</span>
                        <button
                            onClick={logout}
                            className="h-12 w-[100px] bg-red-500 text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to={AZURE_B2C.SIGN_IN_OUT}
                        className="hidden lg:flex items-center justify-center h-12 w-[137px] bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-base text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        Sign In
                    </Link>
                )}

                {/* Mobile Nav */}
                <div
                    className={`block lg:hidden w-screen h-screen ${slider ? 'translate-x-0  bg-black/60' : 'translate-x-[-100%] bg-transparent'} transition-all duration-200 ease-in fixed top-0 left-0 z-50`} >
                    <div className="w-full h-full py-6 bg-white border border-neutral-300">
                        <div className="w-full flex justify-between px-4">
                            <Logo/>
                            <AiOutlineCloseCircle onClick={handleDrawer}
                                className="text-2xl cursor-pointer"
                            />
                        </div>
                        <div id="drawer"
                            className={`flex flex-col justify-between items-center px-4 py-10  w-full h-full `}>
                                <nav className="flex flex-col w-full  py-1 ">
                                    {
                                        Navigation?.map((item, index) => {
                                            return (
                                                <NavLink to={item?.href}
                                                    key={index}
                                                    onClick={(e) => { e.preventDefault(); smoothScroll(item?.href); handleDrawer(e) }}
                                                    className={() => `font-work size-full p-3 text-base text-neutral-900 !font-medium rounded-lg text-nowrap hover:bg-secondary-100 hover:scale-105 transition-transform duration-300 ease-in-out ${activeSection === item?.href ? 'bg-secondary-100' : 'bg-transparent'}`}
                                                >
                                                    {item?.path}
                                                </NavLink>
                                            )
                                        })
                                    }
                                </nav>

                            {isAuthenticated ? (
                                <div className="flex lg:hidden items-center space-x-4">
                                    <span className="text-base text-neutral-700">Hello, {userName}</span>
                                    <button
                                        onClick={logout}
                                        className="flex lg:hidden items-center justify-center h-12 w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-lg text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to={AZURE_B2C.SIGN_IN_OUT} onClick={handleDrawer}
                                    className="flex lg:hidden items-center justify-center h-12 w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-lg text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out">
                                    Sign In
                                </Link>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
