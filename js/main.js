const recipes = [{
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
