import { db } from '../firebase'
import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'

import styles from '../css/component'
import { makeStyles } from '@material-ui/core/styles'

import Parallax from '../components/Parallax/Parallax'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import SectionCarousel from '../components/Carousel/SectionCarousel'

const useStyles = makeStyles(styles)

export default function Home({ Allblogs }) {
  const classes = useStyles()

  const [blogs, setblogs] = useState(Allblogs)
  const [end, setEnd] = useState(false)
  const loadMore = async () => {
    const last = blogs[blogs.length - 1]
    const res = await db.collection('blogs')
      .orderBy('createdAt', 'desc')
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get()
    const newblogs = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setblogs(blogs.concat(newblogs))

    if (newblogs.length < 3) {
      setEnd(true)
    }
  }
  return (
    <div>
      <Parallax image='https://c.pxhere.com/photos/30/9f/work_space_office_space_workspace_conference_table-162761.jpg!d'>
        <div className={classes.container} style={{ marginLeft: '20px' }}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Mongolia</h1>
                <h3 className={classes.subtitle}>
                  From my own Perspective
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionCarousel data={blogs} />
        <div className='center' style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
          {blogs.map(blog => {
            return (
              <div className='card' key={blog.createdAt}>
                <div style={{ maxHeight: '550px', overflow: 'hidden' }}>
                  <div className='card-image'>
                    <img src={blog.imageUrl} style={{ height: '400px', objectFit: 'cover' }} />
                    <span className='card-title' style={{ maxHeight: '100px', overflow: 'hidden', fontWeight: '600', textShadow: '1px 1px #000000' }}>{blog.title}</span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                </div>
                <div className='card-action'>
                  <Link href={`/blogs/${blog.id}`}><a style={{ color: 'blueviolet' }}>Read More</a></Link>
                </div>
              </div>
            )
          })}

          {end === false
            ? <button className='btn #5e35b1 deep-purple darken-1' style={{ position: 'absolute', bottom: '0', left: '50%' }} onClick={() => loadMore()}>Load more</button>
            : <div style={{ width: '100%' }}><h4 style={{ justifyContent: 'center' }}>You have reached the end</h4></div>}

          <style jsx>
            {`
            .card{
              max-width:500px;
              margin:22px auto;
              min-width:30%;
              height: 600px
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
      </div>
    </div>

  )
}

export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy('createdAt', 'desc')
    .limit(3)
    .get()
  const Allblogs = querySnap.docs.map(docSnap => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }
  })

  return {
    props: { Allblogs }
  }
}
