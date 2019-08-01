<template>
    <v-navigation-drawer style="background-color : #9e9e9e!important" absolute dark width="300">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><h1>Actions</h1></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="font-size : 18px; color : inherit" >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'sidenav',
  data () {
    return {
      items: [
        { icon: 'mdi-pen-remove', title: 'Create new Question', path: '/create' },
        { icon: 'mdi-format-list-bulleted', title: 'Your Post', path: '/mypost' }
      ]
    }
  }
}
</script>

<style>
</style>
