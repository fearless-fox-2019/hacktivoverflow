<template>
    <div>
        <b-row v-for="(item, index) in Tags" :key="index">
            <TagPage :data="item"></TagPage>
        </b-row>
    </div>
</template>

<script>
import TagPage from '@/components/TagPage.vue'
import {mapState} from 'vuex'
export default {
    data(){
        return{}
    },
    computed:{
        ...mapState(['Tags'])
    },
    components: {
        TagPage
    }
}
</script>

<style>
</style>
