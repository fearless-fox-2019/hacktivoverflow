<template>
    <div class="sidebar-page">
        <div class="sidebar-item">
            <ul class="listing-sidebar">
                <router-link to="/" class="list-sidebar"><li>Home</li></router-link>
                <li class="list-sidebar">Public</li>
                <router-link to="/tags" class="list-subs"><li>Tags</li></router-link>
                <router-link to="/users" class="list-subs"><li>Users</li></router-link>
                <!-- <li class="list-subs">Tags</li>
                <li class="list-subs">User</li> -->
                <router-link to="#" class="list-sidebar"><li>FAQ</li></router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

.sidebar-item{
    height: 100;
}
ul {
    padding : 0;
    padding-top : 30px;
}
ul .listing-sidebar{
    margin: 0;
    padding: 0;
}

.list-sidebar{
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    list-style: none;
    border-bottom: 0.5px solid grey;
}

.list-sidebar:last-child{
    border-top : 0.5px solid grey;
    border-bottom: none;
}

.list-subs{
    display: flex;
    align-items: center;
    height: 40px;
    margin-left : 50px;
    list-style: none;
}

router-link{
  display: block;
  color: rgb(240, 20, 20)
}
</style>
