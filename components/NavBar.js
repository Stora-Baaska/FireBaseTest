import Link from 'next/link'
import {auth} from '../firebase'
export default function NavBar({user}) {
    
    return (
        <nav>
        <div className="nav-wrapper #757575 grey darken-1">
          <Link href="/"><a className="brand-logo">Blogger</a></Link>
          <ul id="nav-mobile" className="right">
            {user?
            <>
              <li><Link href="/createblog"><a>Create Blog</a></Link></li>
              <li> <button  className="btn #5e35b1 deep-purple darken-1" onClick={()=>auth.signOut()}>Logout</button></li>
            </>
            
            :
                <>
                <li><Link href="/signup"><a>Signup</a></Link></li>
                <li><Link href="/login"><a>Login</a></Link></li>
                </>
            }
            
          </ul>
        </div>
      </nav>
    )
}
