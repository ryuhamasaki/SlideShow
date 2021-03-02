`use strict`

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentIndex = 0;

  // id="main"を読み込み、そこのsrcにimages配列のcurrentIndex番目の
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    // images配列の中のそれぞれのimageについて、
    // img要素を作って、要素のsrcにimageを入れる
    const img = document.createElement('img');
    img.src = image;
    // li要素を作り、imageのindexとcurrentIndexが同じとき、
    // currentクラスをつける→cssでそのサムネイルが濃くなる
    const li = document.createElement('li');
    if (index === currentIndex){
      li.classList.add('current');
    }
    
    //liがクリックされたら、mainImageをimageにする
    li.addEventListener('click', () => {
      mainImage.src = image
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index
      thumbnails[currentIndex].classList.add('current');

    })

    // li要素にimgをアペンド
    // thumbnailsにliをアペンド
    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length){
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
   //ここの.clickは、それがクリックされたときの処理(line34～)をしてくれる
  }); 

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0){
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId; 

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    },1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  });





}