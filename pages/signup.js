import { useState } from 'react'
import Link from 'next/link'
import { auth } from '../firebase'

export default function Signup () {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password)
      await result.user.updateProfile({
        displayName: name
      })
      M.toast({ html: `welcome ${result.user.displayName}`, classes: 'green' })
    } catch (err) {
      M.toast({ html: err.message, classes: 'red' })
    }
  }
  return (
    <div className='container center'>
      <div className='formCard'>
        <h3>Sign up</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-field'>
            <input type='text' className='inputfield' placeholder='type your name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='input-field'>
            <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-field'>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='btn #5e35b1 deep-purple darken-1'>Signup</button>
          <Link href='/login'><a><h6>Already have an account ?</h6></a></Link>
        </form>
      </div>
    </div>
  )
}
