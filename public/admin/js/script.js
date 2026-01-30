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

// Multi change status

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const multiInput = checkboxMulti.querySelector("input[name='checkall']");
  const input = checkboxMulti.querySelectorAll("input[name='id']");
  multiInput.addEventListener("click", () => {
    if (multiInput.checked) {
      input.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      input.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });

  input.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name= 'id']:checked",
      );
      if (countChecked.length == input.length) {
        multiInput.checked = true;
      } else {
        multiInput.checked = false;
      }
    });
  });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name= 'id']:checked",
    );

    const typeChange = formChangeMulti.querySelector(
      "select[name='type']",
    ).value;

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach((checked) => {
        if (typeChange == "change-position") {
          const position = checked
            .closest("tr")
            .querySelector("input[name='position']").value;
          const idAndPosition = `${checked.value}-${position}`;
          //console.log(idAndPosition);
          ids.push(idAndPosition);
        } else {
          ids.push(checked.value);
        }
      });
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    }
  });
}
// End multi change status

// Delete product
const buttonDelete = document.querySelectorAll("[button-delete]");

if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("delete-id");

      const path = formDelete.getAttribute("path");
      const action = `${path}/${id}?_method=DELETE`;
      formDelete.action = action;
      formDelete.submit();
    });
  });
}

// End delete product

// Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  if (closeAlert) {
    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
}
// End Alert

// Upload Image
const upload = document.querySelector("[upload-image]");
if (upload) {
  const imageInput = document.querySelector("[image-input]");
  const imagePreview = document.querySelector("[image-preview]");
  const removeBtn = document.getElementById("removeImage");
  if (imagePreview.src) {
    upload.classList.add("has-image");
  }
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    imagePreview.src = URL.createObjectURL(file);
    upload.classList.add("has-image");
  });

  removeBtn.addEventListener("click", function () {
    imagePreview.src = "";
    upload.classList.remove("has-image");
    imageInput.value = "";
  });
}
//End Upload Image
