<template>
  <div>
    <b-field 
    v-for="(field, index) in createFields" 
    :key="field.id" 
    :label="field.label ? field.label : title_case(field.name)" 
    :type="errors.has(field.name) ? 'is-danger' : field.color ? field.color : 'is-primary'" 
    :message="errors.first(field.name) ? errors.first(field.name) : field.message"
    v-if="field.visibility !== false && !field.depend || modelFields[field.depend] && field.dependOption !== undefined && modelFields[field.dependOption.field] === field.dependOption.option"
    >

      <b-select       
      v-if="field.type === 'select'"
      @keyup.native.enter="save"
      :placeholder="field.placeholder ? field.placeholder : `Select ${snake_case(field.name)} here`" 
      :size="field.size ? field.size : 'is-medium'"
      v-model="modelFields[field.name]" 
      :data-vv-name="field.name" 
      :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
      v-validate="field.validator ? field.validator.rules : ''"
      expanded 
      @change.native="field.customInput === true ? other(modelFields[field.name], index) : ''"
      >
        <option 
        v-if="!field.options"
        v-for="(option, key) in selectFields[field.name]"
        :key="key"
        :value="option[field.store]">
          {{ option[field.display] }}
        </option>
        <option
        v-if="field.options"
        v-for="(option, key) in field.options"
        :key="key"
        :value="key">
          {{ option }}
        </option>
        <option 
        value="option_to_convert_select_into_input"
        v-if="field.customInput === true"
        >Other</option>
      </b-select>



      <b-field 
      v-else-if="field.type === 'radio-button'" class="is-marginless"
      >
        <b-radio-button
        @keyup.native.enter="save"
        :size="field.size ? field.size : ''"
        v-model="modelFields[field.name]" 
        :data-vv-name="field.name" 
        :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
        v-validate="field.validator ? field.validator.rules : ''"
        v-for="(option, key) in field.options"
        :key="key"      
        :native-value="option.value || option.value === 0 ? option.value : option.label"
        :type="option.type ? option.type : 'is-primary'">
            <b-icon v-if="option.icon" :icon="option.icon"></b-icon>
            <span>{{ option.label }}</span>
        </b-radio-button>
      </b-field>



      <b-checkbox 
      v-else-if="field.type === 'checkbox'"
      @keyup.native.enter="save" 
      :size="field.size ? field.size : ''"
      v-model="modelFields[field.name]"
      :true-value="field.true"
      :false-value="field.false"
      >
        {{ field.checkbox_message }}
      </b-checkbox>

      <b-datepicker
      v-else-if="field.type === 'datepicker'"
      v-model="timeFields[field.name]" 
      :data-vv-name="field.name" 
      :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
      v-validate="field.validator ? field.validator.rules : ''"
      placeholder="Click to select date"
      icon="calendar-today"
      @input="dateInput(field)"
      mobile-native
      :inline="field.inline === true ? true : false">
      </b-datepicker>

      <b-timepicker
      v-else-if="field.type === 'timepicker'"
      v-model="modelFields[field.name]" 
      :data-vv-name="field.name" 
      :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
      v-validate="field.validator ? field.validator.rules : ''"
      placeholder="Click to select time"
      icon="clock"
      @input="timeInput(field)"
      mobile-native
      :inline="field.inline === true ? true : false">
        <button class="button is-primary"
          @click="modelFields[field.name] = new Date()">
          <b-icon icon="clock"></b-icon>
          <span>Now</span>
        </button>
        <button class="button is-danger"
          @click="modelFields[field.name] = null">
          <b-icon icon="close"></b-icon>
          <span>Clear</span>
        </button>
      </b-timepicker>

      <b-upload
      v-else-if="field.type === 'image'"
      v-model="modelFields[field.name]"
      :data-vv-name="field.name" 
      :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
      v-validate="field.validator ? field.validator.rules : ''"
      :type="errors.has(field.name) ? 'is-danger' : field.color ? field.color : 'is-primary'"
      :multiple="field.multiple"
      drag-drop 
      >
        <section v-if="field.multiple" class="section is-paddingless">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
          <div class="tags">
              <span v-for="(file, index) in modelFields[field.name]"
                  :key="index"
                  class="tag is-primary" >
                  {{file.name}}
              </span>
          </div>
        </section>
        <a v-else class="button" :class="errors.has(field.name) ? 'is-danger' : field.color ? field.color : 'is-primary'">
          <b-icon icon="upload"></b-icon>
          <span>Click or drop file to upload</span>
        </a>
        <span v-if="!field.multiple && modelFields[field.name]" class="file-name is-inline-block">
            {{ modelFields[field.name].name }}
        </span>
      </b-upload>

      <b-input 
      v-else
      @keyup.native.enter="save"
      :placeholder="field.placeholder ? field.placeholder : `Enter ${snake_case(field.name)} here`"  
      :size="field.size ? field.size : 'is-medium'"
      v-model="modelFields[field.name]" 
      :data-vv-name="field.name" 
      :data-vv-as="field.validator ? field.validator.as ? field.validator.as : snake_case(field.name) : ''" 
      v-validate="field.validator ? field.validator.rules : ''"
      :type="field.type ? field.type : ''" 
      >
      </b-input>


    </b-field>
    <button class="button is-primary" @click="save" v-if="page">Save</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import mixinErrors from '@/mixins/errors'

