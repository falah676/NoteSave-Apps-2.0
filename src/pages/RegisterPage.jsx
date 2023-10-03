import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";
import { useState } from "react";
import { register } from "../utils/network-data";

const RegisterPage = () =>{
    const {Locale} = useContext(LocaleContext);
    const [username, handleUsername] = useInput('');
    const [email, handleEmail] = useInput('');
    const [password, handlePassword] = useInput('');
    const [confirmPass, handleConfirmPass] = useInput('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const onRegister = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        if (confirmPass != password) {
            setIsLoading(false)
            return alert('Confirm Password must be same')
        }
        const {error} = await register({name : username, email, password});
        if (!error) {
            navigate('/')
            setIsLoading(false)
        }
    }
    return (
        <section>
 <div className="login-input">
        <h2>{Locale === 'en' ? 'Sign Up Please' : 'Silahkan Register Terlebih Dahulu'}</h2>
        <form onSubmit={onRegister}>
            <div className="form-input">
            <label htmlFor="username-login">username</label>
            <input type="text" name="username-login" id="username-login" placeholder={Locale === 'en' ? 'insert Username here' : 'masukan Username disini'} onChange={handleUsername} value={username} required/>
            </div>
            <div className="form-input">
            <label htmlFor="email-login">Email</label>
            <input type="email" name="email-login" id="email-login" placeholder={Locale === 'en' ? 'insert Email here' : 'masukan Email disini'} onChange={handleEmail} value={email} required/>
            </div>
            <div className="form-input">
            <label htmlFor="password-login">Password</label>
            <input type="password" name="password-login" id="password-login" placeholder={Locale === 'en' ? 'insert Password here' : 'masukan Password disini'} onChange={handlePassword} value={password} required/>
            </div>
            <div className="form-input">
            <label htmlFor="password-login">Confirm Password</label>
            <input type="password" name="password-login" id="confirm-password" placeholder={Locale === 'en' ? 'Confirm Your Password' : 'Konfirmasi Password mu'} onChange={handleConfirmPass} value={confirmPass} required/>
            </div>
            {
                isLoading ? 
                <button type='submit' disabled={true}><ReactLoading height={'2%'} width={'2%'} /></button>
                :
                <button type="submit" disabled={false}>Sign Up</button>
            }
            
        </form>
        <p>{Locale === 'en' ? "Have any account?":"Sudahkah kamu mendaftar?"} <Link to={'/'}>Sign In</Link></p>
    </div>
        </section>
    )
}

export default RegisterPage;