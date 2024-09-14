const colorizePriority = (priority) => {
    switch (priority) {
        case 1: return '\x1b[31m'; // Red for high priority
        case 2: return '\x1b[33m'; // Yellow for medium priority
        case 3: return '\x1b[32m'; // Green for low priority
        default: return '\x1b[0m';  // Default color
    }
};

module.exports = { colorizePriority };
