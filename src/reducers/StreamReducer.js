const initialeState = {
    stream: null,
    published: false,
    title: '',
    description: '',
    miniature: null,
    startStream: true,
    endStream: true,
    messages:''
}

export default function (state = initialeState, action) {
    switch (action.type) {
        case "SET_STREAM":
            return {
                ...state,
                stream: action.payload,
            };
        case "SET_START":
            return {
                ...state,
                startStream: action.payload,
            };
        case "SET_END":
            return {
                ...state,
                endStream: action.payload
            };
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload,
                published: !state.published
            };
        case "SET_DESCRIPTION":
            return {
                ...state,
                description: action.payload
            };
        case "SET_MINIATURE":
            return {
                ...state,
                miniature: action.payload
            };
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.payload
            };
        default:
            return state;
    }
};