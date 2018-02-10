<template>
  <div id="app">
      <div class="music-icon">
          <background-music ref="audioComponent"></background-music>
      </div>
      <br>
      <button @click="addAudio_2">再添加一段【循环播放】的音乐 </button>
      <br>
      <button @click="addAudio_3">再再添加一段 【播放一次】的音乐</button>
      <br>
      <button @click="subAudio">删除第一次插入的一段</button>
  </div>
</template>

<script>
import backgroundMusic from './components/background-music'

export default {
  name: 'App',
  methods: {
	  addAudio_1 () {
		  this.$refs.audioComponent.addMusic({
			  // 添加音频的名称
			  name: 'bg',
			  url: 'http://b0.hucdn.com/party/audio/bg_low.mp3',
			  loop: true
		  })
	  },
	  addAudio_2 () {
		  this.$refs.audioComponent.addMusic({
			  name: 'yao',
			  url: 'http://b0.hucdn.com/party/audio/yao_low.mp3',
			  loop: true
		  })
	  },
	  addAudio_3 () {
		  this.$refs.audioComponent.addMusic({
			  name: 'over',
			  url: 'http://b0.hucdn.com/party/audio/over_low.mp3',
			  loop: false
		  })
	  },
	  subAudio () {
		  this.$refs.audioComponent.subMusic('yao')
	  }
  },
  mounted () {
    this.addAudio_1()
  },
  components: {
    backgroundMusic
  }
}
</script>

<style>
.music-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
}
</style>
