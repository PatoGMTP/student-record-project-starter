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

export class Student implements StudentInt
{
    static passing_grades: string[] = ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-"];

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