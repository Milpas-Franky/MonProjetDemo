const classTableBody = document.getElementById("classTableBody");

const token = sessionStorage.getItem("token");
if (!token) {
  location.assign("/login.html");
}

function populateTable(classes) {
  const classRows = classes.map((c) => {
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    const studentListLink = document.createElement("a");
    const params = new URLSearchParams({ class_id: c.id });
    studentListLink.href = `/student_list.html?${params.toString()}`;
    studentListLink.innerText = c.shortName;
    nameCol.appendChild(studentListLink);
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
