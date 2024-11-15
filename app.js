document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable");
    const searchInput = document.getElementById("searchInput");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    const renderTable = () => {
        studentTable.innerHTML = students
            .filter(student => student.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            .map((student, index) => `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.address}</td>
                    <td><img src="${student.photo}" alt="Student Photo" width="50"></td>
                    <td>
                        <button onclick="editStudent(${index})" class="btn btn-success btn-sm"><i class="bi bi-pencil-square"></i></button>
                        <button onclick="deleteStudent(${index})" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `).join("");
    };

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("studentName").value;
        const roll = document.getElementById("studentRoll").value;
        const address = document.getElementById("studentAddress").value;
        const photoFile = document.getElementById("studentPhoto").files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const photo = reader.result;
            students.push({ name, roll, address, photo });
            localStorage.setItem("students", JSON.stringify(students));
            renderTable();
            studentForm.reset();
        };
        reader.readAsDataURL(photoFile);
    });

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentRoll").value = student.roll;
        document.getElementById("studentAddress").value = student.address;
        students.splice(index, 1);
        renderTable();
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    };

    searchInput.addEventListener("input", renderTable);
    renderTable();
});



























