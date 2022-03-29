<template>
  <div>
    <crud :detail="detail">
      <template slot="before_table">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Case No</p>
              <p class="title">{{ payment.case_no }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">TOTAL payment</p>
              <p class="title">{{ payment.total }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">RECEIVED payment</p>
              <p class="title">{{ payment.received | zeroIfNull }}</p>
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
    payment: {
      total: null,
      received: null,
      case_no: null
    },
    detail: {
      api: `advocate/payment`,
      title: 'Case Payments',
      createType: 'modal',
      list: {
        api: `advocate/payment/?column=lawsuit_id&value=${this.$route.params.id}`,
        columns: [
          {
            name: 'received',         
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
            name: 'received', 
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
      this.payment.total = data.total_payment
      this.payment.received = data.received_payment
      this.payment.case_no = data.case_no
    })
  }
}
</script>