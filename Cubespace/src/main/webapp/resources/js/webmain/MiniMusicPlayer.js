/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/
let musicArr = [];
let temp
(()=>{
    $.ajax({
        url : "/miniMusicPlyer",
        data: {"loginMemberNo":loginMemberNo, "cp":currentPage},
        dataType : "JSON",
        success : miniMusicList =>{
            

            if(miniMusicList.length > 0) {
                
                for(let music of miniMusicList) {
                    let favorited

                    if(music.goodsNo==music.useGoodsNo){
                        favorited=true;
                    }else{
                        favorited=false;
                    }

                    musicArr.push({
                        name:music.goodsName, // 음악이름
                        artist:music.goodsCreater, // 음악 제작자
                        cover:music.goodsImagePath, // 음악 썸네일
                        // cover: "/resources/music/img/test-로아쿠크세이튼테마.gif",
                        source:music.goodsPath ,// 음악 경로
                        url: "/",// 상점url
                        favorited:favorited // 보유상태
                    })

                    console.log(musicArr);
                }
            }

            temp = new Vue({
                el: "#app",
                data() {
                    return {
                        audio: null,
                        circleLeft: null,
                        barWidth: null,
                        duration: null,
                        currentTime: null,
                        isTimerPlaying: false,
                        tracks: musicArr,
                        // tracks: [
                        //     {
                        //         name: "화려한서커스(Splendid Circus)",
                        //         artist: "로스트아크쿠크세이튼테마",
                        //         cover: "/resources/music/img/test-로아쿠크세이튼테마.gif",
                        //         source: "/resources/music/mp3/로스트아크쿠크세이튼테마-화려한서커스(Splendid Circus).mp3",
                        //         url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
                        //         favorited: false    
                        //         // 하트 (상품보유 여부)
                        //         // goodsNo == useGoodsNo 보유중 변경
                        //         // favorited: 보유중이면 true로 변경
                        //     },
                        // ],
                        currentTrack: null,
                        currentTrackIndex: 0,
                        transitionName: null
                    };
                },
                methods: {
                    play() {
                        if (this.audio.paused) {
                        this.audio.play();
                        this.isTimerPlaying = true;
                        } else {
                        this.audio.pause();
                        this.isTimerPlaying = false;
                        }
                    },
                    generateTime() {
                        let width = (100 / this.audio.duration) * this.audio.currentTime;
                        this.barWidth = width + "%";
                        this.circleLeft = width + "%";
                        let durmin = Math.floor(this.audio.duration / 60);
                        let dursec = Math.floor(this.audio.duration - durmin * 60);
                        let curmin = Math.floor(this.audio.currentTime / 60);
                        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
                        if (durmin < 10) {
                        durmin = "0" + durmin;
                        }
                        if (dursec < 10) {
                        dursec = "0" + dursec;
                        }
                        if (curmin < 10) {
                        curmin = "0" + curmin;
                        }
                        if (cursec < 10) {
                        cursec = "0" + cursec;
                        }
                        this.duration = durmin + ":" + dursec;
                        this.currentTime = curmin + ":" + cursec;
                    },
                    updateBar(x) {
                        let progress = this.$refs.progress;
                        let maxduration = this.audio.duration;
                        let position = x; //- progress.offsetLeft;
                        let percentage = (100 * position) / progress.offsetWidth;

                        // console.log(this);
                        // console.log(x);
                        // console.log(progress.offsetWidth);
                        // console.log(maxduration);
                        // console.log(position);
                        // console.log(percentage);

                        if (percentage > 100) {
                        percentage = 100;
                        }
                        if (percentage < 0) {
                        percentage = 0;
                        }
                        this.barWidth = percentage + "%";
                        this.circleLeft = percentage + "%";
                        this.audio.currentTime = (maxduration * percentage) / 100;
                        this.audio.play();
                    },
                    clickProgress(e) {
                        this.isTimerPlaying = true;
                        this.audio.pause();
                        this.updateBar(e.offsetX);
                    },
                    prevTrack() {
                        this.transitionName = "scale-in";
                        this.isShowCover = false;
                        if (this.currentTrackIndex > 0) {
                        this.currentTrackIndex--;
                        } else {
                        this.currentTrackIndex = this.tracks.length - 1;
                        }
                        this.currentTrack = this.tracks[this.currentTrackIndex];
                        this.resetPlayer();
                    },
                    nextTrack() {
                        this.transitionName = "scale-out";
                        this.isShowCover = false;
                        if (this.currentTrackIndex < this.tracks.length - 1) {
                        this.currentTrackIndex++;
                        } else {
                        this.currentTrackIndex = 0;
                        }
                        this.currentTrack = this.tracks[this.currentTrackIndex];
                        this.resetPlayer();
                    },
                    resetPlayer() {
                        this.barWidth = 0;
                        this.circleLeft = 0;
                        this.audio.currentTime = 0;
                        this.audio.src = this.currentTrack.source;
                        setTimeout(() => {
                            if(this.isTimerPlaying) {
                                this.audio.play();
                            } else {
                                this.audio.pause();
                            }
                        }, 300);
                    },
                    favorite() {
                        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                        this.currentTrackIndex
                        ].favorited;
                        }
                },
                created() {
                    let vm = this;
                    this.currentTrack = this.tracks[0];
                    this.audio = new Audio();
                    this.audio.src = this.currentTrack.source;
                    this.audio.ontimeupdate = function() {
                        vm.generateTime();
                    };
                    this.audio.onloadedmetadata = function() {
                        vm.generateTime();
                    };
                    this.audio.onended = function() {
                        vm.nextTrack();
                        this.isTimerPlaying = true;
                    };
                
                    // this is optional (for preload covers)
                    for (let index = 0; index < this.tracks.length; index++) {
                        const element = this.tracks[index];
                        let link = document.createElement('link');
                        link.rel = "prefetch";
                        link.href = element.cover;
                        link.as = "image"
                        document.head.appendChild(link)
                    }
                }
            });
            

        }
    })

})()

/* 모달 열기 */
function MusicPlayerOpen(index){
    document.getElementById("modalPlayer").style.display = "block";
    console.log(index);
    temp.currentTrackIndex = index;
    temp.currentTrack = temp.tracks[temp.currentTrackIndex];
    temp.resetPlayer();
}
/* 모달 닫기 */
function MusicPlayerClose(){
    document.getElementById("modalPlayer").style.display = "none";
    temp.audio.pause();
    /* 노래정지 */
    const playbtn = document.querySelector(".play-btn")
    playbtn.firstElementChild.setAttribute("xlink:href","#icon-play")
    temp.isTimerPlaying = false;
}


