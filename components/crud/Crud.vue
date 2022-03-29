<template>
	<section class="section is-paddingless">

		<section class="hero is-primary is-small">
		  <div class="hero-body">
			<h1 class="title is-inline-block is-marginless">
			  <b>{{ detail.title }}</b>
			</h1>
			<nuxt-link :to="{name: detail.router+'-create'}" class="button is-success is-pulled-right" v-if="detail.createType === 'page'">Add</nuxt-link>
			<button class="button is-success is-pulled-right" @click="setCreateModal"  v-if="detail.createType === 'modal' && detail.create && detail.addButton != false">Add</button>
		  </div>
		</section>

		<b-modal :active.sync="modal" has-modal-card v-if="detail.createType === 'modal'">
			<create-modal :create="detail.create" :api="detail.api" :title="detail.title" :modelFields="modelFields" :timeFields="timeFields" :selectFields="selectFields" :copyFields="copyFields"></create-modal>
		</b-modal>

		<crud-table :list="detail.list" :api="detail.api">
			<template slot="before_tables">
				<slot name="before_table"></slot>
			</template>
			<template slot="before_actions">
				<slot name="before_action"></slot>
			</template>
			<template slot="after_actions" slot-scope="props">
				<slot name="after_action" :item="props.item"></slot>
			</template>
		</crud-table>

	</section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import CreateModal from '@/components/crud/CreateModal'
import CrudTable from '@/components/crud/Table'

export default {
	props: ['detail'],

	components: { CreateModal, CrudTable, },

	data() {
		return {
		  modelFields: {},
		  copyFields: {},
		  timeFields: {},
		  selectFields: {},
		}
	},

	computed: {
		...mapState('crud', ['createModal']),

		modal: {
			get(){
				return this.createModal
			},
			set(newValue){
				Object.assign(this.modelFields, this.copyFields)
				this.setEditItem(null)
				return this.setCreateModal()
			}
		}
	},

	created () {
		this.setSort(this.detail.list.sort)
		
		if(this.detail.create && this.detail.createType === 'modal'){
	    var id = 0
	    for(var field in this.detail.create.fields){
	      this.detail.create.fields['id'] = id
	      // We will use this for reset button
	      this.$set(this.copyFields,  this.detail.create.fields[field].name, this.detail.create.fields[field].value ? this.detail.create.fields[field].value : null)
	      // We will use this for v-model
	      this.$set(this.modelFields,  this.detail.create.fields[field].name, this.detail.create.fields[field].value ? this.detail.create.fields[field].value : null)
	      // We will use this for v-model of time fields
	      if(this.detail.create.fields[field].type === 'timepicker')
		      this.$set(this.timeFields,  this.detail.create.fields[field].name, this.detail.create.fields[field].value ? this.detail.create.fields[field].value : null)
		    if(this.detail.create.fields[field].type === 'select' && !this.detail.create.fields[field].options)
		      this.$set(this.selectFields,  this.detail.create.fields[field].name, this.detail.create.fields[field].value ? this.detail.create.fields[field].value : null)
	      id++
	    }
    }
  },

	methods: {
		...mapMutations('crud', ['setCreateModal', 'setSort', 'setEditItem']),
	}
}
</script>