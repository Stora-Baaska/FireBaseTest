import {useState,useEffect} from 'react'
import dynamic from 'next/dynamic'
// import { v4 as uuidv4 } from 'uuid';
import {storage,db,serverTimestamp} from '../firebase'
import { EditorState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod=>mod.Editor),{ssr: false})


export default function createblog({user}) {
    const [context,setContext] = useState(() => EditorState.createEmpty())

    const SubmitDetails = ()=>{
        const body = draftToHtml(convertToRaw(context.getCurrentContent()))
        try{
             db.collection('blogs').add({
              body,
            //   imageUrl:url,
              postedBy:user.uid,
              createdAt:serverTimestamp()
          })
          M.toast({html: 'Blog Created',classes:"green"})   
        }catch(err){
            console.log(err)
            M.toast({html:'error creating blog',classes:"red"})    
        }

    }
    return (
        <div className="input-field rootdiv">
            <h3>Create A Blog !!</h3>
            <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            <Editor
            placeholder="Write Here"
            editorState={context}
            onEditorStateChange={setContext}/>
            </div>
             <button className="btn #5e35b1 deep-purple darken-1"  onClick={()=>SubmitDetails()}>Submit Post</button>

             <style jsx>
                 {`
                 
                 .rootdiv{
                     margin:30px auto;
                     max-width:900px;
                     padding:20px;
                     text-align:center;
                 }
                 `}
             </style>

        </div>
    )
}
