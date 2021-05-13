import {db} from '../firebase'
import Link from 'next/link'
import {useState} from 'react'

export default function Home({Allblogs}) {
   const [blogs,setblogs] = useState(Allblogs)
   const [end,setEnd] = useState(false)
   const loadMore = async ()=>{
     const last  = blogs[blogs.length-1]
     const res = await  db.collection('blogs')
     .orderBy('createdAt','desc')
     .startAfter(new Date(last.createdAt))
     .limit(3)
     .get()
     const newblogs = res.docs.map(docSnap=>{
       return {
        ...docSnap.data(),
        createdAt:docSnap.data().createdAt.toMillis(),
        id:docSnap.id
      }
     })
     setblogs(blogs.concat(newblogs))

     if(newblogs.length < 3){
       setEnd(true)
     }
   }
  return (
    <div className="center" style={{display:'flex', flexWrap:'wrap'}} >

        {blogs.map(blog=>{
          return(
            <div className="card" key={blog.createdAt}>
            <div dangerouslySetInnerHTML={{__html: blog.body}}>
              </div>
            <div className="card-action">
              <Link href={`/blogs/${blog.id}`}><a style={{color:'blueviolet'}}>Read More</a></Link>
            </div>
          </div>
          )
        })}

        {end==false?
        <button className="btn #5e35b1 deep-purple darken-1" style={{position:'fixed', bottom:'0', left:'50%'}} onClick={()=>loadMore()}>Load more</button>
         :<h3 style={{fontSize:"1rem"}}>You have reached end</h3>
        }
        

        <style jsx>
           {`
            .card{
              max-width:500px;
              margin:22px auto;
              min-width:30%;
            }
            p{
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
           `}
        </style>

    </div>

  )
}


export async function getServerSideProps(context) {
  const querySnap =await  db.collection('blogs').orderBy('createdAt',"desc")
  .limit(3)
  .get()
  const Allblogs =  querySnap.docs.map(docSnap=>{
    return {
      ...docSnap.data(),
      createdAt:docSnap.data().createdAt.toMillis(),
      id:docSnap.id
    }
  })


  return {
    props: {Allblogs}, // will be passed to the page component as props
  }
}