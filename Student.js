export class Student {
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
