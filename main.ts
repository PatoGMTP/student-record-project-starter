import { Student } from './Student.js'
import { generateData } from './Student_Data.js'
document.addEventListener("DOMContentLoaded", main);

const header_text_arr: string[] = ["First Name", "Last Name", "Course", "Grade", "Passing?"];
enum header_enum {"First Name", "Last Name", "Course", "Grade", "Passing?"};

const table: HTMLTableElement = document.createElement("table");
let data_rows: HTMLTableRowElement[];

const fname_header: HTMLTableCellElement = document.createElement("th");
const lname_header: HTMLTableCellElement = document.createElement("th");
const course_header: HTMLTableCellElement = document.createElement("th");
const grade_header: HTMLTableCellElement = document.createElement("th");
const passing_header: HTMLTableCellElement = document.createElement("th");

const headers: HTMLTableCellElement[] = [fname_header, lname_header, course_header, grade_header, passing_header];
const header_row: HTMLTableRowElement = document.createElement("tr");

const sort: [number, boolean] = [0, false];

const students: Student[] = [];

function main()
{
    headers.forEach((item, i) => item.innerHTML = header_text_arr[i]);
    headers.forEach(item => item.classList.add("header"));
    headers.forEach(item => item.addEventListener("click", evt => {
        sortStudents(item.innerHTML);
    }))
    headers.forEach(item => header_row.appendChild(item));
    table.appendChild(header_row);

    const student_data_input = generateData();

    for (const item of student_data_input)
    {
        students.push(new Student(item.first_name, item.last_name, item.course, item.grade));
    }

    makeList();

    document.body.appendChild(table);

    renderTable();
}

function renderTable(): void
{
    table.innerHTML = "";

    table.appendChild(header_row);

    if (sort[0] === header_enum.Grade)
    {
        data_rows.sort(function(a, b){
        const nameA=a.children[sort[0]].getAttribute("data-value")!.toLowerCase(), nameB=b.children[sort[0]].getAttribute("data-value")!.toLowerCase();
        if (+nameA > +nameB) //sort string ascending
        {
            if (sort[1]) return 1;
            else return -1;
        }
        if (+nameA < +nameB)
        {
            if (sort[1]) return -1;
            else return 1;
        }
        return 0; //default return value (no sorting)
       })
    }
    else
    {
        data_rows.sort(function(a, b){
            const nameA=a.children[sort[0]].getAttribute("data-value")!.toLowerCase(), nameB=b.children[sort[0]].getAttribute("data-value")!.toLowerCase();
            if (nameA < nameB) //sort string ascending
            {
                if (sort[1]) return 1;
                else return -1;
            }
            if (nameA > nameB)
            {
                if (sort[1]) return -1;
                else return 1;
            }
            return 0; //default return value (no sorting)
           })
    }

    data_rows.forEach(row => table.appendChild(row));
}

function sortStudents(input: string): void
{
    switch (input)
    {
        case header_text_arr[header_enum["First Name"]]:
            if (sort[0] == header_enum["First Name"]) sort[1] = !sort[1];
            else sort[1] = false;
            sort[0] = header_enum["First Name"];
            renderTable();
            break;
        case header_text_arr[header_enum["Last Name"]]:
            if (sort[0] == header_enum["Last Name"]) sort[1] = !sort[1];
            else sort[1] = false;
            sort[0] = header_enum["Last Name"];
            renderTable();
            break;
        case header_text_arr[header_enum["Course"]]:
            if (sort[0] == header_enum["Course"]) sort[1] = !sort[1];
            else sort[1] = false;
            sort[0] = header_enum["Course"];
            renderTable();
            break;
        case header_text_arr[header_enum["Grade"]]:
            if (sort[0] == header_enum["Grade"]) sort[1] = !sort[1];
            else sort[1] = false;
            sort[0] = header_enum["Grade"];
            renderTable();
            break;
        case header_text_arr[header_enum["Passing?"]]:
            if (sort[0] == header_enum["Passing?"]) sort[1] = !sort[1];
            else sort[1] = false;
            sort[0] = header_enum["Passing?"];
            renderTable();
            break;
    }
}

function makeList(): void
{
    data_rows = [];

    for (const student of students)
    {
        const fname: HTMLTableCellElement = document.createElement("td");
        const lname: HTMLTableCellElement = document.createElement("td");
        const course: HTMLTableCellElement = document.createElement("td");
        const grade: HTMLTableCellElement = document.createElement("td");
        grade.addEventListener("click", evt => {
            grade.innerHTML = "";
            let input: HTMLInputElement = document.createElement("input");
            input.value = grade.getAttribute("data-value")!;
            input.addEventListener("keydown", evt => {
                console.log(evt.key);
                if (evt.key === "Enter")
                {
                    let num: number = parseInt(input.value);

                    console.log(num);

                    if (!isNaN(num) && num >= 0)
                    {
                        student.update_grade(num);
                        makeList();
                        renderTable();
                    }
                    else
                    {
                        input.value = "";
                        alert("Enter a valid number!");
                    }
                }
            });
            grade.appendChild(input);
            input.focus();
        });
        const passing: HTMLTableCellElement = document.createElement("td");

        const arr: HTMLTableCellElement[] = [fname, lname, course, grade, passing];
        const data: [string, string, string, string, string] = student.get_data();
        const row: HTMLTableRowElement = document.createElement("tr");
        
        arr.forEach(item => item.classList.add("data"));
        arr.forEach((item, i) => item.innerHTML = data[i]);
        arr.forEach((item, i) => item.setAttribute("data-value", data[i]));
        
        grade.setAttribute("data-value", student.grade_int.toString());
        if (student.is_passing) passing.innerHTML = "&#9989;";
        else
        {
            passing.innerHTML = "&#10071;";
            grade.style.backgroundColor = "#F08080";
        }

        arr.forEach(item => row.appendChild(item));

        data_rows.push(row);
    }

    data_rows.forEach(item => item.addEventListener("dblclick", evt => {
        data_rows = data_rows.filter(row => row !== item);
        renderTable();
    }));
}