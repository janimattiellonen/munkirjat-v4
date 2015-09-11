export default class GameUtils {
	static score(par) {
		return parseInt(par) > 0 ? "+" + par : par;
	}
}