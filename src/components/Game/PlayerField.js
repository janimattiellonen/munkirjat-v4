import React from "react";
import Immutable from "immutable";
import GameUtils from "./GameUtils";

export default React.createClass({

	getInitialState() {
		return {
			'score': this.props.hole.par,
			'totalScore': 0,
			'totalPar': 0
		}
	},

	render() {

		return (
			<div>
				{this.props.player.label}: 

				<input className="score-input" type="submit" value="-" onClick={this.decreaseScore} />
				<input className="score-input" type="text" name="score" value={this.state.score} onChange={this.changeScore} />
				<input className="score-input" type="submit" value="+" onClick={this.increaseScore} />

				<span className="player-total-score">{this.state.totalScore} ({GameUtils.score(this.state.totalPar)})</span>
			</div>
		);
	},

	componentDidMount() {
		const { player, gameActions} = this.props;

		this.setState({
			score: gameActions.getScoreFor(player, this.props.hole.number),
			totalScore: gameActions.getTotalScoreFor(player),
			totalPar: gameActions.getTotalParFor(player)
		});
	},

	componentWillReceiveProps(nextProps) {
		const { player, gameActions} = nextProps;

		this.setState({
			score: gameActions.getScoreFor(player, nextProps.hole.number),
			totalScore: gameActions.getTotalScoreFor(player),
			totalPar: gameActions.getTotalParFor(player)
		});
	},

    changeScore(evt) {
        this.setScore(parseInt(evt.target.value), this.props.hole.number);
    },

	increaseScore() {
		this.setScore(this.state.score + 1, this.props.hole.number);
	},

	decreaseScore() {
		if (this.state.score > 1) {
			this.setScore(this.state.score - 1, this.props.hole.number);
		}
	},

	setScore(score, holeNumber) {
		const { player, gameActions} = this.props;
		
		gameActions.setScoreFor(score, holeNumber, player);

		let totalScore = gameActions.getTotalScoreFor(player);
		let totalPar = gameActions.getTotalParFor(player);

		this.setState({
            score: score,
			totalScore: totalScore,
			totalPar: totalPar
        });
	},	
});