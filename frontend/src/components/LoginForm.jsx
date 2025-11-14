import React, { useRef } from 'react'
import styles from '../styles/components/LoginForm.module.css'

import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/slices/authSlice'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/slices/authReducer'

const LoginForm = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const result = await loginUser(credentials).unwrap();
            dispatch(setCredentials(result.user));
            toast.success('¡Login exitoso!');
            navigate('/');
        } catch (error) {
            toast.error('Error: el usuario no existe o los datos no son válidos.');

            formRef.current.password.value = '';
        }
    }

    return (
        <section className={styles.loginForm}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} ref={formRef} action="" method="post" className={styles.form}>
                <input name='email' type='email' placeholder='Email' />
                <input name='password' type='password' placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
        </section>
    )
}

export default LoginForm