"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Link } from "react-router-dom"

import styles from "../styles/components/navbar.module.css"
import Logo from "../assets/avif/Icons/Logo.avif"
import Search from "../assets/avif/Icons/Search.avif"
import Cart from "../assets/avif/Icons/Cart.avif"
import User from "../assets/avif/Icons/User.avif"
import loginRegister from "../assets/avif/Icons/loginRegister.avif"
import Menu from "../assets/avif/Icons/Menu.avif"

import { useNavigate } from "react-router-dom"

import { useFetchCategoriesQuery } from "../redux/slices/categoriesSlice"
import { useFetchSuggestionsQuery } from "../redux/slices/searchSlice"

//Mantener el usuario logueado
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authReducer"

const Navbar = () => {
    //Mantener el usuario logueado
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    // Categorías
    const { data: categories = [], isLoading, error } = useFetchCategoriesQuery()
    const [showCategories, setShowCategories] = useState(false)

    //Dropdown user
    const [showUserMenu, setShowUserMenu] = useState(false)

    const toggleUserMenu = () => {
        setShowUserMenu((prev) => !prev)
    }

    const [query, setQuery] = React.useState("")
    const { data: suggestions = [] } = useFetchSuggestionsQuery(query, {
        skip: query.trim() === "",
    })

    const toggleCategories = () => {
        setShowCategories((prev) => !prev)
    }

    //Busqueda
    const navigate = useNavigate()
    const [showSuggestions, setShowSuggestions] = useState(false)
    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
        setShowSuggestions(value.trim() !== "")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/buscar?q=${encodeURIComponent(query.trim())}`)
        }
    }

    const handleSelectSuggestions = (suggestion) => {
        setQuery("")
        setShowSuggestions(false)
        navigate(`/product/${suggestion.id}`)
    }

    //Carrito
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalItems = cartItems.length

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const toggleMobileMenu = () => {
        setShowMobileMenu((prev) => !prev)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.navContent}>
                    {/* Logo Section */}
                    <div className={styles.logoSection}>
                        <a href="/" className={styles.logoLink}>
                            <img className={styles.logo} src={Logo || "/placeholder.svg"} alt="Logo" />
                        </a>
                    </div>

                    {/* Search Section - Desktop */}
                    <div className={styles.searchSection}>
                        <form className={styles.searchForm} onSubmit={handleSubmit}>
                            <div className={styles.searchInputWrapper}>
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    id="search"
                                    value={query}
                                    onChange={handleChange}
                                    placeholder="Buscar productos, marcas y más..."
                                />
                                <button className={styles.searchButton} type="submit">
                                    <img className={styles.searchIcon} src={Search || "/placeholder.svg"} alt="Buscar" />
                                </button>
                            </div>

                            {showSuggestions && suggestions.length > 0 && (
                                <div className={styles.suggestionsContainer}>
                                    <ul className={styles.suggestionsList}>
                                        {suggestions.map((suggestion) => (
                                            <li
                                                key={suggestion.id}
                                                onClick={() => handleSelectSuggestions(suggestion)}
                                                className={styles.suggestionItem}
                                            >
                                                <img className={styles.suggestionIcon} src={Search || "/placeholder.svg"} alt="Buscar" />
                                                <span className={styles.suggestionText}>{suggestion.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Desktop Menu */}
                    <div className={styles.desktopMenu}>
                        <div className={styles.menuItems}>
                            {/* Categories Dropdown */}
                            <div className={styles.menuItem}>
                                <button onClick={toggleCategories} className={styles.menuButton} aria-label="Categorías">
                                    <img className={styles.menuIcon} src={Menu || "/placeholder.svg"} alt="Categorías" />
                                    <span className={styles.menuText}>Categorías</span>
                                </button>
                                {showCategories && (
                                    <div className={styles.dropdown}>
                                        <ul className={styles.dropdownList}>
                                            {isLoading ? (
                                                <li className={styles.dropdownItem}>
                                                    <span className={styles.loadingText}>Cargando...</span>
                                                </li>
                                            ) : error ? (
                                                <li className={styles.dropdownItem}>
                                                    <span className={styles.errorText}>Error al cargar categorías</span>
                                                </li>
                                            ) : (
                                                categories.map((category, index) => (
                                                    <li key={index} className={styles.dropdownItem}>
                                                        <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className={styles.dropdownLink} onClick={() => setShowCategories(false)}>
                                                            {category.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            {user ? (
                                <div className={styles.menuItem}>
                                    <button onClick={toggleUserMenu} className={styles.menuButton} aria-label="Perfil de usuario">
                                        <img className={styles.menuIcon} src={User || "/placeholder.svg"} alt="Perfil" />
                                        <span className={styles.menuText}>Mi cuenta</span>
                                    </button>
                                    {showUserMenu && (
                                        <div className={styles.userDropdown}>
                                            <ul className={styles.dropdownList}>
                                                <li className={styles.dropdownItem}>
                                                    <a href="#" className={styles.dropdownLink}>
                                                        Ver perfil
                                                    </a>
                                                </li>
                                                <li className={styles.dropdownItem}>
                                                    <a href="#" className={styles.dropdownLink}>
                                                        Configuración
                                                    </a>
                                                </li>
                                                <li className={styles.dropdownItem}>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(logout())
                                                            toast.success("Sesión cerrada correctamente!")
                                                            navigate("/")
                                                        }}
                                                        className={styles.logoutButton}
                                                    >
                                                        Cerrar sesión
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.menuItem}>
                                    <a href="/auth" className={styles.menuButton}>
                                        <img className={styles.menuIcon} src={loginRegister || "/placeholder.svg"} alt="Iniciar sesión" />
                                        <span className={styles.menuText}>Ingresar</span>
                                    </a>
                                </div>
                            )}

                            {/* Cart */}
                            <div className={styles.menuItem}>
                                <a href="/cart" className={styles.cartButton}>
                                    <div className={styles.cartIconWrapper}>
                                        <img className={styles.menuIcon} src={Cart || "/placeholder.svg"} alt="Carrito" />
                                        {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                                    </div>
                                    <span className={styles.menuText}>Carrito</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className={styles.mobileMenuButton}>
                        <button onClick={toggleMobileMenu} className={styles.hamburgerButton} aria-label="Menú">
                            <div className={styles.hamburgerIcon}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className={styles.mobileSearchSection}>
                    <form className={styles.mobileSearchForm} onSubmit={handleSubmit}>
                        <div className={styles.searchInputWrapper}>
                            <input
                                className={styles.searchInput}
                                type="text"
                                value={query}
                                onChange={handleChange}
                                placeholder="Buscar productos..."
                            />
                            <button className={styles.searchButton} type="submit">
                                <img className={styles.searchIcon} src={Search || "/placeholder.svg"} alt="Buscar" />
                            </button>
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className={styles.suggestionsContainer}>
                                <ul className={styles.suggestionsList}>
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.id}
                                            onClick={() => handleSelectSuggestions(suggestion)}
                                            className={styles.suggestionItem}
                                        >
                                            <img className={styles.suggestionIcon} src={Search || "/placeholder.svg"} alt="Buscar" />
                                            <span className={styles.suggestionText}>{suggestion.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>

                {/* Mobile Menu Overlay */}
                {showMobileMenu && (
                    <div className={styles.mobileMenuOverlay}>
                        <div className={styles.mobileMenuContent}>
                            <div className={styles.mobileMenuHeader}>
                                <h3 className={styles.mobileMenuTitle}>Menú</h3>
                                <button onClick={toggleMobileMenu} className={styles.closeButton}>
                                    ×
                                </button>
                            </div>

                            <div className={styles.mobileMenuItems}>
                                {/* Categories */}
                                <div className={styles.mobileMenuItem}>
                                    <button onClick={toggleCategories} className={styles.mobileMenuButton}>
                                        <img className={styles.mobileMenuIcon} src={Menu || "/placeholder.svg"} alt="Categorías" />
                                        Categorías
                                    </button>
                                    {showCategories && (
                                        <div className={styles.mobileSubmenu}>
                                            {isLoading ? (
                                                <div className={styles.mobileSubmenuItem}>Cargando...</div>
                                            ) : error ? (
                                                <div className={styles.mobileSubmenuItem}>Error al cargar</div>
                                            ) : (
                                                categories.map((category, index) => (
                                                    <a key={index} href="#" className={styles.mobileSubmenuItem}>
                                                        {category.name}
                                                    </a>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* User Menu */}
                                {user ? (
                                    <div className={styles.mobileMenuItem}>
                                        <button onClick={toggleUserMenu} className={styles.mobileMenuButton}>
                                            <img className={styles.mobileMenuIcon} src={User || "/placeholder.svg"} alt="Perfil" />
                                            Mi cuenta
                                        </button>
                                        {showUserMenu && (
                                            <div className={styles.mobileSubmenu}>
                                                <a href="#" className={styles.mobileSubmenuItem}>
                                                    Ver perfil
                                                </a>
                                                <a href="#" className={styles.mobileSubmenuItem}>
                                                    Configuración
                                                </a>
                                                <button
                                                    onClick={() => {
                                                        dispatch(logout())
                                                        toast.success("Sesión cerrada correctamente!")
                                                        navigate("/")
                                                        setShowMobileMenu(false)
                                                    }}
                                                    className={styles.mobileSubmenuItem}
                                                >
                                                    Cerrar sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a href="/auth" className={styles.mobileMenuButton}>
                                        <img
                                            className={styles.mobileMenuIcon}
                                            src={loginRegister || "/placeholder.svg"}
                                            alt="Iniciar sesión"
                                        />
                                        Ingresar
                                    </a>
                                )}

                                {/* Cart */}
                                <a href="/cart" className={styles.mobileMenuButton}>
                                    <div className={styles.mobileCartWrapper}>
                                        <img className={styles.mobileMenuIcon} src={Cart || "/placeholder.svg"} alt="Carrito" />
                                        {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                                    </div>
                                    Carrito ({totalItems})
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
