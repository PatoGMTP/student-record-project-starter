import { Student } from './Student.js';
import { generateData, courses, valid_grades } from './Student_Data.js';
var header_enum;
(function (header_enum) {
    header_enum[header_enum["First Name"] = 0] = "First Name";
    header_enum[header_enum["Last Name"] = 1] = "Last Name";
    header_enum[header_enum["Course"] = 2] = "Course";
    header_enum[header_enum["Grade"] = 3] = "Grade";
    header_enum[header_enum["Passing?"] = 4] = "Passing?";
})(header_enum || (header_enum = {}));
;
const table = document.createElement("table");
let data_rows;
const header_row = document.createElement("tr");
const new_row = document.createElement("tr");
const sort = [0, false];
const edit = [false];
const students = [];
document.addEventListener("DOMContentLoaded", main);
function main() {
    const table_title = document.createElement("a");
    table_title.innerHTML = "Student Records - double click me to enter edit mode";
    table_title.addEventListener("dblclick", evt => {
        edit[0] = !edit[0];
        if (edit[0]) {
            table_title.innerHTML = `Student Records - Edit Mode`;
            table_title.appendChild(document.createElement("br"));
            table_title.innerHTML += `Double click a row to delete it, click on a grade to edit.`;
            table_title.appendChild(document.createElement("br"));
            table_title.innerHTML += `Press 'Enter' to save changes when editting grades.`;
        }
        else {
            table_title.innerHTML = `Student Records`;
        }
    });
    const div = document.createElement("div");
    const fname_header = document.createElement("th");
    fname_header.id = header_enum['First Name'].toString();
    const lname_header = document.createElement("th");
    lname_header.id = header_enum['Last Name'].toString();
    const course_header = document.createElement("th");
    course_header.id = header_enum.Course.toString();
    const grade_header = document.createElement("th");
    grade_header.id = header_enum.Grade.toString();
    const passing_header = document.createElement("th");
    passing_header.id = header_enum['Passing?'].toString();
    const headers = [fname_header, lname_header, course_header, grade_header, passing_header];
    const header_text_arr = ["First Name", "Last Name", "Course", "Grade", "Passing?"];
    document.body.appendChild(table_title);
    document.body.appendChild(div);
    div.appendChild(table);
    headers.forEach((item, i) => item.innerHTML = header_text_arr[i]);
    headers.forEach(item => item.classList.add("header"));
    headers.forEach(item => item.addEventListener("click", evt => {
        sortStudents(item.id);
    }));
    headers.forEach(item => header_row.appendChild(item));
    table.appendChild(header_row);
    const new_tds = [];
    for (let i = 0; i < 5; i++)
        new_tds.push(document.createElement("td"));
    const new_form = document.createElement("form");
    new_form.id = "new_form";
    // new_tds[0].appendChild(new_form);
    new_row.appendChild(new_form);
    const new_fname = document.createElement("input");
    new_fname.placeholder = "New First Name";
    const new_lname = document.createElement("input");
    new_lname.placeholder = "New Last Name";
    const new_course = document.createElement("select");
    for (const item of courses) {
        const option = document.createElement("option");
        option.value = item;
        option.innerHTML = item;
        new_course.appendChild(option);
    }
    const new_grade = document.createElement("input");
    new_grade.placeholder = "Grade For " + new_course.value;
    new_course.addEventListener("change", evt => { new_grade.placeholder = "Grade For " + new_course.value; });
    new_tds[4].innerHTML = "New Record";
    new_tds[0].appendChild(new_fname);
    new_tds[1].appendChild(new_lname);
    new_tds[2].appendChild(new_course);
    new_tds[3].appendChild(new_grade);
    new_tds[4].addEventListener("click", evt => {
        if (new_form.checkValidity())
            mySubmitFunction(new_fname, new_lname, new_course, new_grade, new_form);
        else
            new_form.reportValidity();
    });
    for (let i = 0; i < 4; i++) {
        new_tds[i].children[0].setAttribute("type", "text");
        new_tds[i].children[0].setAttribute("required", "true");
        new_tds[i].children[0].setAttribute("form", "new_form");
        new_tds[i].addEventListener("click", evt => {
            let child = new_tds[i].children[0];
            child.focus();
        });
    }
    new_tds.forEach(item => new_row.appendChild(item));
    const student_data_input = generateData();
    for (const item of student_data_input) {
        students.push(new Student(item.first_name, item.last_name, item.course, item.grade));
    }
    makeList(students);
    renderTable();
}
function mySubmitFunction(new_fname, new_lname, new_course, new_grade, new_form) {
    let valid = false;
    let grade = -1;
    if (valid_grades.includes(new_grade.value.toUpperCase())) {
        valid = true;
        grade = new_grade.value.toUpperCase();
    }
    else {
        let num = parseInt(new_grade.value);
        if (!isNaN(num) && num >= 0) {
            valid = true;
            grade = num;
        }
    }
    if (valid) {
        const new_student = new Student(new_fname.value, new_lname.value, new_course.value, grade);
        students.push(new_student);
        const row = makeNewRow(new_student);
        new_form.reset();
        renderTable();
        row.style.backgroundColor = "lightgreen";
        setTimeout(() => { row.style.backgroundColor = ""; }, 3000);
    }
    else {
        new_grade.value = "";
        alert("Enter a valid grade!");
    }
}
function renderTable() {
    table.innerHTML = "";
    table.appendChild(header_row);
    if (sort[0] === header_enum.Grade) {
        data_rows.sort(function (a, b) {
            const nameA = a.children[sort[0]].getAttribute("data-value").toLowerCase(), nameB = b.children[sort[0]].getAttribute("data-value").toLowerCase();
            if (+nameA > +nameB) //sort string ascending
             {
                if (sort[1])
                    return 1;
                else
                    return -1;
            }
            if (+nameA < +nameB) {
                if (sort[1])
                    return -1;
                else
                    return 1;
            }
            return 0; //default return value (no sorting)
        });
    }
    else {
        data_rows.sort(function (a, b) {
            const nameA = a.children[sort[0]].getAttribute("data-value").toLowerCase(), nameB = b.children[sort[0]].getAttribute("data-value").toLowerCase();
            if (nameA < nameB) //sort string ascending
             {
                if (sort[1])
                    return 1;
                else
                    return -1;
            }
            if (nameA > nameB) {
                if (sort[1])
                    return -1;
                else
                    return 1;
            }
            return 0; //default return value (no sorting)
        });
    }
    data_rows.forEach(row => table.appendChild(row));
    table.appendChild(new_row);
}
function sortStudents(id) {
    if (+id === sort[0])
        sort[1] = !sort[1];
    else
        sort[1] = false;
    sort[0] = +id;
    renderTable();
}
function makeList(students) {
    data_rows = [];
    for (const student of students) {
        makeNewRow(student);
    }
    data_rows.forEach(item => item.addEventListener("dblclick", evt => {
        if (edit[0]) {
            data_rows = data_rows.filter(row => row !== item);
            renderTable();
        }
    }));
}
function makeNewRow(student) {
    const fname = document.createElement("td");
    const lname = document.createElement("td");
    const course = document.createElement("td");
    const grade = document.createElement("td");
    grade.id = "grade";
    const passing = document.createElement("td");
    passing.id = "passing";
    const row = document.createElement("tr");
    const arr = [fname, lname, course, grade, passing];
    let data = student.get_data();
    setRowData(arr, data, student);
    arr.forEach(item => row.appendChild(item));
    grade.addEventListener("click", evt => {
        if (edit[0]) {
            grade.innerHTML = "";
            let input = document.createElement("input");
            input.value = grade.getAttribute("data-value");
            input.addEventListener("keydown", evt => {
                console.log(evt.key);
                if (evt.key === "Enter") {
                    let num = parseInt(input.value);
                    console.log(num);
                    if (!isNaN(num) && num >= 0) {
                        student.update_grade(num);
                        data = student.get_data();
                        setRowData(arr, data, student);
                        row.style.backgroundColor = "lightblue";
                        setTimeout(() => { row.style.backgroundColor = ""; }, 3000);
                        setTimeout(() => { renderTable(); }, 1500);
                    }
                    else {
                        input.value = "";
                        alert("Enter a valid number!");
                    }
                }
            });
            grade.appendChild(input);
            input.focus();
        }
    });
    data_rows.push(row);
    return row;
}
function setRowData(arr, data, student) {
    arr.forEach(item => item.classList.add("data"));
    arr.forEach((item, i) => item.innerHTML = data[i]);
    arr.forEach((item, i) => item.setAttribute("data-value", data[i]));
    const grade = arr.find(item => item.id === "grade");
    const passing = arr.find(item => item.id === "passing");
    grade.setAttribute("data-value", student.grade_int.toString());
    if (student.is_passing) {
        passing.innerHTML = "&#9989;";
        grade.style.backgroundColor = "inherit";
    }
    else {
        // passing.innerHTML = "&#10071;";
        passing.innerHTML = "&#10060;";
        grade.style.backgroundColor = "#F08080";
    }
}
