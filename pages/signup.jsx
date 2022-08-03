import React, {useEffect, useState} from 'react'
import {auth, createUserProfileDocument} from '../firebase/firebase.utils'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Navbar from '../components/navbar.component'

const SignUp = () => {

let router = useRouter()

const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
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

        const {displayName, email, password, confirmPassword} = state;

        if(password !==  confirmPassword){
            alert("passwords do no match")
            return
        }

        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);

            console.log(user, {displayName})
            createUserProfileDocument(user, {displayName})

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
    <Navbar />
    <form className="sign-up-form" onSubmit={handleSubmit}>
     <h2 className="text-center">Sign Up</h2>
     <hr/>
     <div className="form-group">
         <input type="text" onChange={handleChange} placeholder="Username" className="form-control" name="displayName" required="required" />
     </div>
     <div className="form-group">
         <input type="email" onChange={handleChange} placeholder="Email Address" className="form-control" name="email" required="required" />
     </div>
     <div className="form-group">
         <input type="password" onChange={handleChange} placeholder="Password" className="form-control" name="password" required="required" />
     </div>
     <div className="form-group">
         <input type="password" onChange={handleChange} placeholder="Confirm Password" className="form-control" name="confirmPassword" required="required" />
     </div>
     <div className="form-group">
         <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
     </div>
     <p className="small text-center">By clicking the Sign Up button, you agree to our <br/><a href="#">Terms &amp; Conditions</a>, and <a href="#">Privacy Policy</a></p>
    </form>
 <div className="text-center">Already have an account? <Link href="/signin">Login here</Link></div>
 </>
  )
}

export default SignUp