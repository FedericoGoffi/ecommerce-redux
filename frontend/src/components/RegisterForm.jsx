import React, { useRef } from 'react'
import styles from '../styles/components/RegisterForm.module.css'

import { toast } from 'sonner'

import { useRegisterUserMutation } from '../redux/slices/authSlice'

const RegisterForm = () => {
    const formRef = useRef(null);
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        try {
            const result = await registerUser(credentials).unwrap();
            toast.success('¡Registro exitoso!');

            formRef.current.reset();
        } catch (error) {
            toast.error('Error: el usuario ya existe o los datos no son válidos.');

            formRef.current.password.value = '';
            formRef.current.confirmPassword.value = '';
        };
    };

    return (
        <section className={styles.registerForm}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} ref={formRef} action="" method="post" className={styles.form}>
                <input name='email' type='email' placeholder='Email' />
                <input name='password' type='password' placeholder='Password' />
                <input name='confirmPassword' type='password' placeholder='Confirm Password' />
                <button type='submit'>Register</button>
            </form>
        </section>
    );
};

export default RegisterForm