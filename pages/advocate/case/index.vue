<template>
  <div>
    <crud :detail="detail">
      <template slot="after_action" slot-scope="props">
        <b-tooltip label="Payments" position="is-top" type="is-info" class="ml-5">
          <nuxt-link :to="{name: 'advocate-case-id-payment', params: {id: props.item.id}}">
            <span class="tag is-info cursor-pointer">
              <b-icon icon="cash-100" size="is-small" class="is-text-white"></b-icon>
            </span>
          </nuxt-link>
        </b-tooltip>
        <b-tooltip label="Documents" position="is-top" type="is-info" class="ml-5">
          <nuxt-link :to="{name: 'advocate-case-id-document', params: {id: props.item.id}}">
            <span class="tag is-info cursor-pointer">
              <b-icon icon="book" size="is-small" class="is-text-white"></b-icon>
            </span>
          </nuxt-link>
        </b-tooltip>
      </template>
    </crud>
  </div>
</template>

<script>
import Crud from '@/components/crud/Crud'

export default {
  components: { Crud },
  
  data(){return{
    detail: {
      api: 'advocate/case',
      title: 'Cases',
      createType: 'modal',
      list: {
        columns: [
          {
            name: 'client_id',
            type: 'relation',
            label: 'Client Name',
            entity: 'client',
            attribute: 'name'         
          },
          {
            name: 'case_type_id',
            type: 'relation', 
            label: 'Case Type',
            entity: 'case_type',
            attribute: 'name'        
          },
          {
            name: 'court_no',            
          },
          {
            name: 'case_no'
          },
          {
            name: 'total_payment',           
          },
        ],
      },
      create: {
        fields: [        
          {
            name: 'client_id',            
            type: 'select',
            label: 'Client Name',
            placeholder: "Select client name here",
            api: '/advocate/client',
            display: 'name',
            store: 'id',
            validator: {
              rules: 'required',
            }
          },
          {
            name: 'case_type_id',            
            type: 'select',
            label: 'Case Type',
            placeholder: "Select case type here",
            api: '/advocate/casetype',
            display: 'name',
            store: 'id',
            validator: {
              rules: 'required',
            }
          },
          {
            name: 'court_no',
            validator: {
              rules: 'required|max:190',
            } 
          },
          {
            name: 'case_no', 
            validator: {
              rules: 'required|max:190',
            }             
          },
          {
            name: 'total_payment',
            validator: {
              rules: 'required|max:190',
            }            
          },
        ]
      },
    }
  }},
}
</script>