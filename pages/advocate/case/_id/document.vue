<template>
  <div>
    <crud :detail="detail">
      <template slot="before_table">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Case No</p>
              <p class="title">{{ documents.case_no }}</p>
            </div>
          </div>
        </div>
      </template>
    </crud>
  </div>
</template>

<script>
import Crud from '@/components/crud/Crud'

export default {
  components: { Crud },
  
  data(){return{
    documents: {
      case_no: null
    },
    detail: {
      api: `advocate/document`,
      title: 'Case Documents',
      createType: 'modal',
      list: {
        api: `advocate/document/?column=lawsuit_id&value=${this.$route.params.id}`,
        columns: [
          {
            name: 'name',
            type: 'download'        
          },
        ],
        date: true,
      },
      create: {
        fields: [ 
          {
            name: 'lawsuit_id',
            visibility: false,
            value: this.$route.params.id
          },
          {
            name: 'name',
            validator: {
              rules: 'required',
            }
          },       
          {
            name: 'file',
            type: 'image', 
            validator: {
              rules: 'required',
            }
          }
        ]
      },
    }
  }},

  created(){
    this.$axios.get(`/advocate/case/${this.$route.params.id}`)
    .then(({data})=> {
      this.documents.case_no = data.case_no
    })
  },
}
</script>