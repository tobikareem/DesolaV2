import { LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationContext } from "../../contexts/NavigationContext";
import { UIContext } from "../../contexts/UIContext";
import { useAuthInfo } from "../../hooks/useAuthInfo";
import authService from "../../services/authService";
import { Logo } from "./Logo";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { Close } from "../ui/Close";
import { useIsDesktop } from "../../hooks/useDesktopSize";
import { ImSpinner } from "react-icons/im";

export const Navbar = () => {
    const [slider, setSlider] = useState<boolean>(false);
    const { userName, isAuthenticated, logout, isLoading } = useAuthInfo();
    const isDesktop = useIsDesktop();
    const { navigationData, mobileTab, setMobileTab } = useContext(NavigationContext);
    const { toggleModal } = useContext(UIContext);

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
    const smoothScroll = useSmoothScroll();
    const router = location.pathname;

    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const path = location.pathname;
        const sectionId = path.replace('/', '');
        setActiveSection(`#${sectionId}`)
    }, [location])

    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        authService.initializeSigningState(setIsSigningIn);
        return () => {
        authService.setIsSigningIn = null;
        };
    }, []);

    

    


    return (
        <div className={`fixed ${router !== '/' ? 'hidden' : 'flex'} ${!isDesktop && (router === '/dashboard') ? '!flex' : ''}  items-center w-screen z-40 bg-transparent  left-0 backdrop-blur-[2px] `}>
            <div className="flex w-full justify-between items-center px-4 md:px-8 lg:px-14 xl:px-28 py-4 bg-background">
                {/* Logo */}
                <div className="block ">
                    <Logo />
                </div>
                <div onClick={() => setSlider(prevState => !prevState)}
                    className={`block lg:hidden ${router === '/dashboard' ? 'text-primary-600' : 'text-neutral-900'} text-2xl`}>
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
                    <button
                        onClick={(e) => {
                            handleDrawer(e);
                            authService.signIn();
                        }}
                        disabled={isSigningIn}
                        className="hidden lg:flex items-center justify-center h-12 w-[137px] bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-base text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        { isSigningIn ? <span className="">Signing in... <ImSpinner className="animate-spin duration-300"/></span> : 'Sign In'}
                    </button>
                )}
                {/* Mobile Nav */}
                { !isDesktop &&
                    <div
                        className={`block lg:hidden w-screen h-svh ${slider ? 'translate-x-0  bg-black/60' : 'translate-x-[-110%] bg-transparent'} transition-all duration-200 ease-in fixed top-0 left-0 z-50`} >
                        <div className="w-full h-full py-6 bg-white border border-neutral-300">
                            <div className="w-full flex justify-between px-4">
                                <Logo />
                                <Close Action={handleDrawer}/>
                            </div>
                            
                            <div id="drawer"
                                className={`flex flex-col justify-between items-center px-4 py-10  w-full h-full `}>
                                <nav className={`flex flex-col w-full py-1 px-1.5 gap-6 `}>
                                    {router === '/dashboard' ?
                                        navigationData?.map((option) => (
                                            <>
                                                <div
                                                    key={option.id}
                                                    onClick={() => {
                                                        if (option.id == 'home') {
                                                            setMobileTab('')
                                                        }
                                                        if (option.id !== 'home') {
                                                            setMobileTab(option.id);
                                                        }
                                                        if (option.id === 'trash') {
                                                            toggleModal('delete');
                                                        }
                                                        setSlider(false)
                                                    }}
                                                    className={`flex w-fit items-center gap-3 text-primary-300 font-medium font-work text-base cursor-pointer hover:scale-105 duration-300 `}>
                                                    <div className={`text-2xl text-primary-300`} >
                                                        {mobileTab === option?.id ? option?.icon2 : option?.icon}
                                                    </div>
                                                    <div className="">
                                                        {option?.label}
                                                    </div>
                                                </div>

                                            </>
                                        ))
                                        :
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
                                    <div onClick={() => { toggleModal('logout'); setSlider(false) }}
                                        className={`${router === '/dashboard' ? 'flex' : 'hidden'} w-fit items-center gap-3 text-primary-300 font-medium font-work text-base cursor-pointer hover:scale-105 duration-300 `}>
                                        <div className="text-2xl">
                                            <LogOut size={24} />
                                        </div>
                                        <div className="">
                                            Log out
                                        </div>
                                    </div>
                                </nav>

                                <button
                                    onClick={(e) => {
                                        handleDrawer(e);
                                        authService.signIn();
                                    }}
                                    className={`${isAuthenticated || router != '/' ? 'hidden' : 'flex'} lg:hidden items-center justify-center h-12 w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-xl text-white font-medium rounded-[48px] hover:scale-105 transition-transform duration-300 ease-in-out`}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

    );
};