import { fetchPhotos } from './photos'

class Task {
	constructor (options = {}) {
		this.options = options;
		this.isBusy = false;
		this.errors = [];
		this.status = 'pending'; // resolved, rejected

		this.resolve = null;
		this.reject = null;

		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	start () {
		this.isBusy = true;
		//console.warn('START', this.options);

		fetchPhotos(this.options)
		.then(response => {
			//console.warn(response);
			this.status = 'resolved';
			this.resolve(response);
		})
		.catch(error => {
			//console.warn('ERROR', error);
			this.status = 'rejected';
			this.errors.push(error);
		})
		.then(() => {
			this.isBusy = false;
		});
	}
}

export default Task;