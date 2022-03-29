<template>
  <div>
    <crud :detail="detail">
      <template slot="after_action" slot-scope="props">
        <b-tooltip label="Request for appointment " position="is-top" type="is-info" class="ml-5">
            <span class="tag is-info cursor-pointer" @click="openCreateModal(props)">
              <b-icon icon="clock" size="is-small" class="is-text-white"></b-icon>
            </span>
        </b-tooltip>
      </template>
    </crud>
    <b-modal :active.sync="modal" has-modal-card>
      <create-modal :create="detail.create" :api="detail.api" :title="detail.title" :modelFields="modelFields" :timeFields="timeFields" :selectFields="selectFields" :copyFields="copyFields" customSaved="true" @saved="saved"></create-modal>
    </b-modal>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Crud from '@/components/crud/Crud'
import CreateModal from '@/components/crud/CreateModal'

export default {
  layout: 'applicant',

  components: { Crud, CreateModal },
  
  data(){return{
    modelFields: {},
    copyFields: {},
    timeFields: {},
    selectFields: {},
    detail: {
      api: 'applicant/advocate',
      title: 'Advocates',
      createType: false,
      list: {
        columns: [
          {
            name: 'name',         
          },
          {
            name: 'id',
            type: 'relation',
            label: 'City',
            entity: 'advocate',           
            attribute: 'city',           
          },
          {
            name: 'id',
            type: 'relation',
            label: 'Fees',
            entity: 'advocate',           
            attribute: 'fees',           
          },
          {
            name: 'id',
            type: 'relation',
            label: 'Speciality',
            entity: 'advocate',           
            attribute: 'speciality',           
          },
        ],
        edit: false,
        delete: false
      },
      create: {
        fields: [   
          {
            name: 'user_id',
            visibility: false
          },     
          {
            name: 'purpose',
            validator: {
              rules: 'required',
            }
          },
        ]
      },
    }
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

  created () {
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
  },

  methods: {
    ...mapMutations('crud', ['setCreateModal', 'setSort', 'setEditItem']),

    openCreateModal({item}){
      this.modelFields['user_id'] = item.id
      this.setCreateModal()
    },

    saved(data){
      this.setCreateModal()
    }
  }
}
</script>