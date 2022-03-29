<template>
	<div class="columns">		
		<div class="column is-6 guest-form">
			<h3 class="title">Login</h3>
			<h3 class="subtitle">Hello! let's get started</h3>
			<guest-notification></guest-notification>

      <b-field label="Email" :type="errors.has('email') ? 'is-danger' : 'is-primary'" :message="errors.first('email')">
        <b-input @keyup.native.enter="login" placeholder="Type email here" data-vv-name="email" v-validate="'required|email'" v-model="email" icon="email" autofocus ref="email"></b-input>
      </b-field>

      <b-field label="Password" :type="errors.has('password') ? 'is-danger' : 'is-primary'" :message="errors.first('password')">
          <b-input type="password" @keyup.native.enter="login" placeholder="Type password here" data-vv-name="password" v-validate="'required|min:6|max:10'" v-model="password" icon="email" password-reveal ref="password"></b-input>
      </b-field>

      <button class="button is-medium is-fullwidth is-primary" @click="login">Login</button>
      <h3 class="subtitle has-text-centered my-5"><nuxt-link to="/auth/register">Not have an account?Sign up</nuxt-link></h3>
      <!-- <h3 class="subtitle has-text-centered is-marginless"><nuxt-link to="/forgot">Forgot password?Reset</nuxt-link></h3> -->
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import GuestNotification from '@/components/GuestNotification'
import mixinLogin from '@/mixins/login'

export default{
	middleware: 'guest',

	layout: 'guest',

	components: { GuestNotification },

	mixins: [mixinLogin],

	data(){return{
		email: null,
		password: null,
		fieldError: {
        field: "email",
        msg: "Error message",
        rule: "email" // optional
      }
	}},

	methods:{
		...mapMutations(['startLoading', 'finishLoading']),

		...mapMutations('guest', ['setNotification']),

		 login(){
			 this.$validator.validate().then(result => {
        if (result) {
					this.$axios.post('/auth/login', {email: this.email, password: this.password})
					.then((response) => {
						this.afterLogin(response.data)
					})
					.catch(err => {
						console.log(err.response.data)
					})	
        }
        else{
        	this.$snackbar.open({
            message: 'Provide valid data',
            type: 'is-danger',
            position: 'is-top-right',
            queue: false
	        })
        }
      })
		}
	}
}
</script>