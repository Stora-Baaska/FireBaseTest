import { useState } from 'react'
import Link from 'next/link'
import { auth } from '../firebase'
import { useRouter } from 'next/router'

export default function login () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      M.toast({ html: `welcome ${result.user.displayName}`, classes: 'green' })
      router.push('/')
    } catch (err) {
      M.toast({ html: err.message, classes: 'red' })
    }
  }

  return (
    <div className='container center' style={{ paddingTop: '100px' }}>
      <div className='formCard'>
        <h3>Login</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-field'>
            <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-field'>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='btn #5e35b1 deep-purple darken-1'>Login</button>
          <h6>Don't have an account ?</h6><Link href='/signup'><a><h6>Sign Up</h6></a></Link>
        </form>
      </div>
    </div>
  )
}
