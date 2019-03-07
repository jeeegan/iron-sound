import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  },

  signup(formData) {
    return service
      .post('/signup', formData)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
      .then(res => res.data)
      .catch(errHandler);
  },

  upload(formData) {
    return service
      .post('/uploads', formData)
      .then(res => res.data)
      .catch(errHandler);
  },

  uploadTrackImage(formData) {
    return service
      .put('/upload-track-image', formData)
      .then(res => res.data)
      .catch(errHandler);
  },

  update(formData) {
    return service
      .put('/profile', formData)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteUser() {
    return service
      .delete('/profile')
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteTrack(trackId) {
    return service
      .delete(`/tracks/${trackId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  userData() {
    return service
      .get('/loggedin')
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler);
  },

  getAlbum(name) {
    return service
      .get(`/album/${name}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfileByDisplayName(displayName) {
    return service
      .get(`/profile/${displayName}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getTrack(trackID) {
    return service
      .get(`/tracks/${trackID}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getUploadData() {
    return service
      .get('/uploads')
      .then(res => res.data)
      .catch(errHandler)
  },

}
