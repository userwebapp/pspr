const ROOT 		= import.meta.env.VITE_REACT_APP_ROOT
const HOME      = ROOT
const APP_ROOT  = ROOT + 'app/'
const ENV_ROOT  = '/env/'
const TOOL_ROOT = ROOT + 'tool/'
const STTG_ROOT = ROOT + 'setting/'

const app = {
    new: APP_ROOT,
    edit: (appId) => APP_ROOT + appId,
    PATH: APP_ROOT + ':selectedId?'
}

const env = {
    new: (appId) => APP_ROOT + appId + ENV_ROOT,
    edit: (appId, envId) => APP_ROOT + appId + ENV_ROOT + envId,
    PATH: APP_ROOT + ':appId/env/:selectedId?'
}

const tool = {
    new: TOOL_ROOT,
    edit: (toolId) => TOOL_ROOT + toolId,
    PATH: TOOL_ROOT + ':selectedId?',
    copy: (toolId) => TOOL_ROOT + 'copy/name/' + toolId,
    PATH_COPY: TOOL_ROOT + 'copy/name/:selectedId?',
}

const setting = {
    edit: STTG_ROOT,
    PATH: STTG_ROOT,
}

export default {
    home: HOME,
    app,
    env,
    tool,
    setting
}