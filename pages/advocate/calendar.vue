<template>
  <section class="section is-paddingless">
    <b-modal :active.sync="modal" has-modal-card>
      <create-modal :create="create" :api="api" :title="title" :modelFields="modelFields" :timeFields="timeFields" :selectFields="selectFields" :copyFields="copyFields" :customSaved="true" @saved="saved"></create-modal>
    </b-modal>

    <section class="hero is-primary is-small">
      <div class="hero-body">
        <h1 class="title is-inline-block is-marginless">
          <b>Hearing Calendar</b>
        </h1>
        <button class="button is-success is-pulled-right" @click="openCreateModal">Add</button>
      </div>
    </section>

    <section class="section is-flex justify-content-center">
      <b-datepicker inline class="is-fullwidth" @input="input" v-model="date" mobile-native>
        </b-datepicker>
    </section>

    <section class="section is-paddingless">
      <crud-table :list="list" :api="api" :params="params" ref="table">
        <template slot="after_actions" slot-scope="props">
          <b-tooltip label="Next Hearing" position="is-top" type="is-info" class="ml-5">
            <span class="tag is-info cursor-pointer" @click="openCreateModal(props)">
              <b-icon icon="send" size="is-small" class="is-text-white"></b-icon>
            </span>
          </b-tooltip>
      </template>
    </crud-table>
    </section>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import CreateModal from '@/components/crud/CreateModal'
import CrudTable from '@/components/crud/Table'

export default {  
  components: { CreateModal, CrudTable },

  data(){return{
    title: "hearing in selected date",
    modelFields: {},
    copyFields: {},
    timeFields: {},
    selectFields: {},
    api: '/advocate/hearing',
    date: new Date(),
    params: {
      date: new Date().toLocaleDateString(),
    },
    list: {
      empty: false,
      columns: [
        {
          name: 'lawsuit_id',
          type: 'relation',
          label: 'Case No',
          entity: 'lawsuit',
          attribute: 'case_no'        
        },
        {
          name: 'date',
          type: 'date'            
        },
        {
          name: 'time',
          type: 'time'
        }
      ],
    },
    create: {
      fields: [ 
        {
          name: 'lawsuit_id',            
          type: 'select',
          label: 'Case No',
          placeholder: "Select case no here",
          api: '/advocate/case',
          display: 'case_no',
          store: 'id',
          validator: {
            rules: 'required',
          }
        },
        {
            name: 'date',
            type: 'datepicker', 
            validator: {
              rules: 'required',
            },
            inline: true
          },
          {
            name: 'time',
            type: 'timepicker', 
            validator: {
              rules: 'required',
            },
            inline: true
          },
      ]
    },
  }},

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

  created(){    
    this.$store.commit('crud/setSort', this.list.sort)
      var id = 0
      for(var field in this.create.fields){
        this.create.fields['id'] = id
        // We will use this for reset button
        this.$set(this.copyFields,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : null)
        // We will use this for v-model
        this.$set(this.modelFields,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : null)
        // We will use this for v-model of time fields
        if(this.create.fields[field].type === 'timepicker')
          this.$set(this.timeFields,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : null)
        if(this.create.fields[field].type === 'select' && !this.create.fields[field].options)
          this.$set(this.selectFields,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : null)
        id++
      }
  },

  methods: {
    ...mapMutations('crud', ['savedinModal', 'setCreateModal', 'setSort', 'setEditItem']),

    input(input){
      this.params.date = input.toLocaleDateString()
      this.$refs.table.ajax(true)
    },

    saved(data){
      var date = new Date(data.date)
      if(this.date.getDate() === date.getDate() && this.date.getMonth() === date.getMonth() && this.date.getFullYear() === date.getFullYear())
        this.savedinModal(data)
      this.setCreateModal()
    },

    openCreateModal(row = false){
      // this.modelFields['date'] = this.date
      if(row){
        this.create.fields[0].visibility = false
        this.modelFields['lawsuit_id'] = row.item.lawsuit_id 
        console.log(row.item)
      }
      this.setCreateModal()
    }
  }
}
</script>

<style>
.datepicker .datepicker-table .datepicker-cell {
  padding: 1.5rem 0.75rem;
}
</style>