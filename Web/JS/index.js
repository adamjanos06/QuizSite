document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("scroll-container");
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");

  const scrollAmount = 300;

  // Duplikáljuk a kártyákat (1x balra, 1x jobbra)
  const cardsHTML = scrollContainer.innerHTML;
  scrollContainer.innerHTML = cardsHTML + cardsHTML + cardsHTML;

  // Elhelyezzük a scrollt a középső (másolt) részre
  const oneCopyWidth = scrollContainer.scrollWidth / 3;
  scrollContainer.scrollLeft = oneCopyWidth;

  // Végtelen hatás: ha elérünk egy szélt, átugrik a középső szakaszra
  scrollContainer.addEventListener("scroll", () => {
    if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = oneCopyWidth;
    } else if (scrollContainer.scrollLeft >= oneCopyWidth * 2) {
      scrollContainer.scrollLeft = oneCopyWidth;
    }
  });

  // Nyilak kezelése
  scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});
