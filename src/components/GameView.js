import React from "react";
import Immutable from "immutable";
import Api from "../api";
import CourseInfoView from "./Game/CourseInfoView";
import PlayerList from "./Game/PlayerList";
import Select from "react-select";
import store from 'store';
import { Button } from 'react-bootstrap';

export default React.createClass({

	getInitialState() {
		return {
			players: Immutable.List()
		}
	},

	render() {
		const {courses, d, selectedCourse, courseActions} = this.props;

		let self = this;

		let getOptions = function(input, callback) {	
		    setTimeout(() => {
		    	self.loadCourses(input, callback);
		    }, 500);
		};		

		let renderOption = function(course) {

			return (
				<div>
					<h2><strong>{course.label}</strong></h2>

					<p>
						<strong>Layout:</strong> {course.layout.name}: {course.layout.holeCount}, par {course.layout.par}, {course.layout.length}m
					</p>
				</div>
			);
		};		

		return (
			<div>		
				<h2>Valitse rata</h2>
				<CourseInfoView course={ selectedCourse }/>
				
				<Select
					name="course"
					multi={false}
					searchable={true}
					autoload={false}
					cacheAsyncResults={false}
					asyncOptions={getOptions}
					optionRenderer={renderOption}
					onChange={this.changeValue}
				></Select>
				
				<div>
					<Button bsStyle='primary' href="/#/select-players" bsSize='small' disabled={!this.isSubmittable()}>Seuraava - valitse pelaajat</Button>
				</div>
			</div>
		);
	},

	componentDidMount() {
		const {selectedCourse, courseActions} = this.props;

		if (!selectedCourse.value) {
			let sc = store.get('SELECTED_COURSE');

			if (sc) {
				courseActions.selectedCourse(sc);
			}
		}
	}, 

	shouldComponentUpdate: function(nextProps, nextState) {
  		return nextProps.d !== this.props.d;
	},

	loadPlayers() {
		Api.getPlayers().then(players => {
			this.setState({
				'players': players
			});s
		});
	},

	loadCourses(input, callback) {

		const {d} = this.props;

		Api.getCourses(input).then(courses => {
    		let selections = {options: courses.toArray()};
			callback(null, selections);
			this.props.courseActions.setCourses(courses, d);
		});
	},


	changeValue(newValue) {
		const { courseActions } = this.props;

	    courseActions.setSelectedCourseId(newValue);
	},

	isSubmittable() {
		return this.props.selectedCourse && this.props.selectedCourse.label;
	}    
});