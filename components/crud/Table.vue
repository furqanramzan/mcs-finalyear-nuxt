<template>
	<section class="section">
		<slot name="before_tables"></slot>
		<b-table 
    :data="items" 
    :paginated="items.length > 0"
    backend-pagination
    :total="pagination.total"
    :per-page="pagination.perPage"
    @page-change="onPageChange"
    backend-sorting
    :default-sort="[pagination.sortField, pagination.sortOrder]"
    @sort="onSort"
    >
			<template slot-scope="props">

				<b-table-column 
				v-for="(column, index) in list.columns" 
				:key="index" 
				:field="column.name" 
				:label="column.label ? column.label : title_case(column.name)"				
				centered
				:sortable="column.sortable === false ? false : true"
				>
					<span
					v-if="column.type === 'check'"
					class="tag"
					:class="props.row[column.name] ? 'is-success' : 'is-danger'"
					>
						<b-icon 
						:icon="props.row[column.name] ? 'check' : 'close'"
						size="is-small"
						></b-icon>
					</span>

					<a 
					v-else-if="column.type === 'image'"
					:href="props.row[column.name]" 
					target="_blank"
					>
						<img 
						height="48" width="48" 
						:src="column.sub_type === 'relation' ? props.row.hasOwnProperty(column.entity) ? props.row[column.entity][column.attribute] : props.row[column.name] : props.row[column.name]"
						>						
					</a>

					<span
					v-else-if="column.type === 'download'"
					class="cursor-pointer has-text-primary"
					@click="download(props.row)"
					>
						{{ props.row[column.name]  | truncate }}
					</span>

					<span
					v-else-if="column.type === 'link'"
					>
						<a :href="props.row[column.name]">
							{{ column.type == 'select' ? select(props.row[column.name], column.options) : column.type === 'time' ? time(props.row[column.name]) : column.type === 'date' ? date(props.row[column.name]) : column.type === 'relation' && props.row.hasOwnProperty(column.entity) ? props.row[column.entity][column.attribute] :  props.row[column.name]  | truncate }}
						</a>
					</span>

					<span 
					v-else
					:class="[tag(props.row[column.name], column.tag), {'tag': column.tag}, {'has-text-weight-bold ': column.bold}]"
					>
						{{ column.type == 'select' ? select(props.row[column.name], column.options) : column.type === 'time' ? time(props.row[column.name]) : column.type === 'date' ? date(props.row[column.name]) : column.type === 'relation' && props.row.hasOwnProperty(column.entity) ? props.row[column.entity][column.attribute] : props.row[column.name] | truncate }}
						<strong v-if="column.time_ago && props.row[column.name]" class="is-block">
							<timeago :datetime="props.row[column.name]"  :auto-update="60"></timeago>
						</strong>
					</span>

				</b-table-column>

				<b-table-column label="Date" v-if="list.date" centered>
					{{ new Date(props.row.created_at).toLocaleDateString() }}
				</b-table-column>

				<b-table-column field="created_at" label="Time" v-if="list.time" centered sortable>
					{{ new Date(props.row.created_at).toLocaleTimeString('en-US', { hour12: false }) }}
				</b-table-column>

				<b-table-column v-if="list.actions !== false" label="Actions">
					<div class="is-flex">
						<slot name="before_actions" :item="props.row"></slot>

						<b-tooltip v-if="list.edit !== false" label="Edit" position="is-top" type="is-success">
		          <span class="tag is-success cursor-pointer" @click="edit(props.row)">
		            <b-icon icon="circle-edit-outline" size="is-small"></b-icon>
		          </span>
		        </b-tooltip>

		        <b-tooltip v-if="list.delete !== false" label="Delete" position="is-top" type="is-danger" class="ml-5">
		          <span class="tag is-danger cursor-pointer" @click="destroy(props.row)">
		            <b-icon icon="delete" size="is-small"></b-icon>
		          </span>
		        </b-tooltip>

						<slot name="after_actions" :item="props.row"></slot>
					</div>
				</b-table-column>

			</template>
			<template slot="empty">
				<section class="section">
					<div class="content has-text-grey has-text-centered">
						<p>
							<b-icon
								icon="emoticon-sad"
								size="is-large">
							</b-icon>
						</p>
						<p>{{ $store.state.loading ? 'Wait request in progess.' : 'Nothing here.' }}</p>
					</div>
				</section>
			</template>
		</b-table>
	</section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
	props: ['list', 'api', 'params'],

	data(){return{
		sortField: 'created_at',
    sortOrder: 'desc',
    defaultSortOrder: 'desc',
	}},

	computed: {
		...mapState('crud', ['items', 'pagination'])
	},

	mounted(){
		if(this.api){
			this.setItems([])
			this.ajax()			
		}
	},

	methods: {
		...mapMutations('crud', ['getItems', 'mounted', 'setPage', 'setSort', 'setItems', 'deleteItem', 'setCreateModal', 'setEditItem']),

		onPageChange(page){
			this.setPage(page)
			this.ajax()
		},

		onSort(field, order){
			this.setSort({ field, order })
			this.ajax()
		},
		
		async ajax(){
			var params = {
				sortField: this.pagination.sortField,
				sortOrder: this.pagination.sortOrder,
				page: this.pagination.page,
			}
			var api =	this.list.api ? this.list.api : this.api
			await this.$axios.get(this.api, {params: {...params, ...this.params}})
			.then((response) => {
				this.getItems(response.data)
			})
			.catch(err => {
				console.log(err.response.data)
			})
		},

		destroy(item){
			this.$dialog.confirm({
        message: 'Are you sure to delete item?',
        onConfirm: async () => {
        	await this.$axios.delete(`${this.api}/${item.id}`)
        	.then(response => {
        		this.deleteItem(item)
        		this.$snackbar.open({
		          message: 'Item successfully deleted.',
		          type: 'is-success',
		          position: 'is-top-right',
		          queue: false
		        })		        
		        if(this.items.length == 0){
		        	this.ajax()
		        }
        	})
        }
	    })
		},

		edit(item){
			this.setEditItem(item)
			this.setCreateModal()
		},

		title_case(value){
			value = value.toString()
			value = value.replace(/_/g, " ")
		  return value.replace(/\w\S*/g, function(txt) {
		        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		    }
			)
		},

		select(value, options){
			return options[value]
		},

		time(value){
			if(value){
				value = new Date(value)
				return value.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })	
			}
			else
				return '--'
		},

		date(value){
			if(value){
				value = new Date(value)
				return value.toLocaleDateString()	
			}
			else
				return '--'
		},

		check(value){
			var icon = value ? 'check' : 'close'
			return `<b-icon v-if="option.icon" :icon="${icon}"></b-icon>`
		},

		tag(value, tag){
			if(typeof tag === 'string')
				return tag
			else if(typeof tag === 'object')
				return this.select(value, tag)
		},

		download(row){
			this.$axios({
	      url: `${this.api}/${row.id}`,
	      method: 'GET',
	      responseType: 'blob', // important
	    }).then((response) => {
	       const url = window.URL.createObjectURL(new Blob([response.data]))
	       const link = document.createElement('a')
	       link.href = url
	       link.setAttribute('download', `${row.name}.${row.extension}`)
	       document.body.appendChild(link)
	       link.click()
	    })
		}
	}
}
</script>