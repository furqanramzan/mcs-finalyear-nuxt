<template>
  <section class="section is-paddingless">
    <section class="hero is-primary is-small">
      <div class="hero-body">
        <h1 class="title is-inline-block is-marginless">
          {{ create.title }}
        </h1>
        <nuxt-link :to="{ name: create.router }" class="button is-success is-pulled-right">Back</nuxt-link>
      </div>
    </section>

    <section class="section">
      <input-fields :createFields="create.fields" :modelFields="inputs" :copyFields="copyFields" :url="create.api" :page="true"></input-fields>
    </section>
  </section>
</template>

<script>
import InputFields from '@/components/crud/InputFields'

export default{
  components: { InputFields },

  props: ['create'],

  data(){return{
    inputs: {},
    copyFields: {}
  }},

  created () {
    var id = 0
    for(var field in this.create.fields){
      // We will use this for reset button
      this.create.fields['id'] = id
      this.$set(this.copyFields,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : '')
      // We will use this for v-model
      this.$set(this.inputs,  this.create.fields[field].name, this.create.fields[field].value ? this.create.fields[field].value : '')
      id++
    }
  },

  methods: {
    saved(){
      this.$router.push({name: this.create.router})
    },

    title_case(value){
      value = value.toString()
      value = value.replace(/_/g, " ")
      return value.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      )
    },

    snake_case(value){
      value = value.toString()
      return value = value.replace(/_/g, " ")
    },

    select(value, options){
      return options[value]
    }
  }
}
</script>