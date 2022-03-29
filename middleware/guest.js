export default function ({ redirect }) {
  if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).advocate == 0) {
    return redirect({name: 'applicant-dashboard'})
  }

  if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).advocate == 1) {
    return redirect({name: 'advocate-dashboard'})
  }
}