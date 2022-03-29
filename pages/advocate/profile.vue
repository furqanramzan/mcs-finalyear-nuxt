<template>
    <section class="section is-paddingless">
      <b-modal :active.sync="modal" has-modal-card>
        <create-modal :create="create" :api="api" :title="title" :modelFields="modelFields" :timeFields="timeFields" :selectFields="selectFields" :copyFields="copyFields" :customSaved="true" @saved="saved"></create-modal>
      </b-modal>
      <section class="hero is-primary is-small">
        <div class="hero-body">
          <h1 class="title is-inline-block is-marginless">
            <b>Profile</b>
          </h1>
          <button class="button is-success is-pulled-right" @click="openCreateModal">Edit</button>
        </div>
      </section>
      <section class="section is-flex justify-content-center">
        <div class="box" style="width: 500px;">
          <section class="section is-flex" style="flex-direction: column; align-items: flex-start;">
            <div class="content" style="width: 100%;">
              <h2 style="margin-bottom: 5px;">Name</h2>
              <h4 style="border-bottom: 3px solid grey; width: 100%">{{ advocate.name | truncate }}</h4>
              <h2 style="margin-bottom: 5px;">City</h2>
              <h4 style="border-bottom: 3px solid grey; width: 100%">{{ advocate.city | truncate }}</h4>
              <h2 style="margin-bottom: 5px;">Fees</h2>
              <h4 style="border-bottom: 3px solid grey; width: 100%">{{ advocate.fees |truncate }}</h4>
              <h2 style="margin-bottom: 5px;">Speciality</h2>
              <h4 style="border-bottom: 3px solid grey; width: 100%">{{ advocate.speciality |truncate }}</h4>
            </div>
          </section>
        </div>
      </section>
    </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import CreateModal from '@/components/crud/CreateModal'

export default {
  components: { CreateModal },
  
  data(){return{
    title: "Edit your profile",
    modelFields: {},
    copyFields: {},
    timeFields: {},
    selectFields: {},
    advocate: {
      name: null,
      city: null,
      fees: null,
      speciality: null,
    },
    profile: false,
    api: 'advocate/profile',
    create: {
      fields: [ 
        {
          name: 'name',
          validator: {
            rules: 'required',
          },
        },
        {
          name: 'city',
          validator: {
            rules: 'required',
          },
        },
        {
          name: 'fees',
          type: 'number', 
          validator: {
            rules: 'required|numeric',
          },
        },
        {
          name: 'speciality', 
          validator: {
            rules: 'required',
          },
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

  mounted(){
    this.$axios.get('advocate/profile')
    .then(({data}) => {
      this.advocate.name = data.name
      if(data.advocate){
        this.advocate.fees = data.advocate.fees
        this.advocate.city = data.advocate.city
        this.advocate.speciality = data.advocate.speciality
        this.profile = true
      }
    })
  },

  methods: {
    ...mapMutations('crud', ['savedinModal', 'setCreateModal', 'setSort', 'setEditItem']),

    saved(data){
      this.advocate.fees = data.advocate.fees
      this.advocate.city = data.advocate.city
      this.advocate.speciality = data.advocate.speciality
      this.profile = true
      this.openCreateModal()
    },

    openCreateModal(){
      if(this.profile)
        this.setEditItem(this.advocate)
      this.setCreateModal()
    },

    saved(data){
      this.advocate.name = data.name
      this.advocate.fees = data.advocate.fees
      this.advocate.city = data.advocate.city
      this.advocate.speciality = data.advocate.speciality
      this.profile = true
      this.setCreateModal()
    }
  }
}
</script>