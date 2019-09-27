<template>
<div class="App" data-theme="dark">
   <ServiceCallWrapper :endpoint="endpoint" :queryType="queryType" @success="changeLoadState($event)">
      <template v-slot="{ error, load, loading }">

         <BaseLayout>
            <template #Content>

               <span v-if="loading">Loading...</span>

               <component v-else :is="activeComponent" :responseData="tableData" :loading="loading" @deleteUser="removeUser($event)" @showNotification="notifyAction($event)" @saveEdits="saveChanges" @toggleComponent="switchBaseComponent($event)" @saveUser="addUser($event)"></component>
            </template>
         </BaseLayout>

      </template>

   </ServiceCallWrapper>

</div>
</template>

<script>
import axios from 'axios';
import BaseLayout from '@/components/BaseLayout';
import VTable from '@/components/VTable';
import BaseUserDetailCard from '@/components/BaseUserDetailCard';

import ServiceCallWrapper from '@/service/ServiceCallWrapper';
import {
   CrudMixin
} from '@/service/CrudMixin';
export default {

   name: 'App',
   mixins: [CrudMixin],
   components: {
      BaseLayout,
      VTable,
      ServiceCallWrapper,
      BaseUserDetailCard
   },
   data() {
      return {
         endpoint: 'users',
         queryType: 'get',
         queryFilter: {},
         tableData: null,
         items: null,
         liveComponent: 'VTable'
      }
   },
   methods: {
      switchBaseComponent(targetComponent) {
         this.liveComponent = targetComponent;
      },
      /** 
       * Set the data for the application
       */
      changeLoadState(data) {
         this.tableData = data.data;
      },
      /** 
       * Add new user
       */
      addUser(userData) {

         const queryObject = {
            type: 'post',
            endpoint: '/users'
         };
         return this.crudPost(queryObject, userData)
            .then((response) => {

               if (response.success) {
                  this.tableData.push(response.data);
                  this.switchBaseComponent('VTable');
               }
               return response;
            })
            .catch((error) => {
               return error;
            });

      },
      /** 
       * Delete a user
       */
      deleteUser(localIndex, serverID) {

         const queryObject = {
            type: 'delete',
            endpoint: 'users/'
         };
         return this.crudDelete(queryObject, localIndex)
            .then((response) => {

               if (response.success) {

                  var findByID = this.tableData.findIndex(x => x.id == serverID);

                  this.tableData.splice(findByID, 1)

                  this.$message({
                     type: 'success',
                     message: 'User Removed'
                  });
               }
               return response;
            })
            .catch((error) => {
               return error;
            });

      },
      removeUser(user) {
         if (!user) {
            return console.log('Error selecting user')
         };

         this.$confirm(`This will permanently delete ${user.data.name || 'the user'} from your records. Continue?`, 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
         }).then((res) => {

            this.deleteUser(user.index, user.data.id)

         }).catch(() => {
            this.$message({
               type: 'info',
               message: 'Canceled'
            });
         });
      },
      saveChanges(userObject) {
         const queryObject = {
            type: 'patch',
            endpoint: '/users/'
         };
         return this.crudPatch(queryObject, userObject.row)
            .then((response) => {

               if (response.success) {
                  this.$message({
                     type: 'success',
                     message: 'User Record Updated'
                  });
               }
               return response;
            })
            .catch((error) => {
               return error;
            });

      },

   },
   computed: {
      activeComponent() {
         return this.liveComponent
      }
   },
};
</script>
