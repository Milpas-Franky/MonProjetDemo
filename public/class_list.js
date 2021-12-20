const classTableBody = document.getElementById("classTableBody");

const token = sessionStorage.getItem("token");
if (!token) {
  location.assign("/login.html");
}

function populateTable(classes) {
  const classRows = classes.map((c) => {
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    nameCol.innerText = c.shortName;
    row.appendChild(nameCol);

    const euCol = document.createElement("td");
    euCol.innerText = c.educationUnit.name;
    row.appendChild(euCol);

    const teacherCol = document.createElement("td");
    teacherCol.innerText = [c.teacher.firstName, c.teacher.lastName].join(" ");
    row.appendChild(teacherCol);

    return row;
  });
  classTableBody.replaceChildren(...classRows);
}

fetch("/classes/", {
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((response) => response.json())
  .then((classes) => populateTable(classes));
