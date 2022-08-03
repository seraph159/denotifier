import { useState, useEffect } from 'react';
import {signInWithGoogle, auth} from '../firebase/firebase.utils'
import {signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Navbar from '../components/navbar.component'

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
    <Navbar/>
    <form className="sign-in-form" onSubmit={handleSubmit}>
    <h2 className="text-center">Sign In</h2>
    <hr/>
    <div className="form-group">
        <input type="email" onChange={handleChange} placeholder="Email Address" className="form-control" name="email" required="required" />
    </div>
    <div className="form-group">
        <input type="password" onChange={handleChange} placeholder="Password" className="form-control" name="password" required="required" />
    </div>
    <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
        <button onClick={signInWithGoogle} className="btn btn-primary btn-block btn-lg">Sign In With Google</button>
    </div>
    </form>
    <div className="text-center"> Don&apos;t have an account? <Link href="/signup"> Sign Up here</Link></div>
    </>
)
}

export default Login