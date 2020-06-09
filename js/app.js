const $slideBox = document.querySelector('.slide_box');
const firstImg = $slideBox.firstElementChild.cloneNode(true);
let visualIndex = 0 ;
$slideBox.appendChild(firstImg); 

function slide() { 
  if (visualIndex === 4){
    visualIndex = 0;
    $slideBox.style.transform = `translateX(-0%)`;
    $slideBox.style.transition = '0s';
    setTimeout(slide, 0);
  } else {
    $slideBox.style.transform = `translateX(-${20 * (visualIndex+1)}%)`;
    $slideBox.style.transition = '2s';
    visualIndex++;
    setTimeout(slide, 3000);
  }
}
slide();

const $time = document.querySelector('.time');
const $msg = document.querySelector('.msg');    

(function timeBox() {


  const clock = new Date();
  let month = clock.getMonth();
  let day = clock.getDay();
  let hour = clock.getHours();
  let minute = clock.getMinutes();
  let second = clock.getSeconds();
  $time.innerHTML = `${day}일${hour}:${minute}:${second}`;

  // 메세지 나오게하기
  const msgBox = hour > 17 ? 'evening': (hour < 11 ? 'morning':'afternoon');
  $msg.innerHTML = `Good ${msgBox}!`;
  // AM , PM 나누기 
  const ampm = hour < 12 ? 'AM' : 'PM';  
  // 12시간제로 바꾸기
  hour %= 12;
  // 0 붙히기
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;  
  second = second < 10 ? '0' + second : second;
  $time.innerHTML = `${month}월 ${day}일 ${hour}:${minute}:${second}${ampm}`;
  setTimeout(timeBox,1000);
}());





// State
let recipes = [];
let targetRecipe = {};
let $ingredient = '';

//DOM

const $recipeSearch = document.querySelector('.recipe_search');
const $upBtn = document.querySelector('.up_btn');
const $resetSortbtn = document.querySelector('.reset_sort_btn')
const $searchBox = document.querySelector('.search_box')
const $sortNameBtn = document.querySelector('.sort_name_btn');
const $sortDateBtn = document.querySelector('.sort_date_btn');
const $recipeList = document.querySelector('.recipe_list');
const $resetBtn = document.querySelector('.reset_btn');
const $preBtn = document.querySelector('.pre_btn');
const $closeBtn = document.querySelector('.close_btn');
const $nextBtn = document.querySelector('.next_btn');
const $modalList = document.querySelector('.modal_list');
const $modalWrapper = document.querySelector('.modal_wrapper');

// 랜더
const render = () => {
  let html = '';
  recipes.forEach(recipe => {
    html += `
      <li id ="${recipe.id}" class="recipe"> 
        <figure><img class ="recipe_img" src="${recipe.imgSrc}" alt="${recipe.name} 이미지"></figure>
        <figcaption>${recipe.name}</figcaption>
      </li>`;
  });
  $recipeList.innerHTML = html;
};

