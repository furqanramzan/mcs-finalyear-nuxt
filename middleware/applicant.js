export default function ({ redirect }) {
  if (!localStorage.getItem('token') || JSON.parse(localStorage.getItem('user')).advocate != 0) {
    return redirect({name: 'auth-login'})
  }
}