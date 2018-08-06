<template>
  <div id="index">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings" >评价</router-link>
      
      </div>
      <div class="tab-item">
         <router-link to="/seller">商家</router-link>
      </div>
    </div>
   <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getSeller,getGoods ,getRatings} from '../api/api';
import header from './header/header.vue';
export default {
  data () {
    return {
      seller:{},
      goods:{},
      ratings:{},
    }
  },
  methods:{
      getdata(){
            getSeller().then(data => {
              this.seller=data.seller;
            });
            getRatings().then(data => {
              this.ratings=data.ratings;
            });
      }
  },
  created(){
    this.getdata()
  },
  components:{
    'v-header':header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl';
#index
  .tab
    display flex
    width:100%
    height 40px
    line-height 40px
    // border-bottom:1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align center
      &>a
        display block
        font-size 14px
        color:rgb(77,85,93)
        &.router-link-active
          color: rgb(240,20,20)

</style>
