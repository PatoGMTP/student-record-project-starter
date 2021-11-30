interface StudentInt
{
    first_name: string,
    last_name: string,
    course: string,
    grade: number | string,
    is_passing: boolean,
    check_passing(): void,
    update_grade(grade: number): void
}

class Student implements StudentInt
{
    static passing_grades: string[] = ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"];

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

    static letter_to_number(letter: string): number
    {
        switch(letter)
        {
            case "A+" : return 100;
            case "A" : return 95;
            case "A-" : return 90;
            case "B+" : return 88;
            case "B" : return 84;
            case "B-" : return 80;
            case "C+" : return 78;
            case "C" : return 74;
            case "C-" : return 70;
            case "D+" : return 68;
            case "D" : return 64;
            case "D-" : return 60;
            default: return 50;
        }
    }

    static minimum_grade: number = 70;

    static number_to_letter(grade: number): string
    {
        if (grade >= 96) return "A+";
        if (grade >= 93) return "A";
        if (grade >= 90) return "A-";
        if (grade >= 86) return "B+";
        if (grade >= 83) return "B";
        if (grade >= 80) return "B-";
        if (grade >= 76) return "C+";
        if (grade >= 73) return "C";
        if (grade >= 70) return "C-";
        if (grade >= 66) return "D+";
        if (grade >= 63) return "D";
        if (grade >= 60) return "D-";
        return "F";
    }

    is_passing: boolean = false;
    grade_int: number = -1;
    grade_letter: string = "";

    constructor (public first_name: string, public last_name: string, public course: string, public grade: number | string)
    {
        this.check_passing();
    }

    check_passing(this: Student): void
    {
        if (typeof this.grade === "string")
        {
            this.grade_int = Student.letter_to_number(this.grade.toUpperCase());
            this.grade_letter = this.grade;
        }
        else
        {
            this.grade_int = this.grade;
            this.grade_letter = Student.number_to_letter(this.grade);
        }

        this.is_passing = this.grade_int >= Student.minimum_grade;
    }

    update_grade(this: Student, grade: number): void
    {
        this.grade = grade;
        this.check_passing();
    }

    get_data(this: Student): [string, string, string, string, string]
    {
        return [this.first_name, this.last_name, this.course, this.grade_letter, (+this.is_passing).toString()];
    }
}

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

type StudentData = 
{
    first_name: string,
    last_name: string,
    course: string,
    grade: number | string,
}

function generateData(): StudentData[]
{

    const initial_data: StudentData[] = [];

    const names: [string, string][] = [["John", "Arbuckle"], ["Sally", "Holmes"], ["Carl", "Wheezer"], ["Kim", "Possible"]];
    const grades: [number[], string[]] = [[100, 95, 90, 88, 84, 80, 78, 74, 70, 68, 64, 60, 50], ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"]];
    const courses: string[] = ["ENG 101", "MTH 101", "CHM 101", "ART 101"];

    for (let i = 0; i < names.length; i++)
    {
        // let name = names[Math.floor(Math.random()*names.length)];
        // let course = courses[Math.floor(Math.random()*courses.length)];

        let name = names[i];

        for (let j = 0; j < courses.length; j++)
        {
            let course = courses[j];

            let oneOrZero = (Math.random()>=0.5)? 1 : 0;
            let grade = grades[oneOrZero][Math.floor(Math.random()*grades[oneOrZero].length)];
        
            initial_data.push(
                {
                    first_name: name[0],
                    last_name: name[1],
                    course: course,
                    grade: grade,
                }
            )
        }
    }

    return initial_data;
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
        
        // let v = &#10071;
        
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
}