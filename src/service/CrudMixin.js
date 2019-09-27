import axios from 'axios';

/**
 * Create a unique identifier for user id
 * 
 * ex. console.log(id_generator());
 */
function id_generator() {
    var dateTime = new Date().getTime();
    var randomID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dateTime + Math.random() * 16) % 16 | 0;
        dateTime = Math.floor(dateTime / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return randomID;
}


export const CrudMixin = {
    data() {
        return {
            api: axios.create({
                baseURL: process.env.VUE_APP_BASEURL,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            data: null,
            response: null
        };
    },
    methods: {
        notifyAction(notifyObject) {
            this.$notify({
                title: notifyObject.title,
                message: notifyObject.message,
                type: notifyObject.type
            });
        },
        async crudDelete(queryObject, userID) {
            if (!queryObject) {
                return console.log('There has been an error constructing the crud query');
            };




            /**
             * Data to send to server
             */
            let paramaters = {
                id: userID
            }

            /**
             * Data to send back to App.vue
             */




            try {
                let request = await this.api.delete(queryObject.endpoint + userID);



                if (request.status == 201 || 200) {

                    let resp = {
                        success: true,
                        data: request.data
                    }

                    return resp;
                }

                return;
            } catch (error) {
                this.data = null;

                this.$emit('error', error);
            }




        },


        async crudPost(queryObject, crudData) {



            if (!queryObject) {
                return console.log('There has been an error constructing the crud query');
            };


            /**
             * Data to send to server
             */
            let paramaters = {
                id: id_generator(),
                ...crudData
            }

            /**
             * Data to send back to App.vue
             */




            try {

                let request = await this.api.post(queryObject.endpoint, paramaters);
              


                if (request.status == 201 || 200) {

                    let resp = {
                        success: true,
                        data: request.data
                    }

                    return resp;
                }

                return;
            } catch (error) {
                this.data = null;

                this.$emit('error', error);
            }




        },
        async crudPatch(queryObject, crudData) {



            if (!queryObject) {
                return console.log('There has been an error constructing the crud query');
            };


            /**
             * Data to send to server
             */
            let paramaters = {
                ...crudData
            }

            /**
             * Data to send back to App.vue
             */




            try {

                let request = await this.api.patch(queryObject.endpoint + crudData.id, paramaters);



                if (request.status == 201 || 200) {

                    let resp = {
                        success: true,
                        data: request.data
                    }

                    return resp;
                }

                return;
            } catch (error) {
                this.data = null;

                this.$emit('error', error);
            }




        }
    }
};