
export const setStream = (stream) => dispatch => {
    dispatch({
        type: "SET_STREAM",
        payload: stream
    })
};

export const setTitle = (title) => dispatch => {
    dispatch({
        type: "SET_TITLE",
        payload: title
    })
};

export const setDescription = (description) => dispatch => {
    dispatch({
        type: "SET_DESCRIPTION",
        payload: description
    })
};

export const setMiniature = (miniature) => dispatch => {
    dispatch({
        type: "SET_MINIATURE",
        payload: miniature
    })
};
export const setStart = (startStream) => dispatch => {
    dispatch({
        type: "SET_START",
        payload: startStream
    })
};
export const setEnd = (endStream) => dispatch => {
    dispatch({
        type: "SET_END",
        payload: endStream
    })
};
export const setMessages = (messages) => dispatch => {
    dispatch({
        type: "SET_MESSAGES",
        payload: messages
    })
};




