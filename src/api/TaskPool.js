import Task from './Task';

class TaskPool {
	constructor () {
		this.options = {};
		this.isBusy = false;
		this.errors = [];
		this.tasks = [];
		this.interval = null;
		this.resolvedCount = 0;
		this.items = [];
		this.isCancelled = false;

		this.resolve = null;
		this.reject = null;

		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	set (options, count) {
		this.options = options;

		for (let i = 0; i < Math.ceil(count / 1000); i++) {
			const task = new Task({ ...options, offset: 1000 * (i + 1), limit: 1000 });
			task.promise.then(response => {
				this.resolvedCount++;
				this.items = [...this.items, ...response.items];
				this.reportProgress(response);

				if (this.resolvedCount === this.tasks.length) {
					clearInterval(this.interval);
					this.resolve(this.items);
				}
			});
			this.tasks.push(task);
		}
	}

	reportProgress (items) {
		if (this.onProgress) this.onProgress(items);
	}

	start () {
		//console.warn('START POOL');
		this.isBusy = true;
		this.process();
		this.interval = setInterval(() => {
			if (this.resolvedCount === this.tasks.length || this.isCancelled) {
				clearInterval(this.interval);
				return;
			}
			this.process();
		}, 1100);
	}

	process () {
		let started = 0;
		this.tasks.forEach(task => {
			if (started >= 5) return;
			if (!task.isBusy && task.status !== 'resolved') {
				//console.warn('Starting task...');
				task.start();
				started++;
			}
		});
	}

	cancel () {
		this.isCancelled = true;
	}
}

export default TaskPool;