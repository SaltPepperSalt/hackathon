//state 

const recipes = [{
  id: 1,
  name: 'Boiled egg',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  time: 10,
  cookImg: '/images/icon/icon_pot2.png',
  content: '물에 넣고 삶아주세요',
  imgSrc: '/images/boiledegg.jpg'
}, {
  id: 2,
  name: 'Steak',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: '/images/steak.jpg'
}, {
  id: 3,
  name: 'Beef',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: '/images/beef.jpg'
}, {
  id: 4,
  name: 'Spaghetti',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: '/images/spa.jpg'
}, {
  id: 5,
  name: 'Lasagna',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: '/images/lasagna.jpg'
}, {
  id: 6,
  name: 'Pancake',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: '/images/pancake.jpg'
}];
let targetRecipe = {};
const $recipes = document.querySelector('.recipe_list');
const $upBtn = document.querySelector('.up_btn');

// 초기 데이터 리퀘스트
window.onload = () => {
  let html = '';
  recipes.forEach(recipe => {
    html += `
      <li id ="${recipe.id}" class="recipe"> 
        <figure><img class ="recipe_img" src="${recipe.imgSrc}" alt="레시피이미지"></figure>
        <figcaption>${recipe.name}</figcaption>
      </li>`;
  });
  $recipes.innerHTML = html;
}

// 페이지 최상단으로 이동
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



// DOM
const $recipeList = document.querySelector('.recipe_list');
const $resetBtn = document.querySelector('.reset_btn');
const $preBtn = document.querySelector('.pre_btn');
const $closeBtn = document.querySelector('.close_btn');
const $nextBtn = document.querySelector('.next_btn');
const $modalList = document.querySelector('.modal_list');
const $modalWrapper = document.querySelector('.modal_wrapper');
let $ingredient = '';
// init state
$preBtn.style.display = 'none';
$resetBtn.style.display = 'none';
$modalWrapper.style.display = 'none';


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

const timer = (function () {
  let time = 0;
  let stopCode = 0;
  return {
    startTimer(_time) {
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


const renderModal = recipe => {
  let html = '';
  html += `<li class="modal_view">
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
        <div class="timer">${recipe.time}</div>
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