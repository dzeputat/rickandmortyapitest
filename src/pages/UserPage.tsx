import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import './UserPage.css'
import {
  AccessToken,
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login'
import { useEffect, useState } from 'react'
import { logoFacebook } from 'ionicons/icons'
import { login, logout, selectToken, TokenInfo } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
export interface User {
  id: string
  name: string
  image: string
  birthday: string
  email: string
}

const UserPage: React.FC = () => {
  const [token, setToken] = useState<AccessToken>()

  const authState = useSelector(selectToken)

  const user = authState?.user
  const dispatch = useDispatch()
  const dateNow = moment().format('x')
  const expires = authState?.accessToken.expires
  const [loading, setLoading] = useState(false)
  if (expires) {
    if (dateNow === moment(expires).format('x')) {
      dispatch(logout())
    }
  }
  const loginWithFB = async () => {
    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
    ]
    const result = await FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    })

    if (result.accessToken && result.accessToken.userId) {
      setToken(result.accessToken)
    }
  }
  useEffect(() => {
    loadData()
  }, [token])
  const loadData = async () => {
    if (!token) {
      return
    }
    setLoading(true)

    const url = `https://graph.facebook.com/${token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${token.token}`
    fetch(url)
      .then((data) => data.json())
      .then((userData) => {
        const accessToken: TokenInfo = {
          token: token.token,
          expires: token.expires,
          userId: token.userId,
        }
        const user: User = {
          id: userData.id,
          name: userData.name,
          image: userData.picture.data.url,
          birthday: userData.birthday,
          email: userData.email,
        }
        dispatch(login({ user: user, accessToken: accessToken }))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const logoutWithFB = async () => {
    await FacebookLogin.logout()
    dispatch(logout())
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading && (
          <div className="spinner">
            <IonSpinner name="circles" />
          </div>
        )}
        {user ? (
          <>
            <div className="user">
              <div className="user__img">
                <img src={user.image} />
              </div>
              <div className="user__text">
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
                <h3>{moment(user.birthday).format('D MMMM YYYY')}</h3>
              </div>
            </div>
            <div className="btn">
              <IonButton onClick={logoutWithFB}>Logout</IonButton>
            </div>
          </>
        ) : (
          <div className="btn login">
            <IonLabel className="logo" color="primary">
              <IonIcon
                slot="start"
                color="primary"
                icon={logoFacebook}
              ></IonIcon>
              facebook
            </IonLabel>
            <IonButton onClick={loginWithFB}>Login with Facebook</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default UserPage
