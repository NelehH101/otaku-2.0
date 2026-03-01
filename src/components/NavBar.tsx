import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- LOGO HOVER LOGIC ---
    const logoImages = [
        '/raw-blue.png', '/raw-purple.png', '/raw-dark-blue.png', '/raw-dark-pink.png',
        '/raw-green.png', '/raw-indigo.png', '/raw-pink-yellow.png', '/raw-pink.png',
        '/raw-purple-pink.png', '/raw-red.png', '/raw-yellow.png',
    ];
    const [currentLogo, setCurrentLogo] = useState(logoImages[10]);

    const handleLogoHover = () => {
        const otherLogos = logoImages.filter(img => img !== currentLogo);
        const randomIndex = Math.floor(Math.random() * otherLogos.length);
        setCurrentLogo(otherLogos[randomIndex]);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* FIXED: Added right-0 to balance the centering container */}
            <nav className="fixed top-6 left-0 right-0 w-full flex justify-center z-[100] transition-all duration-500 px-4">
                <div className={`
                    flex items-center justify-between px-6 transition-all duration-500 ease-in-out rounded-full border
                    backdrop-blur-xl border-white/0 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                    mx-auto
                    
                    ${!isShrunk ? 'w-full md:w-[95%] py-6 bg-white/10 text-white' : 'bg-zinc-900/40 text-white'}
                    ${isShrunk ? 'w-[300px] md:w-[700px] py-4 md:py-6' : ''}
                    ${isShrunk ? 'hover:md:w-[90%] hover:py-6 hover:bg-white/20' : ''}
                    
                    group
                `}>

                    {/* Logo */}
                    <Link to='/' className="flex items-center gap-2 flex-shrink-0 cursor-pointer z-10">
                        <img
                            src={currentLogo}
                            alt="Raw Logo"
                            onMouseEnter={handleLogoHover}
                            onMouseLeave={() => setCurrentLogo(logoImages[10])}
                            className="transition-all duration-500 ease-out h-12 w-12 md:h-16 md:w-16 -my-4 group-hover:scale-110 active:scale-95 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className={`
                        hidden md:flex items-center gap-6 text-[18px] font-regular transition-all duration-300
                        ${isShrunk ? 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto' : 'opacity-100'}
                    `}>
                        <Link to="/shop" className="hover:opacity-60">Products</Link>
                        <Link to="/lookbook" className="hover:opacity-60">LookBook</Link>
                        <Link to="/about" className="hover:opacity-60">About</Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 z-10">
                        <button className="bg-orange-500 hover:bg-[#e64500] text-white text-[11px] font-semibold uppercase px-5 md:px-7 py-2 rounded-full flex-shrink-0 transition-transform active:scale-95">
                            Contact
                        </button>

                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className="md:hidden text-white hover:bg-white/10 p-2 rounded-full transition-colors relative z-[110]"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`
                fixed inset-0 z-[95] bg-black/98 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8
                ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-full'}
            `}>
                {[
                    { name: 'Products', path: '/shop' },
                    { name: 'LookBook', path: '/lookbook' },
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' }
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-5xl font-black italic uppercase tracking-tighter text-white hover:text-orange-500 transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default NavBar;