export const state = () => ({
	loading: false,
	axiosInterceptors: false,
	errorsBag: false,
	menuActive: false
})

export const mutations = {
	startLoading(state){ state.loading = true  },  
  finishLoading(state){ state.loading = false },

  setAxiosInterceptors(state){ state.axiosInterceptors = true },

  setErrorsBag(state){state.errorsBag = true},

  setMenuActive(state){ state.menuActive = !state.menuActive}
}