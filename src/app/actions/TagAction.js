import fetch from 'isomorphic-fetch';
import { FETCH_TAG_URL } from '../data/Urls';

export const ActionConstants = {
    FETCH_TAG: 'FETCH_TAG',
    FETCH_TAG_SUCCESS: 'FETCH_TAG_SUCCESS',
    FETCH_TAG_ERROR: 'FETCH_TAG_ERROR'
};

function fetchTag() {
    return {
        type: ActionConstants.FETCH_TAG
    };
}

function fetchTagSuccess(tags) {
    return {
        type: ActionConstants.FETCH_TAG_SUCCESS,
        tags
    };
}

function fetchTagError() {
    return {
        type: ActionConstants.FETCH_TAG_ERROR
    };
}

export function fetchTagIfNeed() {
    return (dispatch) => {
        dispatch(fetchTag());
        return fetch(FETCH_TAG_URL)
            .then(response => response.json())
            .then(json => dispatch(fetchTagSuccess(json)))
            .catch(dispatch(fetchTagError()));
    };
}
