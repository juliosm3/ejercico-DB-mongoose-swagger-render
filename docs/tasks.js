module.exports = {
    paths: {
        "/create": {
            post: {
                summary: "Create a new task",
                responses: {
                    "201": { description: "Task created successfully" }
                }
            }
        },
        "/": {
            get: {
                summary: "Get all tasks",
                responses: {
                    "200": { description: "List of tasks" }
                }
            }
        }
    }
};
