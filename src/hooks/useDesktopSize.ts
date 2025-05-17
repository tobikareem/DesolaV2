
import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint: number = 1024): boolean {
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= breakpoint);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isDesktop;
}