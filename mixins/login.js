export default{
  methods: {
    afterLogin(data){
    	if(data.email_exist){
    		this.$validator.errors.add({
				  field: 'email',
				  msg: 'The selected email has already taken'
				})
			}
			if(data.email_not_exist){
    		this.$validator.errors.add({
				  field: 'email',
				  msg: 'The selected email does not exist'
				})
			}
			else if(data.password){
				this.$validator.errors.add({
				  field: 'password',
				  msg: 'The selected password does not match'
				})
			}
			else if(data.token && data.user){
				localStorage.setItem('token', data.token.access_token)
				localStorage.setItem('user', JSON.stringify(data.user))
				if(data.user.advocate)
					this.$router.replace({name: 'advocate-dashboard'})
				else
					this.$router.replace({name: 'applicant-dashboard'})
			}
			else{
				this.$snackbar.open({
          message: 'An error occured. Try agian.',
          type: 'is-danger',
          position: 'is-top-right',
          queue: false
        })
			}
    }
  }
}