// 초기 데이터 리퀘스트 로드
window.onload = () => {
  recipes = [{
    id: 1,
    name: 'Boiled egg',
    ingredients: ['egg', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['개', 'ml', 'g'],
    time: 570,
    cookImg: '/images/icon/icon_pot2.png',
    content: '물에 넣고 삶아주세요',
    imgSrc: '/images/boiledegg.jpg'
  }, {
    id: 2,
    name: 'Steak',
    ingredients: ['beef', 'oil', 'salt'],
    ingredientsAmounts: [400, 20, 10],
    ingredientsUnits: ['g', 'ml', 'g'],
    time: 180,
    cookImg: '/images/icon/icon_pot1.png',
    content: '기름을 두르고 구워주세요',
    imgSrc: '/images/steak.jpg'
  }, {
    id: 3,
    name: 'Beef',
    ingredients: ['beef', 'rice', 'egg', 'oil'],
    ingredientsAmounts: [300, 200, 1, 20],
    ingredientsUnits: ['g', 'g', '개', 'ml'],
    time: 180,
    cookImg: '/images/icon/icon_pot1.png',
    content: '기름을 두르고 구워주세요',
    imgSrc: '/images/beef.jpg'
  }, {
    id: 4,
    name: 'Pasta',
    ingredients: ['spaghetti', 'water', 'oil', 'tomato sauce'],
    ingredientsAmounts: [200, 600, 10, 100],
    ingredientsUnits: ['g', 'ml', 'g', 'ml'],
    time: 120,
    cookImg: '/images/icon/icon_pot1.png',
    content: '면을 삶은 후 토마토 소스와 볶아주세요',
    imgSrc: '/images/spa.jpg'
  }, {
    id: 5,
    name: 'Lasagna',
    ingredients: ['rice', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['개', 'ml', 'g'],
    time: 10,
    cookImg: '/images/icon/icon_pot.png',
    content: '라자냐 어케 만들더라',
    imgSrc: '/images/lasagna.jpg'
  }, {
    id: 6,
    name: 'Pancake',
    ingredients: ['egg', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['개', 'ml', 'g'],
    time: 10,
    cookImg: '/images/icon/icon_pot.png',
    content: '파리바게트 가서 사세요',
    imgSrc: '/images/pancake.jpg'
  }];
  render();
};


// 레시피 검색
const recipeSearchRender = recipeName => {
  let searchRecipe = recipes.filter(recipe => recipe.name.toLowerCase() === recipeName.toLowerCase())[0]; 
// 정규 표현식

  if (!searchRecipe) $recipeSearch.placeholder = '검색결과가 없습니다.';
// alert 

  $recipeList.innerHTML = `
  <li id ="${searchRecipe.id}" class="recipe" tabindex="0"> 
    <figure><img class ="recipe_img" src="${searchRecipe.imgSrc}" alt="${searchRecipe.name} 이미지"></figure>
    <figcaption>${searchRecipe.name}</figcaption>
  </li>`;
  $recipeSearch.placeholder = '레시피 검색';
}
$recipeSearch.onkeyup = e => {
  if (e.keyCode !== 13) return;
  // 방어코드 비어있을 때
  recipeSearchRender($recipeSearch.value);
  $recipeSearch.value = '';
}

$resetSortbtn.onclick = () => {
  render();
}

const compare = key => {
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
};

// 이름순 레시피 정렬
$sortNameBtn.onclick = () => {
  recipes = recipes.sort(compare('name'));
  render();
};

// 업데이트순 레시피 정렬
$sortDateBtn.onclick = () => {
  recipes = recipes.sort((recipe1, recipe2) => recipe2.id - recipe1.id);
  render();
}

// 레시피 호버시 이벤트
$recipeList.onmouseover = ({ target }) => {
  if (!target.matches('.recipe_list > li > figure > img')) return;
  target.style.opacity = '0.7';
};

$recipeList.onmouseout = ({ target }) => {
  if (!target.matches('.recipe_list > li > figure > img')) return;
  target.style.opacity = '1';
};

// 페이지 최상단으로 이동 버튼
$upBtn.onclick = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

window.onscroll = () => {
  if (document.documentElement.scrollTop > 200) {
    $upBtn.style.display = 'block';
  }
  if (document.documentElement.scrollTop <= 200) {
    $upBtn.style.display = 'none';
  }
};





// init state
$preBtn.style.display = 'none';
$resetBtn.style.display = 'none';
$modalWrapper.style.display = 'none';


// Slider Function

const sliderFunc = (function () {
  let curPage = 0;
  return {
    nextPage() {
      if (curPage === 2) return;
      $modalList.style.transform = `translate3d(-${100 / 3 * (curPage + 1)}% , 0px, 0px)`;
      $modalList.style.transition = '0.3s';
      curPage++;
      if (curPage === 2) { 
        $nextBtn.style.display = 'none';
        $resetBtn.style.display = 'inline-block';
      }
      $preBtn.style.display = 'inline-block';
    },
    prevPage() {
      $resetBtn.style.display = 'none';
      if (curPage === 0) return;
      $modalList.style.transform = `translate3d(-${100 / 3 * (curPage -1)}% , 0px, 0px)`;
      $modalList.style.transition = '0.3s';
      curPage--;
      if (curPage === 0) $preBtn.style.display = 'none';
      $nextBtn.style.display = 'inline-block';
    },
    resetPage() {
      $modalList.style.transform= `translate3d(0px, 0px, 0px)`
      $preBtn.style.display = 'none';
      $nextBtn.style.display = 'inline-block';
      $resetBtn.style.display = 'none';
      curPage = 0;
    }
  }
})();

// Timer Function
const timer = (function () {
  let time = 0;
  let stopCode = 0;
  return {
    startTimer() {
      const $timerStatus = document.querySelector('.timer_start');
      const $timer = document.querySelector('.timer');
      $timerStatus.classList.replace('timer_start', 'timer_stop');
      stopCode = setInterval(() => {
        time--;
        $timer.textContent = `${Math.floor(time / 60) + ':' + (time % 60 < 10 ? '0' + time % 60 : time % 60)}`;
        if (time === 0) {
          alert('Done!');
          clearInterval(stopCode);
        }
      }, 1000);
    },
    stopTimer() {
      const $timerStatus = document.querySelector('.timer_stop');
      clearInterval(stopCode);
      $timerStatus.classList.replace('timer_stop', 'timer_start' );
    },
    setTimer(recipeTime) {
      const $timer = document.querySelector('.timer');
      time = recipeTime;
      $timer.textContent = `${Math.floor(time / 60) + ':' + (time % 60 < 10 ? '0' + time % 60 : time % 60)}`;
    }
  }
})();

// Modal render
const renderModal = recipe => {
  let html = '';
  html = `<li class="modal_view">
    <div class="modal">
      <div class="index">
        <span>●</span>
        <span>○</span>
        <span>○</span>
      </div>
      <img src="${recipe.imgSrc}" class="modal_img">
      <p class="modal_title">${recipe.name}</p>
      <div class="ingredient">
        ${servingAmount()}
        </div>
        <input type="number" class="serving" value="1" min="1" max="5">
    </div>
  </li>
  <li class="modal_view">
    <div class="modal">
      <div class="index">
        <span>○</span>
        <span>●</span>
        <span>○</span>
      </div>
      <div class="content">
        <img src="${recipe.cookImg}" alt="" class="content_img">
        <article class="content_text">${recipe.content}</article>
      </div>
      <div class="timer_wrapper">
        <div class="timer"></div>
        <button class="timer_start"></button>
      </div>
    </div>
  </li>
  <li class="modal_view">
    <div class="modal">
      <div class="index">
        <span>○</span>
        <span>○</span>
        <span>●</span>
      </div>
      <span class="end">END</span>
    </div>
  </li>`
  $modalList.innerHTML = html;
  timer.setTimer(recipe.time);
  $ingredient = document.querySelector('.ingredient')
};

// Ingredient change
const servingAmount = (serving = 1) => {
  let html = '';
  targetRecipe.ingredients.forEach((ingredient, index) => html += `${ingredient}: ${+targetRecipe.ingredientsAmounts[index] * +serving}${targetRecipe.ingredientsUnits[index]} `);
  return html;
}; 


$nextBtn.onclick = sliderFunc.nextPage;
$preBtn.onclick = sliderFunc.prevPage;
$resetBtn.onclick = sliderFunc.resetPage;
$closeBtn.onclick = () => {
  $modalWrapper.style.display = 'none';
  sliderFunc.resetPage();
};

$modalList.onclick = e => {
  if(e.target.matches('.timer_start')) timer.startTimer();
  else if(e.target.matches('.timer_stop')) timer.stopTimer();
};
$modalList.onchange = e => { 
  $ingredient.innerHTML = servingAmount(e.target.value);
}

$recipeList.onclick = e => {
  targetRecipe = recipes.filter(recipe => (location.origin + recipe.imgSrc) === e.target.src)[0];
  renderModal(targetRecipe);
  $modalWrapper.style.display = 'flex';
};