import Link from 'next/link'
import { auth } from '../firebase'

export default function NavBar ({ user }) {
  return (
    <nav style={{ backgroundColor: 'white' }}>
      <div className='py-4 flex-shrink-0 flex items-center'>
        <ul id='nav-mobile' className='left'>
          <li>
            <img src='/logo.png' alt='' height='64px' style={{ objectFit: 'cover', width: '64px' }} />
          </li>
          <li>
            <Link href='/'>
              <a className='left ml-8 font-medium text-gray-900' style={{ color: 'black' }}>Home</a>
            </Link>
          </li>
        </ul>

        <ul id='nav-mobile' className='right'>
          {user
            ? <>
              <li><Link href='/createblog'><a className=' ml-8 font-medium text-gray-900' style={{ color: 'black' }}>Create Blog</a></Link></li>
              <li><Link href='/account-settings/basic-information'><a className='ml-8 font-medium text-gray-900' style={{ color: 'black' }}>Account Settings</a></Link></li>
              <li> <button className='btn #5e35b1 deep-purple darken-1' onClick={() => auth.signOut()}>Logout</button></li>
              </>
            : <>
              <li><Link href='/signup'><a style={{ color: 'black' }}>Signup</a></Link></li>
              <li><Link href='/login'><a style={{ color: 'black' }}>Login</a></Link></li>
            </>}
        </ul>
      </div>
    </nav>
  )
}
