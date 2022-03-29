export default{
	data(){return{
		logoutInterceptors: null
	}},

	created(){
    var self = this
		// axios response		
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
    
    this.logoutInterceptors = this.$axios.interceptors.response.use(function (response) {
      return response;
    }, function (err) {
    	// Unauthorized action
    	if(err.response != undefined && err.response.status === 401){
        self.$snackbar.open({
          message: 'Authentication token is expired.',
          type: 'is-danger',
          position: 'is-top-right',
          queue: false
        })
        self.afterLogout()
      }
      return Promise.reject(err);
    })
	},

  methods: {
    afterLogout(){
    	localStorage.removeItem('token')      
      localStorage.removeItem('user')      
      this.$router.replace('/login')
      this.$axios.interceptors.response.eject(this.logoutInterceptors);
    }
  }
}