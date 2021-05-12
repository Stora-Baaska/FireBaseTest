import {useState} from 'react'
import Link from 'next/link'
import {auth} from '../firebase'
export default function login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

       const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const result = await auth.signInWithEmailAndPassword(email,password)
          M.toast({html: `welcome ${result.user.displayName}`,classes:"green"})  
        }catch(err){
          M.toast({html: err.message,classes:"red"})    
        }
        
     }
   
    return (
        <div className="container center">
            <h3>Login</h3>
             <form onSubmit={(e)=>handleSubmit(e)}>
                 <div className="input-field">
                     <input type="email" style={{width:"30%"}} placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                 </div>
                 <div className="input-field">
                 <input type="password" style={{width:"30%"}} placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                 </div>
                 <button type="submit" className="btn #5e35b1 deep-purple darken-1">Login</button>
                 <h5>Don't have an account ?</h5><Link href="/signup"><a><h5>Sign Up</h5></a></Link>
             </form>
            
        </div>
    )
}
