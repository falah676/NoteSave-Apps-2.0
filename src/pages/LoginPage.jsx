import React from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { login } from "../utils/network-data";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";
import PropTypes from "prop-types";

const LoginPage = ({loginSuccess}) => {
    const [email, handleEmail] = useInput('');
    const [password, handlePassword] = useInput('');
    const [isLoading, setIsLoading] = useState(false);
    const {Locale} = useContext(LocaleContext)

    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const {error, data} = await login({email, password})
        if (!error) {
         loginSuccess(data)
         setIsLoading(false)   
        }
        setIsLoading(false)
    }

    return(
        <section>
   <div className="login-input">
      <h2>{Locale === 'en' ? 'Please Sign In to access Apps' : 'Silahkan Login dulu untuk mengakses aplikasi'}</h2>
           <form onSubmit={onLogin}>
                <div className="form-input">
                    <label htmlFor="email-login">Email</label>
                    <input type="email" name="email-login" id="email-login" placeholder={Locale === 'en' ? 'Insert Your Email' : 'masukan email disini'} onChange={handleEmail} value={email} required/>
                </div>
                <div className="form-input">
                    <label htmlFor="password-login">Password</label>
                    <input type="password" name="password-login" id="password-login" placeholder={Locale === 'en' ? 'Insert Your Password':'masukan password disini'} onChange={handlePassword} value={password} required/>
                 </div>
                    {
                        isLoading ?(
                        <button type='submit' disabled={true}><ReactLoading height={'2%'} width={'2%'} /></button>)
                        :
                        (<button type='submit' disabled={false}>Sign In</button>)

                    }
                </form>
                <p>{Locale === 'en' ? "Don't have an account?":"Belum Punya Akun?"} <Link to={'/register'}>Sign Up</Link></p>
            </div>
        </section>
    )
}

LoginPage.propTypes = {
    loginSuccess:PropTypes.func.isRequired
}
export default LoginPage;