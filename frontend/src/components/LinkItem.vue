<template>
  <!-- <div>{{link.description}} ({{link.url}})</div> -->
  <div>{{user.name}}, {{user.email}}, {{user.age}}</div>
</template>

<script>
  export default {
    name: 'LinkItem',
    props: ['user']
  }
</script>