export default class TaskFactory {

    make(id, description, progress) {
        return {
            id: id,
            description: description,
            progress: {
                progress: progress,
                isDone: 100 === progress
            }
        };
    }

}
