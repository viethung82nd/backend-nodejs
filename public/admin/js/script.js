//Filter
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}

//End filter

//Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//End Search

//paging
const buttonPaging = document.querySelectorAll("[button-paging]");

if (buttonPaging) {
  let url = new URL(window.location.href);

  buttonPaging.forEach((paging) => {
    paging.addEventListener("click", () => {
      const currentPage = paging.getAttribute("button-paging");

      url.searchParams.set("page", currentPage);
      window.location.href = url.href;
    });
  });
}
//end paging
