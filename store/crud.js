export const state = () => ({
	items: [],
	createModal: false,
	editItem: null,
	pagination: {
		total: null,
    perPage: null,
    page: 1,
    sortField: null,
    sortOrder: null,
	}
})

export const mutations = {
	setItems(state, items){state.items = items},

	setPage(state, page){state.pagination.page = page},

	setSort(state, sort){
		if(sort){
			state.pagination.sortField = sort.field
			state.pagination.sortOrder = sort.order
		}
		else{
			state.pagination.sortField = 'created_at'
			state.pagination.sortOrder = 'desc'
		}
	},

	getItems(state, data){
		state.items = data.data
		state.pagination.total = data.total
		state.pagination.perPage = data.per_page
		state.pagination.page = data.currentPage
	},

	savedinModal(state, item){state.items.unshift(item)},

	editSavedinModal(state, item){
		var index = state.items.findIndex(x => x.id === Number(item.id))
		Object.assign(state.items[index], item)
	},

	setCreateModal(state){state.createModal = !state.createModal},

	setEditItem(state, value){state.editItem = value},

	deleteItem (state, item) { 
		var index = state.items.findIndex(x => x.id === Number(item.id))
		state.items.splice(index, 1) 
	},
}