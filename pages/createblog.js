import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { storage, db, serverTimestamp } from '../firebase'
import { EditorState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html'
import { v4 as uuidv4 } from 'uuid';
import router from 'next/router'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })

export default function createblog({ user }) {
    const [context, setContext] = useState(EditorState.createEmpty())
    const [images, setImages] = useState([])
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const uploadImage = (file) => {
        var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(file)
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress == '100') M.toast({ html: 'Image Uploaded', classes: "green" })
            },
            (error) => {
                M.toast({ html: error.message, classes: "red" })
            },
            () => {

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)

                });
            }
        );

    }

    const SubmitDetails = () => {
        const body = draftToHtml(convertToRaw(context.getCurrentContent()))
        try {
            db.collection('blogs').add({
                title,
                body,
                imageUrl: url,
                postedBy: user.uid,
                createdAt: serverTimestamp()
            })
            M.toast({ html: 'Blog Created', classes: "green" })
            router.push('/')
        } catch (err) {
            console.log(err)
            M.toast({ html: 'error creating blog', classes: "red" })
        }

    }

    const uploadImageCallback = (file) => {
      let uploadedImages = images;
      uploadedImages.push(imageObject);

      setImages(uploadedImages)
      const imageObject = {
        file: file,
        localSrc: URL.createObjectURL(file),
      }
      return new Promise(
        (resolve, reject) => {
          resolve({ data: { link: imageObject.localSrc } });
        }
      );
    }
    return (
        <div className="input-field rootdiv">
            <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #5e35b1 deep-purple darken-1">
                    <span>Cover Photo</span>
                    <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <div style={{ border: "1px solid black", padding: '2px', minHeight: '75vh' }}>
                <Editor
                    placeholder="Write Here"
                    editorState={context}
                    onEditorStateChange={setContext}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadEnabled: true, uploadCallback: uploadImageCallback, previewImage: true, alt: { present: true, mandatory: false } }
                    }} />
            </div>
            <button style={{ marginTop: '1rem'}} className="btn #5e35b1 deep-purple darken-1" onClick={() => SubmitDetails()}>Submit Post</button>
            <style jsx>
                {`
                 
                 .rootdiv{
                     margin:30px auto;
                     max-width:900px;
                     padding:10px;
                     text-align:center;
                 }
                 `}
            </style>

        </div>
    )
}
