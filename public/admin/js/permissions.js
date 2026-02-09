const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const rows = tablePermissions.querySelectorAll("[data-name]");
    let permissions = [];
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const input = row.querySelectorAll("input");
      if (name == "id") {
        input.forEach((input) => {
          const value = input.value;
          permissions.push({ id: value, permissions: [] });
        });
      } else {
        input.forEach((item, index) => {
          if (item.checked == true) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if (permissions.permissions.length > 0) {
      const formSubmitPermissions = document.querySelector(
        "#form-submit-permissions",
      );
      const input = formSubmitPermissions.querySelector("input");
      input.value = JSON.stringify(permissions);
      formSubmitPermissions.submit();
    }
  });
}
