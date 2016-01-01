import Noty from '../components/Noty';

export function handleError(response) {
	if (response.status == 401) {
		Noty.error("You must login first!");
	}
}