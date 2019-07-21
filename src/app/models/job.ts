export class Job {
    id: string;
    userId: string;
    description: string;
    createdAt: Date;
    completed: Boolean;
    removed: Boolean;

    constructor(userId: string, description: string, completed = false, createdAt = new Date(), removed = false) {
        this.userId = userId;
        this.description = description;
        this.createdAt = createdAt;
        this.completed = completed;
        this.removed = removed;
    }
}
