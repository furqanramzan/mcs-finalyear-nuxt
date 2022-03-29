<template>
  <div>
    <crud :detail="detail"></crud>
  </div>
</template>

<script>
import Crud from '@/components/crud/Crud'

export default {
  components: { Crud },
  
  data(){return{
    detail: {
      api: 'advocate/client',
      title: 'Clients',
      createType: 'modal',
      list: {
        columns: [
          {
            name: 'name',         
          },
          {
            name: 'email',            
          },
          {
            name: 'phone_no'
          },
          {
            name: 'address',           
          },
          {
            name: 'cnic_no',            
          }
        ],
      },
      create: {
        fields: [        
          {
            name: 'name',
            validator: {
              rules: 'required|max:190',
            }
          },
          {
            name: 'email',
            validator: {
              rules: 'required|max:190|email',
            } 
          },
          {
            name: 'phone_no', 
            validator: {
              rules: 'required|max:190',
            }             
          },
          {
            name: 'address',
            validator: {
              rules: 'required',
            }            
          },
          {
            name: 'cnic_no',
            validator: {
              rules: 'required|max:15',
            }
          },
        ]
      },
    }
  }},
}
</script>