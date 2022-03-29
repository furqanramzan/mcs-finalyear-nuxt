export default{
  created(){
  	var self = this

  	if(!this.$store.state.axiosInterceptors){
	  	// axios request
	  	this.$axios.interceptors.request.use(function (config) { 		  		
		      self.$store.commit('startLoading')
			    return config;
			  }, function (error) {
		  	self.$snackbar.open({
	        message: 'An error occured. Try agian.',
	        type: 'is-danger',
	        position: 'is-top-right',
	        queue: false
	      })
		    return Promise.reject(error);
		  })

		  // axios response
	    this.$axios.interceptors.response.use(function (response) {
	      self.$store.commit('finishLoading')
	      return response;
	    }, function (err) {
	      self.$store.commit('finishLoading')
	      if(err.response != undefined && err.response.status != 422 && err.response.status != 401){
					self.$snackbar.open({
	          message: 'An error occured. Try agian.',
	          type: 'is-danger',
	          position: 'is-top-right',
	          queue: false
	        })      	
	      }
	      else if(err.response === undefined){
	      	self.$snackbar.open({
	          message: 'An error occured. Refresh the page.',
	          type: 'is-danger',
	          position: 'is-top-right',
	          queue: false
	        })
	      }
	      return Promise.reject(err);
	    })

	    this.$store.commit('setAxiosInterceptors') 		
  	}

  }
}