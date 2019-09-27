import axios from 'axios';


export default {
   name: 'ServiceCallWrapper',
   created() {
      this.load();
   },
   props: {
      baseUrl: {
         type: String,
         // The JSONPlaceholder API is a fake API
         // basically a Lorem Ipsum JSON API.
         default: process.env.VUE_APP_BASEURL,
      },
      endpoint: {
         type: String,
      },
      queryType: {
         type: String,
         default: 'get'
      }
   },
   data () {
      return {
         // Create a new axios instance.
         // See: https://github.com/axios/axios#creating-an-instance
         api: axios.create({
            baseURL: process.env.VUE_APP_BASEURL,
            withCredentials: true,
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
         }),
         data: null,
         error: null,
         loading: false,
         response: null
      };
   },
   methods: {
      // The `query` method will handle
      // different query types for us.
      async query (type, ...params) {


         // If we're currently loading content
         if (this.loading) return;

         this.loading = true;
         try {

            const response = await this.api[type](...params);
            this.data = response.data;
            this.response = response.data;
           
            /*
            @NOTE: At times it is usefull or important to freeze the returned object.
           const frozenRespData = this.data.map(item => {
              return Object.freeze(item);
            });
            console.log(frozenRespData)
           */

         



            this.error = null;
            this.$emit('success', response);
         } catch (error) {
            this.data = null;
            this.error = error.response;
            this.$emit('error', error);
         }
         this.loading = false;
      },
      load () {
         if (this.queryType) {
            return this.query(`${this.queryType}`, this.endpoint);
         }

      },
   },
   render () {
      // Render the default scoped slot and
      // provide data and method properties
      // via the slot scope.
      return this.$scopedSlots.default({
         response: this.response,
         reqURL: this.endpoint,
         error: this.error,
         load: this.load,
         loading: this.loading,
         queryType: this.queryType,
         query: this.query
      });
   },
};