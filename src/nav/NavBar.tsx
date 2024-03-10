import { ReactNode, useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { token } = useAuth();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  interface menuItem {
    name: string
    link?: string,
    colour: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined
    availableLoggedIn: boolean,
    availableLoggedOut: boolean,
    onClick?: Function
  }
  const menuItems: menuItem[] = [
    { name: "Dashboard", link: "/dashboard", colour: "foreground", availableLoggedIn: true, availableLoggedOut: false },
    { name: "Logout", link: "/", colour: "danger", availableLoggedIn: true, availableLoggedOut: false, onClick: () => {logout()} },
    { name: "Login", link: "/login", colour: "foreground", availableLoggedIn: false, availableLoggedOut: true },
    { name: "Sign Up", link: "/register", colour: "primary", availableLoggedIn: false, availableLoggedOut: true }
  ];

  function logout() {
    setToken(null)
    navigate("/", { replace: true });
  }
  return (
    <>
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">GardenPi</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          {token &&
            <NavbarItem>
              <Link color="foreground" href="/dashboard">
                Dashboard
              </Link>
            </NavbarItem>
          }
        </NavbarContent>
        <NavbarContent justify="end">
          {!token &&
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
          }
          {!token &&
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          }
          {token &&
            <NavbarItem>
              <Button as={Link} color="danger" href="/" variant="flat" onClick={() => logout()}>
                Logout
              </Button>
            </NavbarItem>
          }
        </NavbarContent>
        <NavbarMenu>
          {menuItems
            .filter(item => (token && item.availableLoggedIn) || (!token && item.availableLoggedOut))
            .map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                color={item.colour}
                className="w-full"
                href={item.link}
                onClick={item.onClick ? () => {item.onClick && item.onClick(); setIsMenuOpen(false)} : () => setIsMenuOpen(false)}

                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}



export default NavBar
