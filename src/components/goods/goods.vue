<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
            </li>
          </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
           <li v-for="(item,index) in goods" :key="index" class="foods-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="(food,listindex ) in item.foods" :key="listindex" class="food-item border-1px">
                    <div class="icon">
                      <img :src="food.icon" width="57px" height="57px" alt="">
                    </div>
                    <div class="content">
                       <h2 class="name">{{food.name}}</h2>
                       <p class="description">{{food.description}}</p>
                       <div class="extra">
                         <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                       </div>
                       <div class="price">
                         <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                       </div>
                    </div>
                </li>
              </ul>
          </li>
        </ul>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {getGoods } from '../../api/api';
import BScroll from 'better-scroll'
export default {
  props:{
    seller:{
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],   //每一块的高度
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];//listHeight[length]返回undefined,所以可以用!height2做判断不是最后一个
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      // selectFoods() {
      //   //foods会传入购物车组件中，作为购物车的数据来源
      //   let foods = [];
      //   this.goods.forEach((good) => {
      //     good.foods.forEach((food) => {
      //       //food.count>0表示该商品被选过
      //       if (food.count) {
      //         foods.push(food);
      //       }
      //     });
      //   });
      //   return foods;
      // }
    },
  methods:{
      _initScroll(){
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
              click: true  //取消默认阻止事件
          });

          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
              click: true , //取消默认阻止事件
              probeType: 3   //监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
          });
          this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          //获取每个li的高度，放入一个数组中
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      //左右连动映射
      selectMenu(index, event) {
        //自己开发的event._constructed是为true,pc浏览器没有此事件
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
  },
  created(){
    this.classMap=['decrease','discount','special','invoice','guarantee'];
    getGoods().then(data => {
      this.goods=data.goods;
       //this.$nextTick() => 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
          //数据发生变化后，不能直接更新在dom上，需要在回调函数中刷新DOM,即异步加载DOM
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight(); //计算高度
          });
        
      
    });
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods 
    display flex
    position absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            display table
            height 54px
            width 56px
            line-height 14px
            padding 0 12px
            &.current
                position relative
                z-index 10 
                margin-top -1px
                background #fff
                font-weight 700
                .text
                    border-none()
            .icon 
                display inline-block
                width:12px
                height:12px
                margin-right:2px
                background-size 12px 12px 
                background-repeat no-repeat
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &.guarantee
                    bg-image('guarantee_3')
                &.invoice
                    bg-image('invoice_3')
                &.special
                    bg-image('special_3')
            .text 
                display table-cell
                width 56px
                border-1px(rgba(7,17,27,0.1))
                vertical-align middle
                font-size 12px

    .foods-wrapper
        flex 1
        .title
            padding-left 14px
            height 26px
            line-height 26px
            border-left 2px solid  #d9dde1
            font-size 12px
            color rgb(147,153,159)
            background #f3f5f7
        .food-item
            display flex
            margin 18px
            padding-bottom 18px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
                border-none()
                margin-bottom 0
            .icon 
                flex 0 0 57px
                margin-right 10px
            .content
                flex 1
                .name 
                    margin 2px 0 8px 0
                    height 14px
                    line-height 14px
                    font-size 14px
                    color rgb(7,17,27)
                .description,.extra
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)
                .description
                    margin-bottom 8px
                    line-height 12px
                .extra
                    .count
                        margin-right 12px
                .price
                    font-weight 700
                    line-height 24px
                    .now
                        margin-right 8px
                        font-size 14px
                        color rgb(240,20,20)
                    .old
                        text-decoration line-through
                        font-size 10px
                        color rgb(147,153,159)



                   




</style>
