// State
let recipes = [];
let targetRecipe = {};
let $ingredient = {};
let $timerReset = {};
let visualIndex = 0;
let scrollTimer = 0;

//DOM

//slider DOM
const $slideBox = document.querySelector('.slide_box');
const firstImg = $slideBox.firstElementChild.cloneNode(true);
$slideBox.appendChild(firstImg); 

//search DOM
const $searchBox = document.querySelector('.search_box')
const $sortNameBtn = $searchBox.querySelector('.sort_name_btn');
const $sortDateBtn = $searchBox.querySelector('.sort_date_btn');
const $recipeSearch = $searchBox.querySelector('.recipe_search');
const $resetSortbtn = document.querySelector('.reset_sort_btn');

//Header DOM
const $time = document.querySelector('.time');
const $msg = document.querySelector('.msg');

//main DOM
const $recipeList = document.querySelector('.recipe_list');
const $upBtn = document.querySelector('.up_btn');

//modal DOM
const $modalWrapper = document.querySelector('.modal_wrapper');
const $modalList = $modalWrapper.querySelector('.modal_list');
const $resetBtn = $modalWrapper.querySelector('.reset_btn');
const $preBtn = $modalWrapper.querySelector('.pre_btn');
const $nextBtn = $modalWrapper.querySelector('.next_btn');
const $closeBtn = $modalWrapper.querySelector('.close_btn');

//constant
const SLIDER_COUNT = 4;
const SLIDER_TRANSITION = 2;
const SLIDER_DURATION = 3000;
const MODALSLIDER_COUNT = 3;
const MODALSLIDER_DURATION = 0.3;

// init state
$preBtn.style.display = 'none';
$resetBtn.style.display = 'none';
$modalWrapper.style.display = 'none';



(function slide() { 
  if (visualIndex === SLIDER_COUNT) {
    $slideBox.style.transform = `translateX(-${ 100 / (SLIDER_COUNT + 1) * (visualIndex+1)}%)`;
    $slideBox.style.transition = `${SLIDER_TRANSITION}s`;
    visualIndex++;
    setTimeout(slide, SLIDER_DURATION);
  } else {
    visualIndex = 0;
    $slideBox.style.transform = `translateX(-0%)`;
    $slideBox.style.transition = '0s';
    setTimeout(slide, 0);
  }
}
)();


(function timeBox() {
  const time = new Date();
  let month = time.getMonth();
  let day = time.getDay();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  $time.innerHTML = `${day}일${hour}:${minute}:${second}`;

  // Time Message
  const msgBox = hour > 17 ? 'evening': (hour < 11 ? 'morning':'afternoon');
  $msg.innerHTML = `Good ${msgBox}!`;
  // AM , PM 
  const ampm = hour < 12 ? 'AM' : 'PM';  
  // 12시간제로 바꾸기
  hour %= 12;
  // 10미만 0 붙히기
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;  
  second = second < 10 ? '0' + second : second;
  $time.innerHTML = `${month}월 ${day}일 ${hour}:${minute}:${second} ${ampm}`;
  setTimeout(timeBox,1000);
}());







// Render
const render = _recipes => {
  let html = '';
  _recipes.forEach(recipe => {
    html += `
      <li id ="${recipe.id}" class="recipe" tabindex="0"> 
        <figure><img class ="recipe_img" src="${recipe.imgSrc}" alt="${recipe.name} 이미지"></figure>
        <figcaption>${recipe.name}</figcaption>
      </li>`;
  });
  $recipeList.innerHTML = html;
};

