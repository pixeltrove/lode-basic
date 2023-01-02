// TOGGLE SCROLL
// -----------------------------------------------------------------------------

function toggleScroll() {
  const isScrollableY = document.documentElement.clientHeight < document.documentElement.scrollHeight;
  const scrollPositionY = window.scrollY || Math.abs(parseInt(document.body.style.top));

  document.body.style.position = isScrollableY ? "fixed" : "";
  document.body.style.top = isScrollableY ? -scrollPositionY + "px" : "";
  document.body.style.overflowY = isScrollableY ? "scroll" : "";

  window.scroll(0, scrollPositionY);
}

export default toggleScroll;
