import merge from 'lodash/merge';

import {CLOSE_SIDEBAR, OPEN_SIDEBAR} from '../actions/sidebar_actions'


const SidebarReducer = (oldState = false, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return true;
    case CLOSE_SIDEBAR:
      return false;
    default:
      return oldState
  }
}

export default SidebarReducer;
