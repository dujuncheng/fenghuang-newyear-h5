<template>
  <div id="app" @touchmove.prevent>
      <div class="heng">
        <p>听说，手机竖起来抢到的福最准哦~</p>
      </div>
      <div class="music-icon">
        <background-music ref="audioComponent"></background-music>
      </div>
      <transition name="fade">
        <div class="beforeLoad" v-show="!preload.isLoaded" @click="endPre">
          <img class="hua1" src="http://upload-images.jianshu.io/upload_images/6185311-f6b6f16c42068317.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="hua2" src="http://upload-images.jianshu.io/upload_images/6185311-360463560dbe0d47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="title" src="http://upload-images.jianshu.io/upload_images/6185311-ff0bc560fd8e697c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="left-shizi" src="http://upload-images.jianshu.io/upload_images/6185311-9afd89681d840b1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="left-shizi-shen" src="http://upload-images.jianshu.io/upload_images/6185311-eb0e564c06f8cea5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="right-shizi" src="http://upload-images.jianshu.io/upload_images/6185311-9afd89681d840b1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <img class="right-shizi-shen" src="http://upload-images.jianshu.io/upload_images/6185311-eb0e564c06f8cea5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">

          <!--一句话-->
          <p  class='fenghuang-text' v-if="showCanPress">点击屏幕，开始游戏</p>
          <!-- 预加载进度条-->
          <div class="progress">
            <div class="progressbar" :style="{'width': preload.progress + '%'}"></div>
          </div>
        </div>
      </transition>

     <img class="modal-bg" src="http://upload-images.jianshu.io/upload_images/6185311-6ab2059da3d71c42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">

    <div class="modal" v-if="nowFu">
      <p class="modal-text">{{nowFu}}</p>
    </div>
    <div class="page" :style="{'transform':`translate(${-50*step}vw,0)`}" @touchmove.prevent v-show="preload.isLoaded">
        <div class="column-list">
          <div class="column-container" v-for="(column, index) in columnlist">
            <!--下面的柱子-->
            <div class="column" :style="{width:`${column.width/46.875}rem`, height:`${column.height/46.875}rem`}" :id=" 'column' + index">
              <img class="column-image" :src="column.img" alt="">
            </div>
          </div>
        </div>
        <!--跳来跳去的钱钱，共有四种状态 -->
        <div id="money" class="money" :style="moneyMove" >
          <img class="money-img dun" id="moneyId" src="http://upload-images.jianshu.io/upload_images/6185311-8b1915f313b55aae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
        </div>
      </div>

      <transition name="fade">
        <!--按钮旁边的提示-->
        <p class="btn-tips" v-if="showTips" v-show="preload.isLoaded">按的越久，跳的越高</p>
      </transition>
      <img class="btn-bg" src="http://upload-images.jianshu.io/upload_images/6185311-8bef7070643bace8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></img>

      <div class="btn" @touchstart="startGather" @touchend="endGather" v-show="preload.isLoaded">
        <!--按钮两种状态-->
        <div id="btnId" class="btn-img"></div>
      </div>

      <!--最后的的结果页-->
      <div class="result-page" v-if="showResult">
        <p class="total1">我为狗年集了 {{hasFu}} 个福气!</p>
        <p class="total2" v-if="mostFu.text" >收获了最多的{{mostFu.text}}福</p>
        <p class="fuImg-text">{{mostFu.text}}福</p>
        <div class="left-btn" @click="playAgain"></div>
        <div class="right-btn" @click="showShare"></div>
      </div>

      <!--分享的浮层-->
      <div class="share-container" v-if="shareShow">
        <img class="close-btn" @click="closeShare" src="http://image.dydata.io/HUvidyGvAdbhWRW4d5NoH1.png" alt="">
        <div class="erwei-container">
          <img class="erwei-img" src="http://upload-images.jianshu.io/upload_images/6185311-3eab0e0166dfe943.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
          <p class="erwei-text">财经连环话欢乐出品</p>
        </div>
        <div class="mader-container">
          <p class="mader">监制：杨起慧</p>
          <p class="mader">策划：廖越</p>
          <p class="mader">制作：杜俊成</p>
          <p class="mader">设计：王姝钰</p>
          <p class="mader">手绘：张楚婕</p>
        </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import backgroundMusic from './components/background-music'
