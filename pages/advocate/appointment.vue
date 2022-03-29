<template>
  <div>
    <crud :detail="detail">
      <template slot="after_action" slot-scope="props">
        <b-tooltip label="Approve" position="is-top" type="is-success" class="ml-5">
          <span class="tag is-success cursor-pointer" @click="approve(props)">
            <b-icon icon="cash-100" size="is-small" class="is-text-white"></b-icon>
          </span>
        </b-tooltip>
        <b-tooltip label="Reject" position="is-top" type="is-danger" class="ml-5">
          <span class="tag is-danger cursor-pointer">
            <b-icon icon="cash-100" size="is-small" class="is-text-white"></b-icon>
          </span>
        </b-tooltip>
      </template>
    </crud>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Crud from '@/components/crud/Crud'
import CreateModal from '@/components/crud/CreateModal'

export default {
  components: { Crud, CreateModal },
  
  data(){return{
    modelFields: {},
    copyFields: {},
    timeFields: {},
    selectFields: {},
    detail: {
      api: 'advocate/appointment',
      title: 'Appointments',
      createType: 'modal',
      addButton: false,
      list: {
        edit: false,
        delete: false,
        columns: [
          {
            name: 'advocate_id',
            type: 'relation',
            label: 'Advocate',
            entity: 'advocate',           
            attribute: 'name',           
          },
          {
            name: 'purpose',          
          },
          {
            name: 'status',
            tag: {
              "Approved": 'is-success',
              'Rejected': 'is-danger',
              'Pending': 'is-primary'
            }
          },
          {
            name: 'date',
          },
          {
            name: 'time',
            type: 'time'
          },
        ],
        edit: false,
        delete: false
      },
      create: {
        fields: [
          {
            name: 'date',
            type: 'datepicker',
            validator: {
              rules: 'required'
            }
          },
          {
            name: 'time',
            type: 'timepicker',
            validator: {
              rules: 'required'
            }
          },
        ]
      }
    }
  }},

  methods:{
    ...mapMutations('crud', ['setCreateModal', 'setEditItem']),

    approve({item}){
      this.setEditItem(item)
      this.setCreateModal()
    }
  }
}
</script>