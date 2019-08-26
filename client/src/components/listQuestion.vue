<template>
    <div class="list-question">
        <div class="listss">
            <!-- <h3>{{question}}</h3> -->
            <router-link :to="`/question/${question._id}`"> <h5>{{question.title}}</h5> </router-link>
            <p>Description : </p>
            <p style="text-align:justify;">{{question.question}}</p>
            Tags :
            <div class="tag">
                <p v-for="(tag, index) in question.tags" :key="index" style="margin-right:10px;"> <router-link :to="`/tags/${tag}`">{{tag}}</router-link></p>
            </div>
            <span style="margin-top:20px;">Asked by : {{question.UserId.firstname}} {{question.UserId.lastname}}</span>
            <hr class="separetd">
        </div>
    </div>
</template>

<script>
export default {
  props: ['question']

}
</script>

<style>
.list-question{
    margin-top : 40px;
    font-size: 14px;
}

.listss{
    /* border-top : 0.5px solid black;
    border-bottom: 0.5px solid black; */
    /* height: 60px; */
}
.separetd{
    margin-top : 20px;
    border-color : black;
}

.tag{
    display : flex;
    /* margin-right : 10px;  */
}

</style>
