import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Dumbbell } from 'lucide-react'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--bg-accent);
  z-index: 1000;
  transition: var(--transition);

  &.scrolled {
    background: rgba(15, 15, 15, 0.98);
    box-shadow: var(--shadow-md);
  }
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  transition: var(--transition);

  &:hover {
    color: var(--orange-primary);
  }

  .logo-icon {
    color: var(--orange-primary);
  }
`

const NavLinks = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: var(--transition);
    border-top: 1px solid var(--bg-accent);
  }
`

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;

  &:hover {
    color: var(--orange-primary);
    background: var(--bg-secondary);
  }

  &.active {
    color: var(--orange-primary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: var(--gradient-sunset);
      border-radius: 1px;
    }
  }
`

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background: var(--bg-secondary);
    color: var(--orange-primary);
  }

  @media (max-width: 768px) {
    display: block;
  }
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/health-assessment', label: 'Health Assessment' },
    { path: '/dish-generator', label: 'Recipe Generator' },
    { path: '/plans', label: 'My Plans' },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <Nav>
      <NavContainer>
        <Logo to="/" onClick={closeMenu}>
          <Dumbbell className="logo-icon" size={24} />
          WorkoutWish
        </Logo>

        <NavLinks isOpen={isOpen}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </NavLinks>

        <MenuToggle onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuToggle>
      </NavContainer>
    </Nav>
  )
}

export default Navbar
