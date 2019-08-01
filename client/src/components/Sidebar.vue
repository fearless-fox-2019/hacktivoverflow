<template>
      <div style="padding-top: 30px;">
          <ul class="list-group">
              <li><h5><a  @click="$router.push('/')">Home</a></h5></li>
              <li><h5><a @click="$router.push('/')">Public</a></h5></li>
              <ul><i class="fas fa-globe-asia"></i><small> <a href="">Overflow</a></small></ul>
              <ul><small><a @click="$router.push('/tag')">Tags</a></small></ul>
              <ul><small><a @click="$router.push('/users')">Users</a></small></ul>
          </ul>
      </div>
</template>

<script>
export default {
    data(){
      return {
        collapsed: false,
      };
    },
}
</script>

<style>
a{
    text-decoration: none;
    -webkit-text-fill-color: black;
}
</style>