import columnlist from './config/cloumn-config.js'
// 预加载的构造函数
import {resLoader} from './utils/resLoader'
// 预加载的图片列表
import preloadList from './config/preload-images'
// 小人
import moneyPerson from './config/money-person'


// 主人公的状态
const XIADUN = 'http://upload-images.jianshu.io/upload_images/6185311-8912088cb6d7f343.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240';
const FEIQI = 'http://upload-images.jianshu.io/upload_images/6185311-8b1915f313b55aae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const JIANGLUO = 'http://upload-images.jianshu.io/upload_images/6185311-396074d9dd886184.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const ZHILI = 'http://upload-images.jianshu.io/upload_images/6185311-2fb082cc19673915.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'

// 按钮的状态
const ISPRESS = 'http://upload-images.jianshu.io/upload_images/6185311-8da5c032fa3827d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
const NOPRESS = 'http://upload-images.jianshu.io/upload_images/6185311-f71ba2899382f265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'


export default {
  name: 'App',
  methods: {

	  closeShare () {
		  this.shareShow = false
    },
    // 显示分享的弹窗
	  showShare () {
      this.shareShow = true
		  var shareIcon = 'http://upload-images.jianshu.io/upload_images/6185311-1967cdea8dcd7ff7.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
				  shareTitle = `我为狗年集了${this.hasFu}个福气，你要来试试吗？`,
				  shareContent = '为狗年集福气',
				  shareLink= window.location.href;
		  if (/MicroMessenger/.test(navigator.userAgent) || true) {
			  var wxConfigParams = {};
			  $.ajax({
				  url: 'https://api.3g.ifeng.com/weishare_token_api',
				  type: 'get',
				  dataType: 'jsonp',
				  data: {url: window.location.href},
				  success: function (data) {
					  wxConfigParams.debug = false;
					  wxConfigParams.appId = data.appId;
					  wxConfigParams.timestamp = data.timestamp;
					  wxConfigParams.nonceStr = data.nonceStr;
					  wxConfigParams.signature = data.signature;
					  wxConfigParams.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone'];
					  wx.config(wxConfigParams);
					  wx.ready(function () {
						  wx.onMenuShareAppMessage({
							  title: shareTitle,
							  desc: shareContent,
							  link: shareLink,
							  imgUrl: shareIcon
						  });
						  wx.onMenuShareQZone({
							  title: shareTitle,
							  desc: shareContent,
							  link: shareLink,
							  imgUrl: shareIcon
						  });
						  wx.onMenuShareQQ({
							  title: shareTitle,
							  desc: shareContent,
							  link: shareLink,
							  imgUrl: shareIcon
						  });
						  wx.onMenuShareTimeline({
							  title: shareTitle,
							  link: shareLink,
							  imgUrl: shareIcon
						  });
					  });
				  },
				  error: function (data) {
				  }
			  });
		  }

    },
    // 再玩一次
	  playAgain () {
      window.location.reload()
    },

	  addAudio () {
		  this.$refs.audioComponent.addMusic({
			  // 添加音频的名称
			  name: 'bg',
			  url: 'http://b0.hucdn.com/party/audio/bg_low.mp3',
			  loop: true
		  })
	  },


    getPreload () {
	    let loader = new resLoader({
		    resources : preloadList,
		    onStart : (total) => {
			    console.log('start:'+total);
		    },
		    onProgress : (current, total) => {
			    this.preload.progress = current/total*100;
          this.preload.current = current
          this.preload.total = total
		    },
		    onComplete : (total) => {
		    	setTimeout(() => {
				    this.showCanPress = true
          },3000)
		    }
	    });
	    loader.start();
    },

	  endPre () {
      this.preload.isLoaded = true
      this.$nextTick(()=> {
	      this.getInitPostion()
      })
    },

	  startGather (event) {
		  var e = event || window.event;
		  e.preventDefault && e.preventDefault();
		  e.stopPropagation && e.stopPropagation();

      this.money.src = XIADUN
      // 按钮的状态改为按下
	  	this.btn.style.backgroundImage = `url(${ISPRESS})`
	  	this.startGatherTime = new Date().getTime()

    },
	  endGather () {
	  	this.showTips = false
		  // 按钮的状态改为不按下
		  // 按钮的状态改为按下
		  this.btn.style.backgroundImage = `url(${NOPRESS})`
		  this.endGatherTime = new Date().getTime()

		  let diff = this.endGatherTime - this.startGatherTime
      if (diff < 10) {
      } else {
		  	this.tossVelocityY = this.tossVelocityY + diff
		  	this.toss()
      }
      this.endGatherTime = 0
      this.startGatherTime = 0
	  },
    toss () {
	  	if (this.isMoving === true) {
	  		return
      }
      this.money.src = FEIQI
	    this.getTargetPos()
      this.getOriginPos()
	  	this.time = 0
      this.move()
    },
    getScreenSize () {
      this.screenWidth = document.documentElement.clientWidth
      this.screenHeight = document.documentElement.clientHeight
    },
    getTargetPos () {
	  	let id = 'column' + this.nextColumn.index
	  	let targetDom = document.getElementById(id)
      if (targetDom) {
	      let temp = targetDom.getBoundingClientRect()
	      this.targetLeft = temp.left
	      this.targetTop =temp.top
	      this.targetWidth = temp.right - this.targetLeft
      }
    },
    getOriginPos () {
	    let id = 'money'
	    let moneyDom = document.getElementById(id)
      if (moneyDom) {
	      let temp = moneyDom.getBoundingClientRect()
	      this.originLeft = temp.left
	      this.originTop = temp.top
	      this.originWidth = temp.width
	      this.originHeight = temp.height
      }
    },
    move () {
	    this.isMoving = true
	    // 调用频率是16ms, 16/1000 s
	    // 初始化是0秒
	    window.requestAnimationFrame(() =>{
		    this.moneyY =  -this.tossVelocityY * this.time
        this.moneyX =  this.tossVelocityX * this.time
        this.tossVelocityY = this.tossVelocityY -  this.time * 100
		    // 单位是秒
		    this.time = (this.time + 16/1000)

        if (this.checkOk() == 'success') {
		    	window.requestAnimationFrame(() => {
				    this.goNext()
				    // 精准落点
	          this.moneyY = this.targetTop - this.originTop - this.originHeight
				    window.requestAnimationFrame( () => {
					    this.resetMoneyPos()

					    // 修改该column的状态
					    this.columnlist[this.nextColumn.index].success = true
              this.nowFu = this.columnlist[this.nextColumn.index].text
					    this.setVelocity()

					    // 下一个柱子的index + 1
					    this.nextColumn.index = +this.nextColumn.index + 1
					    // 如果是已经通关了
					    if (this.nextColumn.index >= this.columnlist.length ) {
						    this.getResult()
						    this.showResult = true
						    return
					    }
            })
          })
        } else if (this.checkOk() == 'notyet') {
	        this.move()
        } else if (this.checkOk() == 'fail') {
	        this.getResult()
	        this.showResult = true
        }
	    })
    },
    getResult () {
	  	let getFunum = 0
      let idArr = []
	  	for (let i = 0; i < this.columnlist.length; i++ ) {
			  if (this.columnlist[i].success) {
			  	idArr.push(this.columnlist[i].id)
          getFunum = getFunum + 1
        }
      }
	    this.hasFu = getFunum

      console.log(idArr)
      // 出现次数最多的id
      let {maxIterm, maxNum} = this.getMax(idArr)
      this.mostFuNum = maxNum
      this.mostFu = this.findFuById(maxIterm)
    },

	  findFuById (id) {
	  	let temp = ''
		  for (let i = 0; i < this.columnlist.length; i++ ) {
			  if (this.columnlist[i].id == id) {
          temp = this.columnlist[i]
			  }
		  }
		  return temp
    },

    getMax (arr) {
      let hash = {}
      let maxNum = 0
      let maxIterm = ''
      for (let i = 0; i< arr.length; i++) {
      	let item = arr[i]
        hash[item] = hash[item] !==undefined ? (hash[item] + 1) : 1
        if (hash[item] > maxNum) {
        	maxNum = hash[item]
          maxIterm = item
        }
      }
      return  {maxIterm, maxNum}
    },

    // success之后重置money的位置
	  resetMoneyPos (x, y) {
      this.hasMoveX = this.hasMoveX + this.moneyX
      this.hasMoveY = this.hasMoveY + this.moneyY
      this.moneyX = 0
      this.moneyY = 0
    },
    checkOk () {
	    // 现在小人底部距离顶部的距离
	    var originBottomTop = this.originTop + this.originHeight + this.moneyY
      // 小人的左侧到左侧
	    var nowLeftToLeft = this.originLeft + this.moneyX

      // 判断小人是否超出了了s右侧的边缘
      if (nowLeftToLeft > this.screenWidth) {
	    	console.log('fail,right')
        return 'fail'
      }
	    // 判断小人是否碰到了底部的边缘
	    if (originBottomTop > this.screenHeight) {
		    console.log('fail,bottom')
		    return 'fail'
	    }
	  	// 判断小人是否在横坐标这个区间内, iphone is good
      if ( (nowLeftToLeft > this.targetLeft - this.originWidth/2) && (nowLeftToLeft < this.targetLeft + this.targetWidth - this.originWidth/2)) {
        // 判断纵坐标，是否落在区间内
//        console.log('落入了区间之中')
       	if (originBottomTop > this.targetTop  && originBottomTop < this.targetTop + 120) {
	        this.money.src = ZHILI
       		return 'success'
        } else if (originBottomTop > this.targetTop + this.originHeight + 15) {
          return 'fail'
        }  else {
	        return 'notyet'
        }
       }

      return 'notyet'
    },
    // 开始下一轮
    goNext () {
      this.step = this.step + 1
      setTimeout(() => {
	      this.isMoving = false
      },1000)
    },
    // 获取一个随机columnList
	  randomColumnlist () {
		  let target = []
      let source = this.tempList

      // 内定好第一个
      target[0] = source[0]
      for (let i = 0; i < this.tempList.length *5; i ++) {
		  	let randomNum = Math.floor(Math.random()*this.tempList.length)
        if (source[randomNum] && source[randomNum].text) {
		  		let temp = JSON.parse(JSON.stringify(source[randomNum]))
	        target.push(temp)
        }
      }
      // 内定好最后一个
      target.push(source[source.length-1])
      this.columnlist = target
    },
	  getInitPostion () {
		  let column0 = document.getElementById('column0')
      let moneyRect = this.money.getBoundingClientRect()
      let column0Rect = column0.getBoundingClientRect()
      this.init_x = column0Rect.left + column0Rect.width/2 - moneyRect.width/2
      this.init_y = column0Rect.top - moneyRect.height
    },
    getWxJDK () {
	  	let el = document.createElement('script')
      el.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
      document.getElementsByTagName('body')[0].appendChild(el)
    },
    setVelocity () {
	  	let clientWidth = document.documentElement.clientWidth
      if (!window.navigator.appVersion.match(/iphone/gi)) {
	  		// 安卓机
	      this.tossVelocityY = 400
	      this.tossVelocityX = 400
      } else if (clientWidth > 1000 ) {
	      this.tossVelocityY = 900
        this.tossVelocityX = 900
      } else if (clientWidth <= 760) {
	      this.tossVelocityY = 600
	      this.tossVelocityX = 600
      }
    }
  },
  computed: {
  	moneyMove () {
      return {
        transform : `translate(${this.moneyX}px, ${this.moneyY}px)`,
        left: `${this.init_x + this.hasMoveX}px`,
        top: `${this.init_y + this.hasMoveY}px`,
      }
    }
  },
  data () {
  	return {
      btn: '',
  		init_x: 0,
      init_y: 0,
  		money: '',

		  nowFu: '',
  		// 点击屏幕，开始游戏
		  showCanPress: false,
  		// 是否显示提示
		  showTips: true,
  		// 是否显示分享的弹窗
		  shareShow: false,
      // 是否显示最后的结果页面
		  showResult: false,
  		// 已经收获了多少福
		  hasFu: 0,
      // 最多收获的是哪个福
		  mostFu:'',
      mostFuNum:0,

      // 和预加载相关的东西
  		preload:{
			  // 判断页面是否加载完
			  isLoaded: false,
        // progress
        progress: 0,
      },


  		// x已经走过了
  		hasMoveX: 0,
      // y已经走过了
      hasMoveY: 0,


      // 临时的列表
      tempList: columnlist,
      // 真正渲染的列表，除去第一个和最后一个，其他的都是这个列表中的
		  columnlist: [],
		  // 下一个柱子的信息
		  nextColumn: {
		  	index: '1',
			  height: '470',
			  left: []
		  },

      step: 0,

      // 小方块起跳前距离顶部的位置
		  originTop: 0,
		  // 小方块起跳前距离左侧的位置
		  originLeft: 0,
      originWidth:0,
		  originHeight: 0,

		  // 小方块起跳前,target距离顶部的位置
		  targetTop: 0,
		  // 小方块起跳前距离区间的位置
		  targetLeft: 0,
		  // 小方块起跳前 目标的宽度
		  targetWidth: 0,
      // 屏幕的宽度
      screenWidth : 0,
      // 屏幕的高度
		  screenHeight: 0,

      // 垂直距离上初始化的速度
      tossVelocityY: 0,
		  // 水平距离上初始化的速度
		  tossVelocityX: 0,

      // 在垂直方向上移动的距离
		  moneyY: 0,
		  // 在水平方向上移动的距离
		  moneyX: 0,

      // 已经开始运动的时间
      time: 0,
      isMoving: false,

      // 开始按按钮的时间
      startGatherTime:0,
      endGatherTime:0
	  }
  },
  created () {
	  this.getPreload()
  },
  mounted () {
	  this.getWxJDK()
	  this.getScreenSize()
	  this.getTargetPos()
	  this.getOriginPos()
    this.addAudio()

    this.setVelocity()

    this.randomColumnlist()

    this.step = 0

    this.money = document.getElementById('moneyId')
    this.btn = document.getElementById('btnId')

  },
  components: {
    backgroundMusic,
  }
}
</script>

