import api from '../api';
import store from 'store';

export function setCourses(courses, d) {
	return {
		type: 'SET_COURSES',
		courses: courses,
		d: d
	};
}

export function getCourses(d) {
	return function(dispatch, getState) {
		api.getCourses("").then(courses => {
			dispatch(setCourses(courses, d));
		});
	};
}

export function loadCourse(layoutId) {
	return function(dispatch, getState) {
		api.getCourse(layoutId).then(course => {
			dispatch(selectedCourse(course.size == 1 ? course.get(0) : null));
		});
	};
}

export function setSelectedCourseId(id) {
	return function(dispatch, getState) {
		const { courses} = getState().course;
		let found = courses.filter(course => course.value === id);
		dispatch(selectedCourse(found.size == 1 ? found.get(0) : null));
	}
}

export function selectedCourse(selectedCourse) {
	store.set('SELECTED_COURSE', selectedCourse);

	return {
		type: 'SELECTED_COURSE',
		selectedCourse: selectedCourse
	};
}