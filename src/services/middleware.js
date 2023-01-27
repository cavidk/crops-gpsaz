export const nonSerializableValueMiddleware = (store) => (next) => (action) => {
    if (action.payload) {
        action.payload = serializeNonSerializableValues(action.payload);
    }
    return next(action);
};

function serializeNonSerializableValues(object) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] instanceof Date) {
                object[prop] = object[prop].toISOString();
            } else if (typeof object[prop] === 'object') {
                object[prop] = serializeNonSerializableValues(object[prop]);
            }
        }
    }
    return object;
}


