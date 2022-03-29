<template>
  <div>
    <crud :detail="detail"></crud>
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
      api: 'applicant/appointment',
      title: 'Appointments',
      list: {
        actions: false,
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
            type: 'datepicker'
          },
          {
            name: 'time',
            type: 'timepicker'
          },
        ],
        edit: false,
        delete: false
      },
    }
  }},
}
</script>