import { handleMovieClick } from "./app.js";
export const moveSlidesLeft = (slidesContainerId) => {
  return () => {
    const slidesContainer = document.getElementById(slidesContainerId);
    const slides = slidesContainer.children;
    let firstSlideClone = slides[0].cloneNode();
    slidesContainer.appendChild(firstSlideClone);
    handleMovieClick(firstSlideClone);
    slidesContainer.removeChild(slides[0]);
  };
};

export const moveSlidesRight = (slidesContainerId) => {
  return () => {
    let slidesContainer = document.getElementById(slidesContainerId);
    const slides = slidesContainer.children;
    let lastSlideClone = slides[slides.length - 1].cloneNode();
    slidesContainer.insertBefore(lastSlideClone, slides[0]);
    handleMovieClick(lastSlideClone);
    slidesContainer.removeChild(slides[slides.length - 1]);
  };
};
