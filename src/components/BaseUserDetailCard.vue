<template>
<el-main>
   <el-row :gutter="10">
      <el-card class="box-card">
         <div slot="header" class="clearfix">
            <span>New User</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('toggleComponent', 'VTable')">Cancel</el-button>
         </div>
         <div>
            <el-form>
               <el-form-item label="Name" :label-width="formLabelWidth">
                  <el-input v-model="name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="Username" :label-width="formLabelWidth">
                  <el-input v-model="username" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="Email" :label-width="formLabelWidth">
                  <el-input v-model="email" autocomplete="off"></el-input>
               </el-form-item>
            </el-form>

         </div>
         <span style="float: right; padding: 2%">
            <el-button @click="$emit('toggleComponent', 'VTable')">Cancel</el-button>
            <el-button type="primary" @click="createUser">Confirm</el-button>
         </span>
      </el-card>

   </el-row>
</el-main>
</template>

<script>
export default {
   name: 'BaseUserDetailCard',
   props: {
      newUserFormVisible: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         name: null,
         username: null,
         phone: null,
         website: null,
         address: {
            city: 'monroe',
            geo: {
               lat: "-38.2386",
               lng: "57.2232"
            },
            street: '1 apple way',
            suite: '22',
            zipcode: '08883'
         },
         email: null,
         company: {
            bs: '',
            catchPhrase: '',
            name: ''
         },

         dialogFormVisible: true,
         formLabelWidth: '120px'
      };
   },
   methods: {
      createUser() {
         let userObject = {
            name: this.name,
            username: this.username,
            phone: this.phone,
            website: this.website,
            address: this.address,
            email: this.email,
            company: this.company,
            id: this.id
         }

         this.$emit('saveUser', userObject);

      },
      /**
       * Reset the form data before closing the dialog
       */
      resetFormData() {

         this.name = null;
         this.username = null;
         this.email = null;
      }
   },
}
</script>
