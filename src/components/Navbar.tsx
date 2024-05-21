import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useAuthAxios from '@/hooks/useAuthAxios';
import { useToast } from './ui/use-toast';

interface NavbarProps {
  element: string | ReactNode;
}

const Navbar = ({ element }: NavbarProps) => {
  const { setUser } = useAuth();
  const authAxios = useAuthAxios();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await authAxios('/api/users/current', {
        method: 'DELETE',
      });

      if (response.data.data === 'ok') {
        setUser({});

        toast({
          title: 'Logout success',
        });

        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-primary text-white">
      <nav className="flex justify-between items-center container py-4">
        {element}
        <div className="items-center justify-center gap-8 hidden sm:flex">
          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col items-start justify-start gap-4">
                <SheetClose asChild>
                  <Link to="/">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/account">Account</Link>
                </SheetClose>
                <SheetClose asChild>
                  <button onClick={handleLogout}>Logout</button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
