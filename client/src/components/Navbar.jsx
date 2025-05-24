import { useState, useEffect, useContext } from 'react';
import { User, ShoppingCart, PackageOpen, Menu, Package, ShieldUser } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import DrawerComponent from './Drawer'

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, userRole} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      const isVisible = 
        prevScrollPos > currentScrollPos || 
        currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav 
      className={`bg-black text-white p-3 md:p-4 lg:p-5 flex items-center justify-between fixed top-0 w-full z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link to='/'>
        <div className="flex items-center gap-2 text-xl md:text-3xl lg:text-4xl font-bold mr-auto">
          <PackageOpen size={40}/>
          Tech in the Box
        </div>
      </Link>

    <div className="flex space-x-6 mr-0">
    <div className="hidden sm:flex space-x-6 items-center">
      {userRole === 'admin' && (
        <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-800 rounded-full">
          <ShieldUser size={27} />
        </button>
      )}
      <button onClick={() => navigate(isAuthenticated ? '/account' : '/login')} className="p-2 hover:bg-gray-800 rounded-full">
        <User size={27} />
      </button>
      <button onClick={() => navigate(isAuthenticated ? '/cart' : '/login')} className="p-2 hover:bg-gray-800 rounded-full">
        <ShoppingCart size={27} />
      </button>
      <button onClick={() => navigate(isAuthenticated ? '/orders' : '/login')} className="p-2 hover:bg-gray-800 rounded-full">
        <Package size={27} />
      </button>
    </div>
    <button onClick={toggleDrawer} className="p-2 hover:bg-gray-800 rounded-full">
      <Menu size={27} />
    </button>
    <DrawerComponent isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
 
    </nav>
  );
}
