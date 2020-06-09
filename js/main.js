
const $recipeSearch = document.querySelector('.recipe_search')
const $recipes = document.querySelector('.recipe_list');
const $upBtn = document.querySelector('.up_btn');
const $resetBtn = document.querySelector('.reset_btn')
const $searchBox = document.querySelector('.search_box')
const $sortNameBtn = document.querySelector('.sort_name_btn');
const $sortDateBtn = document.querySelector('.sort_date_btn');

let recipes = [];

// 랜더
const render = () => {
  let html = '';
  recipes.forEach(recipe => {
    html += `
      <li id ="${recipe.id}" class="recipe"> 
        <figure><img class ="recipe_img" src="${recipe.imgSrc}" alt="레시피이미지"></figure>
        <figcaption>${recipe.name}</figcaption>
      </li>`;
  });
  $recipes.innerHTML = html;
};

// 초기 데이터 리퀘스트 로드
window.onload = () => {
  recipes = [{
    id: 1,
    name: 'Boiled egg',
    ingredients: ['egg', 'water', 'salt'],
    ingredientsAmounts: [2, 600, 10],
    ingredientsUnits: ['개', 'ml', 'g'],
    content: '삶은 달걀',
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
  render();
};


// 레시피 검색
const recipeSearchRender = recipeName => {
  let searchRecipe = recipes.filter(recipe => recipe.name.toLowerCase() === recipeName.toLowerCase())[0];

  if (!searchRecipe) $recipeSearch.placeholder = '검색결과가 없습니다.';

  $recipes.innerHTML = `
  <li id ="${searchRecipe.id}" class="recipe" tabindex="0"> 
    <figure><img class ="recipe_img" src="${searchRecipe.imgSrc}" alt="레시피이미지"></figure>
    <figcaption>${searchRecipe.name}</figcaption>
  </li>`;
  $recipeSearch.placeholder = '레시피 검색';
}
$recipeSearch.onkeyup = e => {
  let recipeName = '';
  if (e.keyCode !== 13) return;
  recipeName = $recipeSearch.value;
  console.log(recipeName);
  $recipeSearch.value = '';
  recipeSearchRender(recipeName);
}
$resetBtn.onclick = () => {
  render();
}


// 이름순 레시피 정렬
$sortNameBtn.onclick = () => {
  function compare(key) {
    return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
  }
  console.log(recipes.sort(compare('name')));
  recipes = recipes.sort(compare('name'));
  render();
};
// 업데이트순 레시피 정렬
$sortDateBtn.onclick = () => {
  recipes = recipes.sort((recipe1, recipe2) => recipe2.id - recipe1.id);
  render();
}

// 레시피 호버시 이벤트
$recipes.onmouseover = ({ target }) => {
  if (!target.matches('.recipe_list > li > figure > img')) return;
  target.style.opacity = '0.7';
};
$recipes.onmouseout = ({ target }) => {
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
