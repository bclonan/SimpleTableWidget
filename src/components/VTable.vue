<template>
<el-main>
   <el-row :gutter="10">
      <el-table :data="responseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" :default-sort="{prop: 'name', order: 'descending'}" :row-class-name="tableRowClassName" v-loading="loading" style="width: 100vw">
         <el-table-column type="expand">
            <template slot-scope="props">
               <div class="user-edit" v-if="selectedUserEditing === props.row.id">
                  <!-- <p>Name :  <el-input v-model="newName" :placeholder="props.row.name"></el-input></p>
            <p>Username : <el-input v-model="newUserName" :placeholder="props.row.username"></el-input></p>
            <p>Email : <el-input v-model="newEmail" :placeholder="props.row.email"></el-input></p> -->

                  <el-form :label-position="labelPosition" label-width="100px">
                     <el-form-item label="Name">
                        <el-input v-model="props.row.name" :placeholder="props.row.name"></el-input>
                     </el-form-item>
                     <el-form-item label="Username">
                        <el-input v-model="props.row.username" :placeholder="props.row.username"></el-input>
                     </el-form-item>
                     <el-form-item label="Email">
                        <el-input v-model="props.row.email" :placeholder="props.row.email"></el-input>
                     </el-form-item>
                  </el-form>
               </div>
               <div class="user-details" v-else>
                  <p>Name : {{ props.row.name }}</p>
                  <p>Username : {{ props.row.username }}</p>
                  <p>Email : {{ props.row.email }}</p>
               </div>

               <el-button size="mini" @click="handleEdit(props.$index, props.row)" v-show="selectedUserEditing !== props.row.id">Edit</el-button>
               <el-button size="mini" @click="saveEdit(props.$index, props.row)" v-show="selectedUserEditing === props.row.id">Save</el-button>

               <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)">Delete</el-button>
               <el-button v-show="selectedUserEditing === props.row.id" size="mini" type="warning" @click="cancelEditUser(props.$index, props.row)">Cancel</el-button>

            </template>
         </el-table-column>
         <el-table-column label="Name" prop="name" sortable>
         </el-table-column>
         <el-table-column label="Username" prop="username">
         </el-table-column>
         <el-table-column label="Email" prop="email">
         </el-table-column>
         <el-table-column align="right">
            <template slot="header" slot-scope="scope">
               <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
         </el-table-column>
      </el-table>
   </el-row>
   <el-row :gutter="10" style="margin-top: 2%;">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
         <el-button type="info" @click="$emit('toggleComponent', 'BaseUserDetailCard')">Add New User<i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-col>

   </el-row>
</el-main>
</template>

<script>
export default {
   name: 'VTable',
   props: {
      responseData: {
         type: Array,
         default: function () {
            return []
         }
      },
      loading: {
         type: Boolean,
         default: true
      }
   },
   data() {
      return {
         search: '',
         currentPage: 0,
         selectedEditUser: null,
         newName: null,
         newUserName: null,
         newEmail: null,
         labelPosition: 'left',
      }
   },
   methods: {
      handleEdit(index, row) {
         console.table(row.id)
         if (!row.id) {
            return console.log('There was an error editing this user')
         };
         this.selectedEditUser = row.id;
        
      },
      saveEdit(index, row) {

      

         if(row.name, row.username, row.email) {
            let userObject = {
               
               index : index,
               row : row
            };
           
            return this.$emit('saveEdits', userObject)
         } else {
            let warningNotification = {
               title : 'Warning',
               message : 'Please fill out all of the form fields',
               type : 'warning'
            };
            return this.$emit('showNotification', warningNotification);
         }

      },
      cancelEditUser() {
         this.selectedEditUser = null;
      },
      handleDelete(index, userData) {
         let userDetails = {
            index: index,
            data: userData,
         };
         this.$emit('deleteUser', userDetails)
      },
      tableRowClassName({
         row,
         rowIndex
      }) {

         if (rowIndex % 2 == 0) {
            return 'row-style-one';
         } else {
            return 'row-style-two';
         }

      }
   },
   computed: {
      selectedUserEditing() {
         return this.selectedEditUser;
      }
   },
}
</script>

<style>
.el-table {
   font-family: Nunito Bold;
   font-size: 1rem;
   border-top-right-radius: .25rem;
   border-bottom-right-radius: .25rem;
}

.el-table thead {
   color: #ffffff;
   font-weight: 500;
}

.el-table tbody {
   font-family: Nunito;
   font-size: 1rem;
   font-weight: 400;
}

.el-table .row-style-one {
   background: #1F1A24;
   color: #dcdcdcd9;
}

.el-table .row-style-two {
   background-color: #080808 !important;
   color: whitesmoke;
   font-family: Nunito;
}

.el-table th,
.el-table tr {
   /* background-color: #FFF; */
}

.el-table th {
   background: #1F1F1F !important;
   background-color: #1F1F1F;
}

.custom-thead-style {
   background: #1F1F1F;
   background-color: #1F1F1F;
}

.el-table td,
.el-table th.is-leaf {
   border-bottom: 0px !important;
}

.el-table--enable-row-hover .el-table__body tr:hover>td {
   background-color: #1F1F1F !important;
   color: white;
}

.el-table__expand-icon {
   position: relative;
   cursor: pointer;
   color: #47ffe6 !important;
   -webkit-transition: -webkit-transform .2s ease-in-out;
   transition: -webkit-transform .2s ease-in-out;
   transition: transform .2s ease-in-out;
   transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;
   transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;

}
</style>