export default{
  mixins: [mixinErrors],

  props: ['createFields', 'modelFields', 'timeFields', 'selectFields', 'copyFields', 'url', 'page'],

  computed:{
    ...mapState('crud', ['editItem'])
  },

  created(){
    if(this.editItem){
      var self = this
      this.createFields.forEach(async function(field){
        if(field.type === 'timepicker')
          self.modelFields[field.name] = new Date(self.editItem[field.name])
        else if(field.type === 'image')
          self.modelFields[field.name] = null
        else if(field.type === 'select' && !field.options){
          await self.$axios.get(field.api+'?display='+field.display+'&store='+field.store)
          .then(response => {
            self.selectFields[field.name] = response.data
          })
        }
        else
          self.modelFields[field.name] = self.editItem[field.name]
      })
    }
    else{
      var self = this
      this.createFields.forEach(async function(field){
        if(field.type === 'select' && !field.options){
          await self.$axios.get(field.api+'?display='+field.display+'&store='+field.store)
          .then(response => {
            self.selectFields[field.name] = response.data
          })
        }
      })
    }
  },

  methods: {
    timeInput(field){
      var hour12
      field.hour12 === true ? hour12 = true : hour12 = false
      this.modelFields[field.name] = this.timeFields[field.name].toLocaleTimeString('en-US', { hour12: hour12, hour: 'numeric', minute: 'numeric' })
    },

    dateInput(field){
      this.modelFields[field.name] = this.timeFields[field.name].toLocaleDateString()
    },

    save(){ 
      this.$validator.validate().then(result => {
        if(result){
          if(this.createFields.find(x => x.type === 'image')){
            var formData = new FormData()
            var self = this
            this.createFields.forEach(function(field){
              if(field.type === 'image'){
                if(field.multiple === true){
                  for(var image in self.modelFields[field.name]){
                    formData.append(field.name+'[]', self.modelFields[field.name][image])
                  }
                }
                else{
                  formData.append(field.name, self.modelFields[field.name])
                }
              }
              else{
                formData.append(field.name, self.modelFields[field.name])
              }
            })            
          }
          else{
            var formData = this.modelFields
          }
          if(this.editItem){
            if(this.createFields.find(x => x.type === 'image')){           
              formData.append('_method', 'put')
            }
            else{
              formData['_method'] = 'put'
            }
            this.$axios.post(`${this.url}/${this.editItem.id}`, formData)
            .then((response) => {
              this.$snackbar.open({
                message: 'Item successfully updated.',
                type: 'is-success',
                position: 'is-top-right',
                queue: false
              })
              this.$parent.editSaved(response.data)
            })
          }
          else{
            this.$axios.post(this.url, formData)
            .then((response) => {
              this.$snackbar.open({
                message: 'Item successfully added.',
                type: 'is-success',
                position: 'is-top-right',
                queue: false
              })
              this.$parent.saved(response.data)
            })
          }         
        }
        else{
          this.$snackbar.open({
            message: 'Provide valid data',
            type: 'is-danger',
            position: 'is-top-right',
            queue: false
          })
        }
      })   
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
    },

    other(option, index){
      if(option === 'option_to_convert_select_into_input'){
        this.createFields[index].type = ''
        this.modelFields[this.createFields[index].name] = ''
      }
    }
  }
}
</script>


<style>
.datepicker .datepicker-table .datepicker-cell {
  padding: 1.5rem 0.75rem;
}
</style>