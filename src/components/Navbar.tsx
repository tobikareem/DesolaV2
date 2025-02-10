
export const Navbar = () => {
    return (
        <div className="nav-section flex justify-between items-center px-6 py-4">
            <nav className="flex justify-center items-center px-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex space-x-6 bg-white px-6 py-3 rounded-md">
                    <a
                        href="#home"
                        className="px-3 py-2 text-blue-500 font-medium rounded-md bg-blue-100"
                    >
                        Home
                    </a>
                    <a
                        href="#how-it-works"
                        className="px-3 py-2 text-gray-700 font-medium hover:text-blue-500"
                    >
                        How It Works
                    </a>
                    <a
                        href="#why-choose-us"
                        className="px-3 py-2 text-gray-700 font-medium hover:text-blue-500"
                    >
                        Why Choose Us
                    </a>
                    <a
                        href="#faq"
                        className="px-3 py-2 text-gray-700 font-medium hover:text-blue-500"
                    >
                        FAQ/Support
                    </a>
                </div>
            </nav>

            <div>
                <a href="#signin" className="px-4 py-2 text-white bg-blue-900 font-medium rounded-md hover:bg-blue-700">
                    Sign In
                </a>
            </div>
        </div>

    );
};
