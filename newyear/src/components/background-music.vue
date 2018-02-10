/* eslint-disable */
<!--
背景音乐的组件，可以方便的暂停，播放，添加背景音乐，更换背景音乐
 -->
<template>
    <div class="audio-container">
        <img class="audio-icon" :class="{'isPlaying':playState == 'playing'}" src="https://h0.hucdn.com/open/201645/40cb9b182e1f565c_78x78.png" alt="" @click="toggleAudio">
        <div v-for="audio in audioList">
            <audio class="audio-content" v-if="audio.url" :id="audio.name" preload="preload">
                您的浏览器不支持 audio 标签。
            </audio>
        </div>
    </div>
</template>

<script>
    let GlobalHandle  = {}
    
    function  add (el, type, data, callback) {
	    GlobalHandle.handle = function (e) {
            e.data = data
            callback(e)
        }
        el.addEventListener(type,GlobalHandle.handle)
    }
    
    function remove(el, type) {
        el.removeEventListener(type,GlobalHandle.handle)
    }

	export default {
		name: '',
		data() {
			return {
				playState: 'playing',
				audioList: [],
            }
		},
        methods: {
			// 父组件将调用该方法，增加一条背景音乐
			addMusic (audio) {
                this.audioList.push(audio)
				this.$nextTick(() => {
					this.initMusic(audio)
				})
            },
            // 父组件将调用该方法，减少一条背景音乐
	        subMusic (audio) {
				let name = ''
				if (typeof audio == 'string') {
                    name = audio
                } else if (typeof  audio == 'object'){
                    name = audio.name || ''
                }
				for (let i = 0; i<this.audioList.length; i++) {
                    if (this.audioList[i].name = name) {
                        this.audioList.splice(i,1)
                    }
                }
	        },
            // 暂停或者播放
			toggleAudio () {
                // 如果是正在播放，则遍历暂停
				if (this.playState == 'playing') {
					for (let i = 0; i < this.audioList.length; i++) {
						let audioObj = document.getElementById(this.audioList[i].name)
                        audioObj.pause()
                        this.playState = 'paused'
					}
                } else {
					// 如果是停止播放，则遍历播放
					for (let i = 0; i < this.audioList.length; i++) {
						let audioObj = document.getElementById(this.audioList[i].name)
						audioObj.play()
						this.playState = 'playing'
					}
                }
            },
            // 在touchstart时候，播放音频
            audioPlay(e) {
                e.data.audioObj.play()
                this.playState = 'playing'
                remove(e.data.container, 'touchstart')
            },
            // 添加一条音频
	        initMusic (audio) {
				if (!audio.name || !audio.url) {
					console.log('audio不正确')
					return
                }
				let audioObj = document.getElementById(audio.name)
		        let container = document.getElementsByTagName('html')[0]
				// 设置音频播放url
                audioObj.src = audio.url
                // 设置音频自动播放
		        audioObj.autoplay = 'autoplay'
                // 设置音频是否循环播放
		        if (audio.loop) {
                    audioObj.loop = 'loop'
                } else {
			        audioObj.loop = false
			        // 解决：不添加loop属性，有时候还是会循环播放
                    audioObj.addEventListener('ended',function () {
                        audioObj.pause()
                    })
                }
                audioObj.load()
                // 绑定html的touchstart事件，仿照了jquery的写法，绑定事件时传入参数
                add(container, 'touchstart', {audioObj, container}, this.audioPlay)
            }
        }
	}
</script>

<style scoped>
.audio-container {
    width: 100%;
    height: 100%;
}
.audio-icon {
    width: 100%;
    height: 100%;
}
.isPlaying {
    animation: rolling 2s linear 0s infinite normal none
}

@keyframes rolling {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>