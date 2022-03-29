<template>
	<div class="columns">		
		<div class="column is-6 guest-form">
			<h3 class="title">Register</h3>
			<h3 class="subtitle">Hello! let's get started</h3>
      <b-field label="Name" :type="errors.has('name') ? 'is-danger' : 'is-primary'" :message="errors.first('name')">
          <b-input @keyup.native.enter="register" placeholder="Type name here" data-vv-name="name" v-validate="'required|alpha_spaces|max:190'" v-model="name" icon="account" autofocus></b-input>
      </b-field>

      <b-field label="Email" :type="errors.has('email') ? 'is-danger' : 'is-primary'" :message="errors.first('email')">
          <b-input @keyup.native.enter="register" placeholder="Type email here" data-vv-name="email" v-validate="'required|email'" v-model="email" icon="email"></b-input>
      </b-field>

      <b-field label="Who you are?" :type="errors.has('advocate') ? 'is-danger' : 'is-primary'" :message="errors.first('advocate')">
      	<b-field>
          <b-radio v-model="advocate" native-value="1" v-validate="'required'" data-vv-name="advocate" data-vv-as="who you are" :type="errors.has('advocate') ? 'is-danger' : ''">Advocate</b-radio>
          <b-radio v-model="advocate" native-value="0" v-validate="'required'" data-vv-name="advocate" data-vv-as="who you are" :type="errors.has('advocate') ? 'is-danger' : ''">Applicant</b-radio>
        </b-field>
      </b-field>

      <b-field label="Password" :type="errors.has('password') ? 'is-danger' : 'is-primary'" :message="errors.first('password')">
          <b-input type="password" @keyup.native.enter="register" placeholder="Type password here" data-vv-name="password" v-validate="'required|min:6|max:190'" v-model="password" icon="security" password-reveal ref="password"></b-input>
      </b-field>

      <b-field label="Confirm Password" :type="errors.has('password_confirmation') ? 'is-danger' : 'is-primary'" :message="errors.first('password_confirmation')">
          <b-input type="password" @keyup.native.enter="register" placeholder="Type password here"  v-validate="'confirmed:password'"data-vv-name="password_confirmation" icon="security" v-model="password_confirmation" data-vv-as="password" password-reveal></b-input>
      </b-field>

      <button class="button is-medium is-fullwidth is-primary" @click="register">Register</button>
      <h3 class="subtitle has-text-centered"><nuxt-link to="/login">Already have an account?Sign in</nuxt-link></h3>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import mixinLogin from '@/mixins/login'
import mixinErrors from '@/mixins/errors'

export default{
	middleware: 'guest',

	layout: 'guest',

	mixins: [mixinLogin, mixinErrors],

	data(){return{
		name: null,
		email: null,
		advocate: null,
		password: null,
		password_confirmation: null,
		loading: false,
	}},

	methods:{
		...mapMutations(['startLoading', 'finishLoading']),

		register(){
			this.$validator.validate().then(result => {
        if (result) { 
					this.$axios.post('/auth/register', {name: this.name, email: this.email, advocate: this.advocate, password: this.password, password_confirmation: this.password_confirmation})
					.then((response) => {
						this.afterLogin(response.data)
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