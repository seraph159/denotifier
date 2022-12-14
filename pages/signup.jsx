import React, { useEffect, useState} from 'react'
import { signInWithGoogle, auth, createUserProfileDocument } from '../firebase/firebase.utils'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/SignUp.module.scss'
import Logo from '../components/logo.component'

const SignUp = () => {

let router = useRouter()

const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const [isPasswordErrorToggle, setIsPasswordErrorToggle] = useState(false)
const [isPasswordMatchErrorToggle, setIsPasswordMatchErrorToggle] = useState(false)

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

        const {displayName, email, password, confirmPassword} = state;

        if(password.length <= 8){
            setIsPasswordErrorToggle(true)
            setIsPasswordMatchErrorToggle(false)
            return
        } else{
            setIsPasswordErrorToggle(false)
        }

        if(password !==  confirmPassword){
            setIsPasswordMatchErrorToggle(true)
            return
        } else{
            setIsPasswordMatchErrorToggle(false)
        }

        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);

            console.log(user, {displayName})
            await createUserProfileDocument(user, {displayName})

            setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch (err){
            console.log("@manualSignup", err);
        }
    }

const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});

    }


return (
    <>
    <div className={styles.signup__main__container}>
    <Link href="/"><a><Logo width={60} height={60}/></a></Link>
    <h2 className="text-center">Sign Up</h2>
     <hr/>
    <div className={styles.signup__container}>
    <form className={styles.sign_up_form} onSubmit={handleSubmit}>
     <div className={styles.form__group}>
        Username
         <input type="text" onChange={handleChange} className="form-control" name="displayName" required="required" />
     </div>
     <div className={styles.form__group}>
        Email
         <input type="email" onChange={handleChange} className="form-control" name="email" required="required" />
     </div>
     <div className={styles.form__group}>
        Password
         <input type="password" onChange={handleChange} className="form-control" name="password" required="required" />
     </div>
     <div className={styles.form__group}>
        Confirm Password
         <input type="password" onChange={handleChange} className="form-control" name="confirmPassword" required="required" />
         {isPasswordErrorToggle  && <span className={styles.pass__input__text}>Please enter a password greater than 8 characters</span>}
         {isPasswordMatchErrorToggle  && <span className={styles.pass__input__text}>Passwords do not match. Please try again</span>}
     </div>
     <div className={styles.form__group}>
         <button type="submit" className={styles.button}>Sign Up</button>
     </div>
    </form>
    {/* <p className="small text-center">By clicking the Sign Up button, you agree to our <br/><a href="#">Terms &amp; Conditions</a>, and <a href="#">Privacy Policy</a></p> */}
    <div className={styles.line__title}>Or continue with</div>
    <a className={styles.button} onClick={signInWithGoogle} >Sign Up With Google</a>
    </div>
    <div className={styles.text__last}>Already have an account? <span  className={styles.login__link}><Link href="/login">Login here</Link></span></div>
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

export default SignUp