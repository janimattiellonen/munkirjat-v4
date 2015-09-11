import Immutable from "immutable";
import _ from "lodash";

export default class GameManager {

	loadGame() {

	}

	setCourse(course) {
		this.course = course;
	}

	setPlayers(players) {

		let playerMap = Immutable.Map();

		let hash = {};

		players.forEach(function(player) {
			playerMap = playerMap.set(parseInt(player.value), player);
		});

		this.players = playerMap;
	}

	setCurrentHoleNumber(holeNumber) {
		this.currentHoleNumber = holeNumber;
	}

	setScoreFor(score, holeNumber, playerId) {
		let player = this.players.get(parseInt(playerId));

		player.scores = player.scores.set(parseInt(holeNumber), score);

		this.players = this.players.set(playerId, player);
	}

	getScoreFor(playerId, holeNumber) {
		let score = this.players.get(parseInt(playerId)).scores.get(parseInt(holeNumber));

		return score ? score : Immutable.List(this.course.layout.holes).get(holeNumber - 1).par;
	}

	getTotalScoreFor(playerId) {
		let player = this.players.get(parseInt(playerId));
		let totalScore = _.sum(player.scores.toArray(), function(score) {
			return score;
		});

		return totalScore;
	}

	getTotalParFor(playerId) {
		let player = this.players.get(parseInt(playerId));
		let totalScore = this.getTotalScoreFor(playerId);

		let totalPar = _.sum(this.course.layout.holes, function(hole) {
			let playerScore = player.scores.get(hole.number);

			return playerScore != undefined ? parseInt(hole.par) : 0;
		});

		return totalScore - totalPar;
	}
}