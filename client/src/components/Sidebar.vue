<template>
<div  class="sidebar">
<div class ="bawah">
  <div id="logo">
    <img src="" />
  </div>
  <h1><a href="#">Company</a></h1>
  <ul>
    <li><a href="#">Users</a>
      <ul id="sublist">
        <li><a href="#">Import</a></li>
        <li><a href="#">Invitations</a></li>
      </ul>
    </li>
    <!--<li><a href="#">Organisations</a></li>-->
    <li><a href="#">Polls</a></li>
  </ul>
 </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.bawah {
    margin-top: 110px;
}
.sidebar {
  background-color:white;
  height: 100%;
  width: 150px;
  max-width: 1024px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

h1 {
  display: inline;
  height: 29px;
  width: 156px;
}

ul,
#sublist {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  height: 20px;
  width: 200px;
  text-decoration: none;
  display: block;
}

.container-grid {
  background-color: #eef;
  margin-left: 180px;
}
</style>
