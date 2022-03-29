import Vue from 'vue'

Vue.filter('truncate', val => {
  if(val === null || val === undefined || val === '')
   return '--'
  return val.length > 50 ? `${val.substring(0, 50)}...` : val
})

Vue.filter('zeroIfNull', val => {
  if(val === null || val === undefined || val === '')
  	return 0
  else
  	return val
})

Vue.filter('upperCase', val => val.toUpperCase())