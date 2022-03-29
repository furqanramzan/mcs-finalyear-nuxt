<template>
	<section>		
		<div class="modal-card">
			<header class="modal-card-head has-background-primary">
				<p class="modal-card-title has-text-white has-text-weight-bold">{{ `${title}` }}</p>
			</header>
			<section class="modal-card-body">
        <input-fields :createFields="create.fields" :modelFields="modelFields" :copyFields="copyFields" :timeFields="timeFields" :selectFields="selectFields" :url="api" ref="inputFields"></input-fields>
			</section>
			<footer class="modal-card-foot justify-content-end">
				<button class="button" type="button" @click="$parent.close()">Cancle</button>
				<button class="button is-primary" type="button" @click="reset">Reset</button>
				<button class="button is-success" @click="save">Save</button>
			</footer>
		</div>
	</section>
</template>

<script>
import {mapMutations} from 'vuex'
import InputFields from '@/components/crud/InputFields'

export default{
  components: { InputFields },

  props: ['create', 'api', 'title', 'modelFields', 'copyFields', 'customSaved', 'timeFields', 'selectFields'],

  methods: {
		...mapMutations('crud', ['savedinModal', 'setCreateModal', 'setEditItem', 'editSavedinModal']),

    save(){
      this.$refs.inputFields.save()
    },
    
    saved(data){
      Object.assign(this.modelFields, this.copyFields)
      if(this.customSaved)
        this.$emit('saved', data)
      else{
        this.savedinModal(data)
        this.setCreateModal()
      }
    },

    editSaved(data){
      Object.assign(this.modelFields, this.copyFields)
      this.setEditItem(null)
      this.setCreateModal()
      if(this.customSaved)
        this.$emit('saved', data)
      else{
        this.editSavedinModal(data)
      }
    },

    reset(){
    	Object.assign(this.modelFields, this.copyFields)
    }
  }
}
</script>