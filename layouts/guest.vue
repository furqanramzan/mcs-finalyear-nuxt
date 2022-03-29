<template>
	<section class="section guest">
		<b-loading is-full-page :active.sync="loading"></b-loading>
		<nuxt/>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import mixinAxiosInterceptors from '@/mixins/axiosInterceptors'

export default{
	mixins: [mixinAxiosInterceptors],

	computed: {
		...mapState(['loading'])
	}
}
</script>