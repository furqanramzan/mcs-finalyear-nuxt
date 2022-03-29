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
      api: 'advocate/casetype',
      title: 'Case Types',
      createType: 'modal',
      list: {
        columns: [
          {
            name: 'name',         
          },
        ],
      },
      create: {
        fields: [        
          {
            name: 'name',
            validator: {
              rules: 'required',
            }
          }
        ]
      },
    }
  }},
}
</script>