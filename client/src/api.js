import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(formData) {
    return service
      .post('/signup', formData)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  upload(formData) {
    return service
      .post('/upload', formData)
      .then(res => res.data)
      .catch(errHandler)
  },

  update(formData) {
    console.log("DEBUG formData:",formData)
    return service
      .post('/update', formData)
      .then(res => res.data)
      .catch(errHandler)
  },

  userData() {
    return service
      .get('/loggedin')
      .then(res => {
        return res.data
      })
      .catch(errHandler)
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => {
        return res.data;
      })
      .catch(errHandler);
  },

  getProfileByDisplayName(displayName) {
    return service
      .get(`/profile/${displayName}`)
      .then(res => {
        return res.data;
      })
      .catch(errHandler);
  },

  getTrack(trackID) {
    return service
      .get(`/track/${trackID}`)
      .then(res => {
        return res.data;
      })
      .catch(errHandler);
  },

  getUploadData() {
    return service
      .get('/')
      .then(res => {
        return res.data
      })
      .catch(errHandler)
  },

}