// onload Event
window.onload = () => {
  recipes = [{
    id: 1,
    name: 'Boiled egg',
    ingredients: ['egg', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['ea', 'ml', 'g'],
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
    ingredientsUnits: ['g', 'g', 'ea', 'ml'],
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
    ingredientsUnits: ['ea', 'ml', 'g'],
    time: 10,
    cookImg: '/images/icon/icon_pot.png',
    content: '라자냐 어케 만들더라',
    imgSrc: '/images/lasagna.jpg'
  }, {
    id: 6,
    name: 'Pancake',
    ingredients: ['egg', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['ea', 'ml', 'g'],
    time: 10,
    cookImg: '/images/icon/icon_pot.png',
    content: '돈 주고 사먹으세요',
    imgSrc: '/images/pancake.jpg'
  }];
  recipes = recipes.sort((recipe1, recipe2) => recipe2.id - recipe1.id);
  render(recipes);
};


// Recipe Search
const recipeSearchRender = recipeName => {
  const regExp = new RegExp(recipeName, 'i');
  let searchRecipe = recipes.filter(recipe => regExp.test(recipe.name)); 
  if (!searchRecipe) {
    $recipeSearch.placeholder = '검색결과가 없습니다.'
    return;
  };
  render(searchRecipe);
  $recipeSearch.placeholder = '레시피 검색';
  $resetSortbtn.style.display = 'block';
};




$recipeSearch.onkeyup = e => {
  if (e.keyCode !== 13) return;
  // 방어코드 비어있을 때
  recipeSearchRender($recipeSearch.value);
  $recipeSearch.value = '';
}

$resetSortbtn.onclick = () => {
  $resetSortbtn.style.display = 'none';
  render(recipes);
}

const compare = key => {
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
};

// Sort by Name
$sortNameBtn.onclick = () => {
  recipes = recipes.sort(compare('name'));
  render();
};

// Sort by update
$sortDateBtn.onclick = () => {
  recipes = recipes.sort((recipe1, recipe2) => recipe2.id - recipe1.id);
  render();
}

// Recipe hover event
$recipeList.onmouseover = ({ target }) => {
  if (!target.matches('.recipe_list > li > figure > img')) return;
  target.style.opacity = '0.7';
};

$recipeList.onmouseout = ({ target }) => {
  if (!target.matches('.recipe_list > li > figure > img')) return;
  target.style.opacity = '1';
};

// Click Button to go top
$upBtn.onclick = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};





// Up Button display
window.onscroll = () => {
  if (!scrollTimer) {
    scrollTimer = setTimeout(function() {
      scrollTimer = null;
      if (document.documentElement.scrollTop > 200) {
        $upBtn.style.display = 'block';
      }
      if (document.documentElement.scrollTop <= 200) {
        $upBtn.style.display = 'none';
      }
    }, 200);
  }
};








// Modal Slider Function

const sliderFunc = (function () {
  let curPage = 0;
  return {
    nextPage() {
      if (curPage === MODALSLIDE_COUNT - 1) return;
      $modalList.style.transform = `translate3d(-${100 / MODALSLIDE_COUNT * (curPage + 1)}% , 0px, 0px)`;
      $modalList.style.transition = `${MODALSLIDER_DURATION}s`;
      curPage++;
      if (curPage === MODALSLIDE_COUNT - 1) { 
        $nextBtn.style.display = 'none';
        $resetBtn.style.display = 'inline-block';
      }
      $preBtn.style.display = 'inline-block';
    },
    prevPage() {
      $resetBtn.style.display = 'none';
      if (curPage === 0) return;
      $modalList.style.transform = `translate3d(-${100 / MODALSLIDE_COUNT * (curPage -1)}% , 0px, 0px)`;
      $modalList.style.transition = `${MODALSLIDER_DURATION}s`;
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
}());

// Modal Timer Function

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
          $timer.textContent = 'Done!';
          $timerStatus.style.display = 'none';
          $timerReset.style.display = 'inline-block';
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
    },
  }
}());

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
        <button class="timer_reset"></button>
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
      <span class="end"></span>
      <p class="ending_msg">bon appetit!</p>
    </div>
  </li>`
  $modalList.innerHTML = html;
  timer.setTimer(recipe.time);
  $ingredient = document.querySelector('.ingredient');
  $timerReset = document.querySelector('.timer_reset');
  $timerReset.onclick = e => {
    timer.setTimer(targetRecipe.time);
    timer.stopTimer();
    e.target.style.display = 'none';
    e.target.previousElementSibling.style.display = 'inline-block'; 
  };
};

// Ingredient change
const servingAmount = (serving = 1) => {
  let html = '';
  targetRecipe.ingredients.forEach((ingredient, index) => html += ` ${ingredient} : ${+targetRecipe.ingredientsAmounts[index] * +serving}${targetRecipe.ingredientsUnits[index]} &nbsp`);
  return html;
}; 


//EVENT HANDLER

$nextBtn.onclick = sliderFunc.nextPage;
$preBtn.onclick = sliderFunc.prevPage;
$resetBtn.onclick = sliderFunc.resetPage;
$closeBtn.onclick = () => {
  $modalWrapper.style.display = 'none';
  sliderFunc.resetPage();
  timer.stopTimer();
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

