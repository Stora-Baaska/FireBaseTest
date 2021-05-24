import { useState } from 'react'
import { db } from '../../firebase'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const styles = import('../../css/colorStyle')

const useStyles = makeStyles(styles)

export default function blogpage({ blog, user, allComments }) {
    const classes = useStyles()

    const [myComment, setMyComment] = useState('')
    const [allCommentsBlog, setAllComments] = useState(allComments)
    const router = useRouter()
    const { blogid } = router.query
    const makeComment = async () => {

        await db.collection('blogs').doc(blogid).collection('comments').add({
            text: myComment,
            name: user.displayName
        })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllComments(commentQuery.docs.map(docSnap => docSnap.data()))

    }
    return (
        <div className="container center" style={{ paddingTop: '50px', width: '95vw' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: '70vw' }}>
                    <h4 style={{ width: '70vw' }}>{blog.title}</h4>
                    <img src={blog.imageUrl} style={{ width: '70vw', height: 'auto ', objectFit: 'fill', paddingTop: '40px', paddingBottom: '30px' }}></img>

                    <div style={{ width: '70vw' }} dangerouslySetInnerHTML={{ __html: blog.body }}>
                    </div>

                    {user ?
                        <>
                            <div className="input-field" style={{ display: 'flex', justifyContent: 'center' }}>
                                <input type="text"
                                    style={{ width: '70vw' }}
                                    placeholder="add a comment"
                                    value={myComment}
                                    onChange={(e) => setMyComment(e.target.value)} />
                            </div>
                            <button className="btn #5e35b1 deep-purple darken-1" style={{ marginBottom: '50px' }} onClick={() => makeComment()}>Make comment</button>
                        </>
                        : <h3 style={{ fontSize: '1rem' }}>please login to make comments</h3>
                    }

                    <hr />
                    <div className="left-align" style={{ paddingBottom: '50px' }}>

                        {allCommentsBlog.map(item => {
                            return <h6 key={item.name}><span>{item.name}</span> {item.text}</h6>
                        })}
                    </div>

                    <style jsx global>
                        {`
                span{
                    font-weight:500;
                }
                body{
                    color:black;
                }
                img{
                    width:100%;
                    max-width:500px;
                }
                `}
                    </style>
                </div>

            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { blogid } }) {
    const result = await db.collection('blogs').doc(blogid).get()
    const allCommetsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

    const allComments = allCommetsSnap.docs.map(comDocSnap => comDocSnap.data())
    return {
        props: {
            blog: {
                ...result.data(),
                createdAt: result.data().createdAt.toMillis()
            },
            allComments
        },
    }
}




