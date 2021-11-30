/* Create a function to add student data to an array as an array of 
objects and render objects to the page

Be sure your function parameters are given strict types

*/

/* Define your data structure using a custom Type.
https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript

Student
    First name (string)
    Last name (string)
    Course  (string)
    Grade (number or string)
    isPassing (boolean value if grade is greater than a D)

    If student is passing, render a green symbol/icon next to their entry in the table
    If student is not passing, render a red symbol/icon next to their entry in the table

    It is up to you to calculate based on grade (numerical or letter) if student is passing or not


    Data should be rendered in the form of a table, i.e.,

    |First Name|Last Name|Course|Grade (as Letter)|Passing?|
    | Leon     |Kennedy  |RE-101|  B              |   :)   |


    Add a button that sorts the data based on Grade (ascending order)
    Add a button that sorts teh data based on Course (ascending order)
*/


type StudentData = 
{
    first_name: string,
    last_name: string,
    course: string,
    grade: number | string,
}

const initial_data: StudentData[] = [];

const names: [string, string][] = [["John", "Arbuckle"], ["Sally", "Holmes"], ["Carl", "Wheezer"], ["Kim", "Possible"]];
const grades: [number[], string[]] = [[100, 95, 90, 88, 84, 80, 78, 74, 70, 68, 64, 60, 50], ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"]];
const courses: string[] = ["ENG 101", "MTH 101", "CHM 101", "ART 101"];

for (let i = 0; i < 10; i++)
{
    let name = names[Math.floor(Math.random()*names.length)];
    let oneOrZero = (Math.random()>=0.5)? 1 : 0;
    let grade = grades[oneOrZero][Math.floor(Math.random()*grades[oneOrZero].length)];
    let course = courses[Math.floor(Math.random()*courses.length)];

    initial_data.push(
        {
            first_name: name[0],
            last_name: name[1],
            course: course,
            grade: grade,
        }
    )
}

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

    static letter_to_number: Map<string, number> = new Map();

    static
    {
        this.letter_to_number.set("A+", 100);
        this.letter_to_number.set("A", 95);
        this.letter_to_number.set("A-", 90);
        this.letter_to_number.set("B+", 88);
        this.letter_to_number.set("B", 84);
        this.letter_to_number.set("B-", 80);
        this.letter_to_number.set("C+", 78);
        this.letter_to_number.set("C", 74);
        this.letter_to_number.set("C-", 70);
        this.letter_to_number.set("D+", 68);
        this.letter_to_number.set("D", 64);
        this.letter_to_number.set("D-", 60);
        this.letter_to_number.set("F", 50);
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

    is_passing: boolean;
    grade_int: number;
    grade_letter: string;

    constructor (public first_name: string, public last_name: string, public course: string, public grade: number | string)
    {
        this.check_passing();
    }

    check_passing(this: Student): void
    {
        if (typeof this.grade === "string")
        {
            this.grade_int = Student.letter_to_number.get(this.grade.toUpperCase());
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
}