<style lang="less" scoped>
  @import './less/djc_prefer.less';

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  .heng{
    display: none;
  }

  @media all and (orientation : landscape) {
    .heng{
      height:100%;
      width:100%;
      text-align:center;
      background: white;
      position:absolute;
      z-index: 99999;
      display:block;}/*横屏时的样式*/
    .heng p{
      margin:0 auto;
      color:#000;
      width: 500/@g;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20/@g;
    }
  }

  /*预加载进度条*/
  .progress{
    width: 600/@g;
    height: 2px;
    border: 1px solid #ca151d;
    position: absolute;
    left: 50%;
    top: 24.36rem;
    transform: translate(-50%,0);
    margin:auto;
  }
  .progressbar{
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #ca151d;
    -webkit-transition:width ease-in 200ms;
  }

  #app {
    width: 100vw;
    height: 100vh;
    .music-icon {
      position: absolute;
      right: 20/@g;
      top: 20/@g;
      width: 80/@g;
      height: 80/@g;
      z-index: 99999;
    }
    .beforeLoad {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-image: url("http://upload-images.jianshu.io/upload_images/6185311-ffc6c7ba0d83e60e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240");
      background-size: 100% auto;
      z-index: 99998;
      .hua1 {
        width: 300/@g;
        height: 300/@g;
        position: absolute;
        left: -100/@g;
        top: -100/@g;
        animation: flower-rotate 190s linear infinite;
      }
      .hua2 {
        width: 300/@g;
        height: 300/@g;
        position: absolute;
        right: -100/@g;
        top: -100/@g;
        animation: flower-rotate 300s linear infinite;
      }
      .title {
        width: 361/@g;
        height: 245/@g;
        position: absolute;
        left: 207/@g;
        top: 384/@g;
        .animate_bouncein()
      }
      .left-shizi {
        width: 254/@g;
        height: 206/@g;
        position: absolute;
        top: 669/@g;
        left: 462/@g;
        z-index: 10;
        transform-origin: center center;
        animation: shizitou 2s ease 1s infinite ;
      }
      .left-shizi-shen {
        width: 222/@g;
        height: 374/@g;
        position: absolute;
        top: 700/@g;
        left: 40/@g;
        z-index: 9;
      }
      .right-shizi{
        width: 254/@g;
        height: 206/@g;
        position: absolute;
        top: 669/@g;
        left: 38/@g;
        z-index: 10;
        animation: shizitou 2s ease infinite;
        transform-origin: center center;
      }
      .right-shizi-shen {
        width: 222/@g;
        height: 374/@g;
        position: absolute;
        top: 700/@g;
        left: 480/@g;
        z-index: 9;
      }
      .fenghuang-text {
        position: fixed;
        left: 50%;
        top:24.786667rem;
        transform: translate(-50%,-50%);
        width: 400/@g;
        text-align: center;
        height: auto;
        font-size: 20/@g;
        color: rgba(0,0,0,0.5);
      }
    }
    .modal-bg {
      position: fixed;
      left: 50vw;
      top: 20/@g;
      width: 397/@g;
      transform: translate(-50%);
      z-index: 999;
    }
    .modal {
      width: 474/@g;
      height: 490/@g;
      position: fixed;
      top: 0;
      left: 50vw;
      transform: translate(-237/@g,0);
      transform-origin: 10% 0;
      background-image: url("http://upload-images.jianshu.io/upload_images/6185311-8b418780d47dcbdf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: top;
      animation: shaking 8s ease infinite;
      z-index: 999;
      .modal-text {
        position: absolute;
        width: 300/@g;
        text-align: center;
        top: 178/@g;
        left: 50%;
        transform: translate(-50%);
        font-size: 40/@g;
        font-weight: bolder;
        color: #cca353;
      }
    }
    .page {
      transition: all 1s;
      width: 100%;
      height: 100%;
      .column-list {
        height: 100vh;
        padding-right: 100vw;
        background-size: contain;
        background-image: url("http://upload-images.jianshu.io/upload_images/6185311-4c02f87252e5e034.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240");
        background-repeat: repeat-x;
        box-sizing: border-box;
        position: absolute;
        bottom: 0/@g;
        left: 0;
        display: flex;
        .column-container {
          transition: all 0.5s;
          width: 50vw;
          box-sizing: border-box;
          height: 100%;
          position: relative;
          .column {
            position: absolute;
            background-color: #b61d22;
            left: 50%;
            bottom: 173/@g;
            transform: translate(-50%, 0);
            box-sizing: border-box;
            overflow: hidden;
            border-radius: 20/@g;
            .column-image {
              width: 90%;
              height: auto;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              box-sizing: border-box;
            }
          }
          .column:before {
            content: '';
            display: block;
            position: absolute;
            background-image: url('http://image.dydata.io/PQGX3UvDqiEcz65X3iAa8g.png');
            background-size: contain;
            background-position: center top;
            background-repeat: no-repeat;
            width: 100%;
            height: 100/@g;
            left: 0;
            top: -15/@g;
          }
          .column:after {
            content: '';
            display: block;
            position: absolute;
            background-image: url('http://image.dydata.io/TuSiG4ohT81Yt28WxE5FZe.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center bottom;
            width: 200/@g;
            height: 100/@g;
            left: 0;
            bottom: 0;
          }
        }
      }
      .money {
        position: absolute;
        width: 150/@g;
        height: 150/@g;
        left: 3.5rem;
        top: 15.68rem;
        -webkit-transform: translate3d(0, 0, 0);
        will-change: transform;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        .money-img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        .dun {
          -webkit-transition: all 5s;
          -moz-transition: all 5s;
          -ms-transition: all 5s;
          -o-transition: all 5s;
          transition: all 5s;
        }
      }
    }


    .btn-bg {
      width: 100vw;
      height: 400/@g;
      position: absolute;
      bottom: 0;
    }
    .btn {
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-select:none;
      -webkit-touch-callout:none;
      .btn-img {
        width: 510/@g;
        height: 140/@g;
        position: absolute;
        left: 50%;
        bottom: 30/@g;
        -webkit-transform: translate(-50%,0);
        -moz-transform: translate(-50%,0);
        -ms-transform: translate(-50%,0);
        -o-transform: translate(-50%,0);
        transform: translate(-50%,0);
        z-index: 9999;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-select:none;
        -webkit-touch-callout:none;
        background-image: url("http://upload-images.jianshu.io/upload_images/6185311-f71ba2899382f265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240");
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .btn-tips {
      width: 300/@g;
      border-radius: 50/@g;
      padding: 10/@g 5/@g;
      margin: 0;
      position: absolute;
      bottom: 170/@g;
      left: 50%;
      text-align: center;
      transform: translate(-50%,0);
      font-size: 26/@g;
      color: black;
      z-index: 999998;
      color: white;
      background-color: rgba(0,0,0,0.5);
    }

    .result-page {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-image: url("http://upload-images.jianshu.io/upload_images/6185311-d2b1e02829853635.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240");
      background-size: 100% auto;
      background-position:center top;
      background-color: #feebd1;
      background-repeat: no-repeat;
      z-index: 999990;
      .total1 {
        width: 500/@g;
        position: absolute;
        left: 50%;
        top: 700/@g;
        font-size: 40/@g;
        color: black;
        transform: translate(-250/@g,0);
        text-align: center;
      }
      .total2 {
        width: 500/@g;
        position: absolute;
        left: 50%;
        top: 780/@g;
        font-size: 40/@g;
        color: black;
        transform: translate(-250/@g,0);
        text-align: center;
      }
      .most {
        width: 500/@g;
        position: absolute;
        left: 50%;
        top: 540/@g;
        font-size: 30/@g;
        color: black;
        transform: translate(-250/@g,0);
        text-align: center;
      }
      .fuImg-text {
        width: 400/@g;
        position: absolute;
        text-align: center;
        left: 50%;
        top: 490/@g;
        transform: translate(-50%, 0);
        font-size: 34/@g;
        font-weight: bolder;
        color: #cca353;
      }
      .left-btn {
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        top: 940/@g;
        width: 300/@g;
        height: 90/@g;
        background-color: transparent;
      }
      .right-btn {
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        top: 1050/@g;
        width: 300/@g;
        height: 90/@g;
        background-color: transparent;
      }
    }

    .share-container {
      z-index: 999999;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("http://image.dydata.io/Ra4YHxte2afzabTiLV9JrD.png");
      .mader-container {
        top: 700/@g;
        width: 300/@g;
        height: 250/@g;
        position: absolute;
        left: 430/@g;
        font-size: 24/@g;
        color: white;
        text-align: left;
        bottom: 0;
        padding-top: 20/@g;
        p {
          margin: 8/@g;
        }
      }
      .close-btn {
        width: 200/@g;
        height: 80/@g;
        position: absolute;
        left: 50%;
        top: 600/@g;
        transform: translate(-50%,-50%)
      }
      .erwei-container {
        width: 400/@g;
        height: 400/@g;
        position: absolute;
        left: 40/@g;
        font-size: 24/@g;
        color: white;
        text-align: center;
        top: 700/@g;
        text-align: center;
        .erwei-img {
          width: 250/@g;
          height: 250/@g;
        }
        .erwei-text {
          display: inline-block;
          width: 250/@g;
          color: white;
          font-size: 24/@g;
          text-align: center;
        }
      }
    }

  }

  @keyframes shizitou {
    0% {
      transform:  rotate(3deg);
    }
    5% {
      transform:  rotate(-5deg);
    }
    10% {
      transform:  rotate(5deg);
    }
    15% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  
  @keyframes flower-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(3600deg);
    }
  }
  @keyframes shaking {
    0% {
      transform: rotate(0deg) translate(-237/@g,0);
    }
    15% {
      transform: rotate(10deg) translate(-237/@g,0);
    }
    30% {
      transform: rotate(-10deg) translate(-237/@g,0);
    }
    45% {
      transform: rotate(0deg) translate(-237/@g,0);
    }
    100% {
      transform: rotate(0deg) translate(-237/@g,0);
    }
  }
</style>
