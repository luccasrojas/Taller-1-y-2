import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnCreditosFilter: HTMLElement = document.getElementById("button-filterCreditos")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const minFilter: HTMLInputElement = <HTMLInputElement> document.getElementById("minFilter")!;
const maxFilter: HTMLInputElement = <HTMLInputElement> document.getElementById("maxFilter")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnCreditosFilter.onclick = () => applyFilterCreditos();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

function renderStudentInTable(student: Student): void {
  console.log('Desplegando estudiante');
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Código</td>
                          <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cédula</td>
                          <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                          <td>${student.edad}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Dirección</td>
                          <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Teléfono</td>
                          <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function applyFilterCreditos() { 
  let min = parseInt(minFilter.value);
  let max = parseInt(maxFilter.value);
  let cursosFiltrados:Course[]=[];
  clearCoursesInTable();
  dataCourses.forEach(course => {
    if(course.credits <= max && course.credits>=min )
    {
      cursosFiltrados.push(course);
    }
  })
  renderCoursesInTable(cursosFiltrados);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}