//state 

const recipes = [{
  id: 1,
  name: 'Boiled egg',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/boiledegg.jpg"
}, {
  id: 2,
  name: 'Steak',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/steak.jpg"
}, {
  id: 3,
  name: 'Beef',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/beef.jpg"
}, {
  id: 4,
  name: 'Spaghetti',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/spa.jpg"
}, {
  id: 5,
  name: 'Lasagna',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/lasagna.jpg"
}, {
  id: 6,
  name: 'Pancake',
  ingredients: ['egg', 'water', 'salt'],
  ingredientsAmounts: [2, 600, 10],
  ingredientsUnits: ['개', 'ml', 'g'],
  content: '삶은 달걀',
  imgSrc: "./images/pancake.jpg"
}];


// DOM
const $recipeList = document.querySelector('.recipe_list');
const $resetBtn = document.querySelector('.reset_btn');
const $preBtn = document.querySelector('.pre_btn');
const $closeBtn = document.querySelector('.close_btn');
const $nextBtn = document.querySelector('.next_btn');
const $modalList = document.querySelector('.modal_list');
const $modalWrapper = document.querySelector('.modal_wrapper');
const $timer = document.querySelector('.timer');
const $timerStart = document.

// init state
$preBtn.style.display = 'none';
$resetBtn.style.display = 'none';


const sliderFunc = (function () {
  let curPage = 0;
  return {
    nextPage() {
      if (curPage === 2) return;
      $modalList.style.transform = `translate3d(-${200 * (curPage + 1)}px , 0px, 0px)`;
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
      $modalList.style.transform = `translate3d(-${200 * (curPage -1)}px , 0px, 0px)`;
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
  let time = 120;
  let stopCode = 0;
  $timer.textContent = time;
  return {
    startTimer() {
      stopCode = setInterval(() => {
        time--;
        $timer.textContent = time;
      }, 1000);
    },
    stopTimer() {
      clearInterval(stopCode);
    }
  }
})();

$nextBtn.onclick = sliderFunc.nextPage;
$preBtn.onclick = sliderFunc.prevPage;
$resetBtn.onclick = sliderFunc.resetPage;
$closeBtn.onclick = () => {
  $modalWrapper.style.display = 'none';
};