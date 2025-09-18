const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryList = document.getElementById('categoryList');
const message = document.getElementById('message');

addCategoryBtn.addEventListener('click', () => {
    const categoryName = prompt("Add meg az új kategória nevét:");
    if(categoryName) {
        const li = document.createElement('li');
        li.textContent = categoryName;
        li.className = 'category';
        categoryList.appendChild(li);
        message.textContent = `Átdobva a(z) ${categoryName} kategóriába.`;
    }
});

document.getElementById('flashcardsBtn').addEventListener('click', () => {
    message.textContent = "Nincsenek kártyák.";
});

document.getElementById('quizBtn').addEventListener('click', () => {
    message.textContent = "Nincsenek kártyák.";
});

document.getElementById('addQuestionBtn').addEventListener('click', () => {
    message.textContent = "Új kérdés hozzáadása.";
});