// const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

// if (buttonChangeStatus.length > 0) {
//   const formChange = document.querySelector("[form-change-status]");
//   // const path = formChange.getAttribute("path");
//   buttonChangeStatus.forEach((button) => {
//     button.addEventListener("click", () => {
//       const currentStatus = button.getAttribute("data-status");

//       let changedStatus = currentStatus == "active" ? "inactive" : "active";
//       const id = button.getAttribute("data-id");

//       // const action = `${path}/${changedStatus}/${id}`;
//       formChange.action = `/admin/products/change-status/${changedStatus}/${id}`;
//       console.log(formChange.action);
//       formChange.submit();
//     });
//   });
// }

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  const formChange = document.querySelector("#form-change-status");
  const path = formChange.getAttribute("path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const changedStatus = currentStatus == "active" ? "inactive" : "active";

      formChange.action = path + `/${changedStatus}/${id}?_method=PATCH`;

      formChange.submit();
    });
  });
}
