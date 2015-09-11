import React from "react";
import Immutable from "immutable";
import { Button } from 'react-bootstrap';

import CourseInfoView from "./CourseInfoView";
import PlayerList from "./PlayerList";

import Api from "../../api";

export default class ConfirmSelectionsView extends React.Component {
	constructor(props, context){
    	super(props);
    	console.log("CTOR: " + context.router); // will work
    	this.context = context;
  	}

	render() {
		const {selectedCourse, selectedPlayers} = this.props;

		return (
			<div>
				<h2>Vahvista valinnat</h2>


				<h3>Valittu rata</h3>
				<CourseInfoView course={ selectedCourse }/>

				<Button bsStyle='primary' href="/#/new-game" bsSize='small'>Muokkaa ratavalintaa</Button>
				
				<h3>Valitut pelaajat</h3>

				<PlayerList players={selectedPlayers} />

				<Button bsStyle='primary' href="/#/select-players" bsSize='small'>Muokka pelaajavalintoja</Button>

				<br/><br/>
				<Button bsStyle='primary' onClick={this.navigate.bind(this)} bsSize='small'>Aloita peli!</Button>

			</div>
		);
	}

	navigate() {
		const { gameActions} = this.props;

		gameActions.startGame();
		this.context.router.transitionTo('game');
	}

	componentDidMount() {
		const { courseActions, selectedCourse} = this.props;
		
		courseActions.loadCourse(selectedCourse.value);
	}
}

ConfirmSelectionsView.contextTypes = {
  router: React.PropTypes.object.isRequired
};