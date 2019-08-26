<template>
    <div class="footer-page">
        <b-container fluid>
            <b-row>
                <b-col cols=12>
                    <div class="page-footer">
                        <p class="body-footer"> &copy; HackOverflow, Zahriah Friska - 2019 </p>

                    </div>
                </b-col>
                    <div class="author-button">

                    </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .footer-page{
        color : #fff
    }
    .page-footer{
        display: flex;
        justify-content: flex-end;
        margin-left : 40px;
    }
    .body-footer{
        display: flex;
        flex-wrap: flex-end;
        /* margin-left: 70%; */
        padding-right : 10px;
        padding-top : 50px;
    }
    .author-button{
        margin-top : 50px;
        padding-left : 50%;
    }

</style>
