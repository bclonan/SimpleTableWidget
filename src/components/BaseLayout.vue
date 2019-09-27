<template>
<el-container style="height: 100vh;">

   <el-container>

      <slot name="Content"></slot>

   </el-container>
</el-container>
</template>

<script>
export default {
   name: 'BaseLayout'
}
</script>
