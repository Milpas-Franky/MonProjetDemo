const PAGINATION_LIMIT = 10;

const classInfo = document.getElementById("classInfo");
const inProgressMsg = document.getElementById("inProgressMsg");
const noStudentMsg = document.getElementById("noStudentMsg");
const errorMsg = document.getElementById("errorMsg");
const studentTable = document.getElementById("studentTable");
const studentTableBody = document.getElementById("studentTableBody");
const previousStudents = document.getElementById("previousStudents");
const nextStudents = document.getElementById("nextStudents");
const navigationInfo = document.getElementById("navigationInfo");

const token = sessionStorage.getItem("token");
if (!token) {
  location.assign("/login.html");
}

const populateClassInfo = (classData) => {
  const teacherName = [
    classData.teacher.firstName,
    classData.teacher.lastName,
  ].join(" ");
  classInfo.innerText = [
    classData.educationUnit.name,
    teacherName,
    classData.academicYear,
  ].join(" - ");
};

let currentOffset = 0;

previousStudents.addEventListener("click", (event) => {
  currentOffset -= PAGINATION_LIMIT;
  fetchStudents(currentOffset);
});

nextStudents.addEventListener("click", (event) => {
  currentOffset += PAGINATION_LIMIT;
  fetchStudents(currentOffset);
});

const populateStudentTable = (studentsData) => {
  const studentCount = studentsData.count;
  if (studentCount === 0) {
    studentTable.classList.add("d-none");
    noStudentMsg.classList.remove("d-none");
  } else {
    const studentList = studentsData.rows;
    const studentListLength = studentList.length;
    const firstStudent = currentOffset + 1;
    const lastStudent = currentOffset + studentListLength;
    const tableRows = studentList.map((student) => {
      const row = document.createElement("tr");
      const firstNameCol = document.createElement("td");
      firstNameCol.innerText = student.firstName;
      row.appendChild(firstNameCol);
      const lastNameCol = document.createElement("td");
      lastNameCol.innerText = student.lastName.toUpperCase();
      row.appendChild(lastNameCol);
      return row;
    });
    studentTableBody.replaceChildren(...tableRows);
    studentTable.classList.remove("d-none");
    noStudentMsg.classList.add("d-none");

    navigationInfo.innerText = `Étudiants ${firstStudent} - ${lastStudent} sur ${studentCount} inscrits`

    if (lastStudent === studentCount) {
      nextStudents.classList.add("d-none");
    } else {
      nextStudents.classList.remove("d-none");
    }

    if (firstStudent === 1) {
      previousStudents.classList.add("d-none");
    } else {
      previousStudents.classList.remove("d-none");
    }
  }
  inProgressMsg.classList.add("d-none");
};

const currentUrl = new URL(document.location);
const classId = currentUrl.searchParams.get("class_id");

const fetchHeaders = {
  Authorization: `Bearer ${token}`,
};

fetch(`/classes/${classId}`, { headers: fetchHeaders })
  .then((response) => response.json())
  .then((classData) => populateClassInfo(classData));

const fetchStudents = (offset) => {
  const studentRequestParams = new URLSearchParams({ limit: PAGINATION_LIMIT, offset: offset });
  fetch(`/classes/${classId}/students?${studentRequestParams.toString()}`, {
    headers: fetchHeaders,
  })
    .then((response) => response.json())
    .then((studentsData) => populateStudentTable(studentsData));
}

fetchStudents(currentOffset);
