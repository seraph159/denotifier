import { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from '../firebase/firebase.utils'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useRouter} from 'next/router'
import Logo from '../components/logo.component'
import styles from '../styles/Login.module.scss'

const Login = () => {

let router = useRouter()

 const [state, setState] = useState({
    email: "",
    password: "",
});

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push('/dashboard')
          // ...
        }
      });
  return () => {
    unsubscribe();
  }
}, [])


 const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password} = state;
        
        console.log("called" + email + password)
        try{
            await signInWithEmailAndPassword(auth, email, password)


        } catch (err){
            console.log("@manualSignin", err);
        }
    }

 const handleChange = (event) => {
        const {name, value} = event.target;

        setState({...state, [name]: value});

    }  

 return (
    <>
    <div className={styles.login__main__container}>
    <Link href="/"><a><Logo width={60} height={60}/></a></Link>
    <h2 className="text-center">Login</h2>
    <div className={styles.login__container}>
    <form className={styles.sign_in_form} onSubmit={handleSubmit}>
    <hr/>
    <div className={styles.form__group}>
      Email
        <input type="email" onChange={handleChange} className="form-control" name="email" required="required" />
    </div>
    <div className={styles.form__group}>
      Password
        <input type="password" onChange={handleChange} className="form-control" name="password" required="required" />
    </div>
    <div className={styles.form__group}>
        <button className={styles.button} type="submit">Login</button>
    </div>
    </form>
    <div className={styles.line__title}>Or continue with</div>
    <a className={styles.button} onClick={signInWithGoogle} >Login With Google</a>
    </div>
    <div className={styles.text__last}> Don&apos;t have an account? <span className={styles.signup__link}><Link href="/signup"> Sign Up here</Link></span></div>
    </div>
    <style jsx global>{`
            /* Other global styles such as 'html, body' etc... */

            #__next {
              height: 100vh;
            }
          `}</style>

    </>
)
}

export default Login