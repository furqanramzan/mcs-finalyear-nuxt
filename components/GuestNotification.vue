<template>
	<b-notification :type="notification.type" :active.sync="notification.active" :closable="false" class="is-marginless">
    {{ notification.message }}
  </b-notification>
</template>

<script>
import { mapState } from 'vuex'
export default{
	computed: {
		...mapState('guest', ['notification'])
	},
}
</script>