"use strict";
class Student {
    constructor(first_name, last_name, course, grade) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.course = course;
        this.grade = grade;
        this.is_passing = false;
        this.grade_int = -1;
        this.grade_letter = "";
        this.check_passing();
    }
    // static letter_to_number: Map<string, number> = new Map();
    // static
    // {
    //     this.letter_to_number.set("A+", 100);
    //     this.letter_to_number.set("A", 95);
    //     this.letter_to_number.set("A-", 90);
    //     this.letter_to_number.set("B+", 88);
    //     this.letter_to_number.set("B", 84);
    //     this.letter_to_number.set("B-", 80);
    //     this.letter_to_number.set("C+", 78);
    //     this.letter_to_number.set("C", 74);
    //     this.letter_to_number.set("C-", 70);
    //     this.letter_to_number.set("D+", 68);
    //     this.letter_to_number.set("D", 64);
    //     this.letter_to_number.set("D-", 60);
    //     this.letter_to_number.set("F", 50);
    // }
    static letter_to_number(letter) {
        switch (letter) {
            case "A+": return 100;
            case "A": return 95;
            case "A-": return 90;
            case "B+": return 88;
            case "B": return 84;
            case "B-": return 80;
            case "C+": return 78;
            case "C": return 74;
            case "C-": return 70;
            case "D+": return 68;
            case "D": return 64;
            case "D-": return 60;
            default: return 50;
        }
    }
    static number_to_letter(grade) {
        if (grade >= 96)
            return "A+";
        if (grade >= 93)
            return "A";
        if (grade >= 90)
            return "A-";
        if (grade >= 86)
            return "B+";
        if (grade >= 83)
            return "B";
        if (grade >= 80)
            return "B-";
        if (grade >= 76)
            return "C+";
        if (grade >= 73)
            return "C";
        if (grade >= 70)
            return "C-";
        if (grade >= 66)
            return "D+";
        if (grade >= 63)
            return "D";
        if (grade >= 60)
            return "D-";
        return "F";
    }
    check_passing() {
        if (typeof this.grade === "string") {
            this.grade_int = Student.letter_to_number(this.grade.toUpperCase());
            this.grade_letter = this.grade;
        }
        else {
            this.grade_int = this.grade;
            this.grade_letter = Student.number_to_letter(this.grade);
        }
        this.is_passing = this.grade_int >= Student.minimum_grade;
    }
    update_grade(grade) {
        this.grade = grade;
        this.check_passing();
    }
    get_data() {
        return [this.first_name, this.last_name, this.course, this.grade_letter, (+this.is_passing).toString()];
    }
}
Student.passing_grades = ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"];
Student.minimum_grade = 70;
document.addEventListener("DOMContentLoaded", main);
const header_text_arr = ["First Name", "Last Name", "Course", "Grade", "Passing?"];
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
const fname_header = document.createElement("th");
const lname_header = document.createElement("th");
const course_header = document.createElement("th");
const grade_header = document.createElement("th");
const passing_header = document.createElement("th");
const headers = [fname_header, lname_header, course_header, grade_header, passing_header];
const header_row = document.createElement("tr");
const sort = [0, false];
const students = [];
function main() {
    headers.forEach((item, i) => item.innerHTML = header_text_arr[i]);
    headers.forEach(item => item.classList.add("header"));
    headers.forEach(item => item.addEventListener("click", evt => {
        sortStudents(item.innerHTML);
    }));
    headers.forEach(item => header_row.appendChild(item));
    table.appendChild(header_row);
    const student_data_input = generateData();
    for (const item of student_data_input) {
        students.push(new Student(item.first_name, item.last_name, item.course, item.grade));
    }
    makeList();
    data_rows.forEach(item => item.addEventListener("dblclick", evt => {
        // console.log(evt.target);
        // let input = document.createElement("input");
        // let button = document.createElement("button");
        data_rows = data_rows.filter(row => row !== item);
        renderTable();
    }));
    // table.style.width = "100%";
    // const div: HTMLDivElement = document.createElement("div");
    // const table_static: HTMLTableElement = document.createElement("table");
    // table_static.appendChild(header_row);
    // div.appendChild(table_static);
    // div.appendChild(table);
    // document.body.appendChild(div);
    document.body.appendChild(table);
    renderTable();
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
}
function sortStudents(input) {
    switch (input) {
        case header_text_arr[header_enum["First Name"]]:
            if (sort[0] == header_enum["First Name"])
                sort[1] = !sort[1];
            else
                sort[1] = false;
            sort[0] = header_enum["First Name"];
            renderTable();
            break;
        case header_text_arr[header_enum["Last Name"]]:
            if (sort[0] == header_enum["Last Name"])
                sort[1] = !sort[1];
            else
                sort[1] = false;
            sort[0] = header_enum["Last Name"];
            renderTable();
            break;
        case header_text_arr[header_enum["Course"]]:
            if (sort[0] == header_enum["Course"])
                sort[1] = !sort[1];
            else
                sort[1] = false;
            sort[0] = header_enum["Course"];
            renderTable();
            break;
        case header_text_arr[header_enum["Grade"]]:
            if (sort[0] == header_enum["Grade"])
                sort[1] = !sort[1];
            else
                sort[1] = false;
            sort[0] = header_enum["Grade"];
            renderTable();
            break;
        case header_text_arr[header_enum["Passing?"]]:
            if (sort[0] == header_enum["Passing?"])
                sort[1] = !sort[1];
            else
                sort[1] = false;
            sort[0] = header_enum["Passing?"];
            renderTable();
            break;
    }
}
function generateData() {
    const initial_data = [];
    const names = [["John", "Arbuckle"], ["Sally", "Holmes"], ["Carl", "Wheezer"], ["Kim", "Possible"]];
    const grades = [[100, 95, 90, 88, 84, 80, 78, 74, 70, 68, 64, 60, 50], ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"]];
    const courses = ["ENG 101", "MTH 101", "CHM 101", "ART 101"];
    for (let i = 0; i < names.length; i++) {
        // let name = names[Math.floor(Math.random()*names.length)];
        // let course = courses[Math.floor(Math.random()*courses.length)];
        let name = names[i];
        for (let j = 0; j < courses.length; j++) {
            let course = courses[j];
            let oneOrZero = (Math.random() >= 0.5) ? 1 : 0;
            let grade = grades[oneOrZero][Math.floor(Math.random() * grades[oneOrZero].length)];
            initial_data.push({
                first_name: name[0],
                last_name: name[1],
                course: course,
                grade: grade,
            });
        }
    }
    return initial_data;
}
function makeList() {
    data_rows = [];
    for (const student of students) {
        const fname = document.createElement("td");
        const lname = document.createElement("td");
        const course = document.createElement("td");
        const grade = document.createElement("td");
        grade.addEventListener("click", evt => {
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
                        makeList();
                        renderTable();
                    }
                    else {
                        input.value = "";
                        alert("Enter a valid number!");
                    }
                }
            });
            grade.appendChild(input);
            input.focus();
        });
        const passing = document.createElement("td");
        const arr = [fname, lname, course, grade, passing];
        const data = student.get_data();
        const row = document.createElement("tr");
        arr.forEach(item => item.classList.add("data"));
        arr.forEach((item, i) => item.innerHTML = data[i]);
        arr.forEach((item, i) => item.setAttribute("data-value", data[i]));
        // let v = &#10071;
        grade.setAttribute("data-value", student.grade_int.toString());
        if (student.is_passing)
            passing.innerHTML = "&#9989;";
        else {
            passing.innerHTML = "&#10071;";
            grade.style.backgroundColor = "#F08080";
        }
        arr.forEach(item => row.appendChild(item));
        data_rows.push(row);
    }
}
