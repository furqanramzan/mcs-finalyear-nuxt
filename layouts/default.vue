<template>
  <div class="auth">
    <!-- <b-loading is-full-page :active.sync="loading"></b-loading> -->
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="header-nav-left">
        <a href="/">
          <img src="~assets/buefy.png" alt="Forex">
        </a>       
      </div>
      <div class="header-nav-right">
        <button class="button is-light is-outlined" @click="logout">
          Log out
        </button>
        <a role="button" class="navbar-burger" :class="{'is-active': menuActive}" aria-label="menu" aria-expanded="false" @click="showMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> 
      </div>
    </nav>

    <section class="section is-paddingless">
      <div class="columns is-marginless">

        <aside class="column is-2-desktop is-3-tablet bg-skyblue" :class="{'is-active': menuActive}">
          <p class="menu-label is-hidden-touch">Menu</p>
          <ul class="menu-list">
            <li v-for="(item, key) of items" :key="key">
              <nuxt-link :to="'/advocate/'+item.to" active-class="is-active">
                <b-icon :icon="item.icon" /> {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </aside>

        <div class="column is-10-desktop is-9-tablet">
          <nuxt />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixinLogout from '@/mixins/logout'
import mixinAxiosInterceptors from '@/mixins/axiosInterceptors'

export default {
  middleware: 'advocate',

  mixins: [mixinLogout, mixinAxiosInterceptors],

  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          icon: 'home',
          to: 'dashboard'
        },
        {
          title: 'Profile',
          icon: 'face-profile',
          to: 'profile'
        },
        {
          title: 'Clients',
          icon: 'account',
          to: 'client'
        },
        {
          title: 'Case Types',
          icon: 'shape',
          to: 'casetype'
        },
        {
          title: 'Cases',
          icon: 'briefcase',
          to: 'case'
        },
        {
          title: 'Calendar',
          icon: 'calendar',
          to: 'calendar'
        },
        {
          title: 'Appointments',
          icon: 'clock',
          to: 'appointment'
        },
      ]
    }
  },

  computed: {
    ...mapState(['loading', 'menuActive'])
  },

  methods:{
    showMenu(){
      this.$store.commit('setMenuActive')
    },

    async logout(){
      await this.$axios.post('/auth/logout')
      this.afterLogout()
    }
  }
}
</script>
