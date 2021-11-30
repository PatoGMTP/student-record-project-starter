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
    is_passing: boolean;
    grade_int: number;

    constructor (public first_name: string, public last_name: string, public course: string, public grade: number | string)
    {
        this.check_passing();
    }

    check_passing(this: Student): void
    {
        if (typeof this.grade === "string")
        {
            this.grade_int = Student.letter_to_number.get(this.grade.toUpperCase())
        }
        else this.grade_int = this.grade;

        this.is_passing = this.grade_int >= Student.minimum_grade;
    }

    update_grade(this: Student, grade: number): void
    {
        this.grade = grade;
        this.check_passing();
    }
}