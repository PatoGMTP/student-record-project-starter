export const courses = ["ENG 101", "MTH 101", "CHM 101"]; //, "ART 101"];
export const valid_grades = ["A", "B", "C", "A+", "B+", "C+", "A-", "B-", "C-", "D+", "D", "D-", "F"];
export function generateData() {
    const initial_data = [];
    const names = [["John", "Arbuckle"], ["Sally", "Holmes"], ["Carl", "Wheezer"], ["Kim", "Possible"]];
    const grades = [[100, 95, 90, 88, 84, 80, 78, 74, 70, 68, 64, 60, 50], valid_grades];
    // const courses: string[] = ["ENG 101", "MTH 101", "CHM 101", "ART 101"];
    for (let i = 0; i < names.length; i++) {
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
