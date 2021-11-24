let audio = document.querySelector(".quranPlyer")
let surahsContainer = document.querySelector('.surahs')
let ayahText = document.querySelector('.quran-text')
let prev  = document.querySelector('.prev')
let playaudio = document.querySelector('.playaudio')
let next = document.querySelector('.next')
let vidBg =  document.querySelector('#bgvid')

let clickSurah = document.querySelector('.click-surah')

window.addEventListener('click' , (e) => {
  vidBg.play();
 
})


getSurah()
function getSurah() {

    fetch("https://api.quran.sutanlab.id/surah")
    .then(response => response.json())
    .then(data => {
      for (let surah in data.data) {
          surahsContainer.innerHTML += `
          <div class="surah-item">
            <p>
            ${data.data[surah].name.long}<br>
            ${data.data[surah].name.translation.en}
            </p>
           <span> ${data.data[surah].number}</span>
          </div>
          `
      }

      let allSurah = document.querySelectorAll('.surahs .surah-item')
      let ayahAudios;
      let ayahsText;

      allSurah.forEach((item  , index)=>{
        item.addEventListener('click' , ()=>{

            item.classList.add('active')
            fetch(`https://api.quran.sutanlab.id/surah/${index + 1 }`)
            .then(response=> response.json())
            .then(data=>{
                let verses = data.data.verses
                ayahsText=[];
                ayahAudios=[]
                verses.forEach(verses=>{
                    ayahAudios.push(verses.audio.primary)
                    ayahsText.push(verses.text.arab)
                    
                })
                let ayahIndex = 0;
                changeAya(ayahIndex)

                audio.addEventListener('ended' , ()=>{
                    ayahIndex++
                    if(ayahIndex < ayahAudios.length){
                        changeAya(ayahIndex)
                       
                    }else{
                        ayahIndex = 0
                        changeAya(ayahIndex)
                        audio.pause()
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Surah has been End',
                          showConfirmButton: false,
                          timer: 2000
                        })
                    }
                })

                next.addEventListener('click' , ()=>{
                    ayahIndex == 0 ? ayahIndex = ayahAudios.length -1 : ayahIndex--
                    changeAya(ayahIndex)
                })

                prev.addEventListener('click' , ()=>{
                    ayahIndex < ayahAudios.length -1 ? ayahIndex++ : ayahIndex = 0
                    changeAya(ayahIndex)
                })

                let isPlay = false
                togglePlay()
                function togglePlay() {
                    if(isPlay){

                        audio.pause()
                        playaudio.innerHTML = '<i class="fa fa-play-circle"></i>'
                        isPlay = false
                    }else{

                        audio.play()
                        playaudio.innerHTML = '<i class="far fa-pause-circle"></i>'
                        isPlay = true
                    }
                  }
                playaudio.addEventListener('click' ,  togglePlay)
       function changeAya(index) { 
            audio.src = ayahAudios[index]
            ayahText.innerHTML = ayahsText[index]
            audio.play()
        }
            })

        })  
      })
    })
  }



  let navside = document.querySelector('.navside')
  let iconCloseOpen = document.getElementById('iconCloseOpen')

  navside.addEventListener("click" , ()=>{
    surahsContainer.classList.toggle("open")
  })




  function closeMenu(){
      surahsContainer.classList.remove("open")
    }
