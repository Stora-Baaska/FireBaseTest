import styles from '../../css/component'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../../firebase'
import firebase from 'firebase'
import router from 'next/router'

import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import Parallax from '../../components/Parallax/Parallax'

import Face from '@material-ui/icons/Face'
import Chat from '@material-ui/icons/Chat'
import Build from '@material-ui/icons/Build'

const useStyles = makeStyles(styles)

export default function BasicInfo () {
  const [url, setUrl] = React.useState('')
  const user = firebase.auth().currentUser
  const classes = useStyles()
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  const SubmitDetails = () => {
    const user = firebase.auth().currentUser
    try {
      user.updateProfile({
        photoURL: url
      })
      M.toast({ html: 'Profile Updated', classes: 'green' })
      router.push('/')
    } catch (err) {
      console.log(err)
      M.toast({ html: 'error Updating Profile', classes: 'red' })
    }
  }

  const ImgUpload = ({
    onChange,
    src
  }) => {
    return (
      <label for='photo-upload' className='custom-file-upload fas'>
        <div className='img-wrap img-upload'>
          <img for='photo-upload' src={src} />
        </div>
        <input id='photo-upload' type='file' onChange={onChange} />
      </label>
    )
  }

  const uploadImage = (file) => {
    const uploadTask = storage.ref().child(`image/${uuidv4()}`).put(file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (progress === '100') M.toast({ html: 'Image Uploaded', classes: 'green' })
      },
      (error) => {
        M.toast({ html: error.message, classes: 'red' })
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          setUrl(downloadURL)
        })
      }
    )
  }

  return (
    <div>
      <Parallax image='https://c.pxhere.com/photos/30/9f/work_space_office_space_workspace_conference_table-162761.jpg!d' style={{ maxHeight: '400px' }} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer style={{ marginBottom: '30px', height: '70vh' }}>
          <GridItem>
            <CustomTabs
              headerColor='primary'
              tabs={[
                {
                  tabName: 'Profile',
                  tabIcon: Face,
                  tabContent: (
                  // user.photoURL !== null
                  //   ? (
                  //     <div>
                  //       <div>
                  //         <img src={user.profpic} alt='...' className={imageClasses} />
                  //       </div>
                  //       <h3 className={classes.textCenter}>
                  //         {user.displayName}
                  //       </h3>
                  //       <h5 className={classes.textCenter}>
                  //         {user.email}
                  //       </h5>
                  //     </div>
                  //     )
                  //   : <div>
                  //     <div className={classes.textCenter} id='profile-container'>
                  //       <label className='custom-file-upload fas'>
                  //         <ImgUpload onChange={(file) => uploadImage(file)} src={url} />
                  //       </label>
                  //     </div>
                  //     <input type='file' name='profile_photo' id='imageUpload' placeholder='Photo' capture onChange={(e) => uploadImage(e.target.files[0])} />
                  //     <h3 className={classes.textCenter}>
                  //       {user.displayName}
                  //     </h3>
                  //     <h5 className={classes.textCenter}>
                  //       {user.email}
                  //     </h5>
                  //     {user.emailVerified === false
                  //       ? <h5 className={classes.textCenter}> Имэйл хаяг аа баталгаажуулна уу</h5>
                  //       : <h5 className={classes.textCenter}> Имэйл Баталгаажсан </h5>}
                  //     <button className='btn #5e35b1 deep-purple darken-1' onClick={() => SubmitDetails()}> Apply </button>
                  //   </div>
                    <divw />
                  )
                },
                {
                  tabName: 'Comments',
                  tabIcon: Chat,
                  tabContent: (
                    <p className={classes.textCenter}>
                      Comment Section
                    </p>
                  )
                },
                {
                  tabName: 'Settings',
                  tabIcon: Build,
                  tabContent: (
                    <p className={classes.textCenter}>
                      Settings
                    </p>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>

  )
}
