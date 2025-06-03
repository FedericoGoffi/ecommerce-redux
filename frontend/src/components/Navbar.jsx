import React, { useState } from 'react'
import styles from '../styles/components/navbar.module.css'
import Logo from '../assets/icons/Logo.png'

import { useNavigate } from 'react-router-dom'

import { useFetchCategoriesQuery } from '../redux/slices/categoriesSlice';
import { useFetchSuggestionsQuery } from '../redux/slices/searchSlice';

//Mantener el usuario logueado
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';

const Navbar = () => {

    //Mantener el usuario logueado
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    // Categorías
    const { data: categories = [], isLoading, error } = useFetchCategoriesQuery();

    const [showCategories, setShowCategories] = useState(false);

    const [query, setQuery] = React.useState('');
    const { data: suggestions = [] } = useFetchSuggestionsQuery(query, {
        skip: query.trim() === '',
    });

    const toggleCategories = () => {
        setShowCategories(prev => !prev);
    }


    //Busqueda
    const navigate = useNavigate()
    const [showSuggestions, setShowSuggestions] = useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(value.trim() !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleSelectSuggestions = (suggestionText) => {
        setQuery(suggestionText);
        navigate(`/buscar?q=${encodeURIComponent(suggestionText)}`);
    };

    return (
        <nav className={styles.navbar}>
            <section className={styles.section}>
                <div>
                    <a href='/'>
                        <img className={styles.logo} src={Logo} alt="Logo" />
                    </a>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Buscar productos, marcas y más..."
                    />
                    <button
                        className={styles.button}
                        type='submit'>
                        <img className={styles.iconSearch} src="https://cdn-icons-png.flaticon.com/512/3641/3641531.png" alt="Buscar" />
                    </button>

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className={styles.suggestionsList}>
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSelectSuggestions(suggestion.title)}
                                    className={styles.suggestionsItem}
                                >
                                    <img className={styles.suggestionsIconSearch} src="https://cdn-icons-png.flaticon.com/512/622/622669.png" />
                                    {suggestion.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                <ul className={styles.menu}>
                    <li className={styles.dropdown}>
                        <div className={styles.iconWrapper}>
                            <img onClick={toggleCategories} className={styles.category} src='https://cdn-icons-png.flaticon.com/512/3502/3502685.png' />
                        </div>
                        {showCategories && (
                            <ul className={`${styles.dropdown_menu} ${showCategories ? styles.show : ''}`}>
                                {isLoading ? (
                                    <li>Cargando...</li>
                                ) : error ? (
                                    <li>Error al cargar categorías</li>
                                ) : (
                                    categories.map((category, index) => (
                                        <li key={index}>
                                            <a href="#">{category.title}</a>
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                    </li>
                    {user ? (
                        <li className={styles.dropdown}>
                            <div className={styles.iconWrapper}>
                                <img className={styles.user} src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="Avatar" />
                            </div>
                            <ul className={styles.dropdown_menu}>
                                <li><a href="#">Configuración</a></li>
                                <li onClick={() => dispatch(logout())}><a href="#">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    ) : (
                        <li>
                            <a className={styles.iconWrapper} href='/auth'>
                                <img className={styles.user} src='https://cdn-icons-png.flaticon.com/512/6676/6676016.png' />
                            </a>
                        </li>
                    )}
                    <li>
                        <a className={styles.iconWrapper} href='#'>
                            <span><img className={styles.cart} src='https://cdn-icons-png.flaticon.com/512/1170/1170678.png' /></span>
                        </a>
                    </li>
                </ul>
            </section>
        </nav>
    )
}

export default Navbar