import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState} from "react";
import { VscClose } from "react-icons/vsc";

export const Navbar = () => {
    const [slider, setSlider] = useState<boolean>(false);
    const handleDrawer = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | SVGElement>) => {
        if ((e.target as HTMLElement).id !== 'drawer') { setSlider(prevState => !prevState) }
    };

    const Navigation = [
        {
            href: '#home',
            path: 'Home'
        },
        {
            href: '#how-it-works',
            path: 'How It Works'
        },
        {
            href: '#why-choose-us',
            path: 'Why Choose Us'
        },
        {
            href: '#support',
            path: 'FAQ/Support'
        }
    ];

    const location = useLocation();
    const router = location.pathname;

    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(()=> {

        const path = location.pathname;
        const sectionId = path.replace('/', '');
        setActiveSection(`#${sectionId}`)
        // const handleScroll =()=> {
        //     const fromTop:number = window.scrollY;
        //     Navigation?.forEach((section)=> {
        //         const element = document.getElementById(section?.href);
        //         if(element && element.offsetTop <= fromTop + window.innerHeight / 2 && element.offsetTop + element.offsetHeight > fromTop){
        //             setActiveSection(section?.href);
        //         }
        //     });
        // };
        // window.addEventListener('scroll', handleScroll);
        //     return ()=> window.removeEventListener('scroll',handleScroll);
    },[location])
    
    const smoothScroll = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className={`fixed ${['/signin','/signup', '/reset', '/verify', '/password-reset'].includes(router) ? 'hidden' : 'flex'}  items-center w-screen z-40 bg-transparent lg:top-[46px] h-14 left-0 backdrop-blur-[2px] `}>
            <div className="flex w-full justify-between items-center px-4 md:px-8 lg:px-14 xl:px-28 h-full bg-transparent">
                {/* Logo */}
                <div onClick={()=> setSlider(prevState => !prevState)}
                    className="block lg:hidden text-neutral-900 text-2xl">
                    <GiHamburgerMenu />
                </div>
                <div className="hidden lg:block ">
                    <Logo />
                </div>
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center px-1 py-1 bg-white rounded-2xl border border-neutral-300">
                        {
                            Navigation?.map((item, index) => {
                                return(
                                    <NavLink to={item?.href}
                                        key={index}
                                        onClick={(e) => {e.preventDefault(); smoothScroll(item?.href);} }
                                        className={() => `font-work h-full p-3 text-base text-neutral-900 font-medium rounded-xl text-nowrap hover:bg-secondary-100 hover:scale-105 transition-transform duration-300 ease-in-out ${location.pathname === item?.href ? 'bg-secondary-100' : 'bg-transparent'}`}
                                    >
                                        {item?.path}
                                    </NavLink>
                                )
                            })
                        }
                </nav>
                <Link to="/signin" className="hidden lg:flex items-center justify-center h-12 w-[137px] bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-base text-white font-medium rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
                    Sign In
                </Link>
                {/* Mobile Nav */}
                <div
                    className={`block lg:hidden w-screen h-screen ${slider ? 'translate-x-0  bg-black/60' : 'translate-x-[-100%] bg-transparent'} transition-all duration-200 ease-in fixed top-0 left-0 z-50`} >
                    <div className="w-[90%] h-full py-6 bg-white border border-neutral-300">
                        <div className="w-fit flex justify-self-end px-4">
                            <VscClose onClick={handleDrawer}
                                className="text-2xl cursor-pointer"
                            />
                        </div>
                        <div id="drawer"
                            className={`flex flex-col justify-between items-center px-10 pb-10  w-full h-full `}>
                            <div className="flex flex-col w-full items-center gap-22">
                                <Logo />
                                <nav className="flex flex-col w-full items-center px-1 py-1 text-center">
                                        {
                                            Navigation?.map((item, index) => {
                                                return(
                                                    <NavLink to={item?.href}
                                                        key={index}
                                                        onClick={(e) => {e.preventDefault(); smoothScroll(item?.href); handleDrawer(e)} }
                                                        className={() => `font-work size-full p-3 text-base text-neutral-900 font-medium rounded-xl text-nowrap hover:bg-secondary-100 hover:scale-105 transition-transform duration-300 ease-in-out ${activeSection === item?.href ? 'bg-secondary-100' : 'bg-transparent'}`}
                                                    >
                                                        {item?.path}
                                                    </NavLink>
                                                )
                                            })
                                        }
                                </nav>
                            </div>
                            <Link to="/signin" onClick={handleDrawer}
                                className="flex lg:hidden items-center justify-center h-16 w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-2xl text-white font-medium rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
