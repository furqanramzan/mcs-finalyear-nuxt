export default{
  created(){
  	var self = this

  	if(!this.$store.state.errorsBag){
		  // axios response
	    this.$axios.interceptors.response.use(function (response) {
	      return response;
	    }, function (err) {
	    	console.log(err.response.data)
	      if(err.response != undefined && err.response.status == 422){
					self.$snackbar.open({
	          message: err.response.data.message,
	          type: 'is-danger',
	          position: 'is-top-right',
	          queue: false
	        })
	        var errors = err.response.data.errors
	        for(var error in errors){
	        	self.$validator.errors.add({
						  field: error,
						  msg: errors[error][0]
						})
	        }	      	
	      }
	      return Promise.reject(err);
	    })

	    this.$store.commit('setErrorsBag') 		
  	}

  }
}