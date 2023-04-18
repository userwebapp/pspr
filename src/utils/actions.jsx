import { db } from './db'
import { 
	ACTION_NEW,
	ACTION_DELETE,
	ACTION_GET,
	ACTION_LIST,
	ACTION_EDIT,
	ACTION_MSG_NEW,
	ACTION_MSG_DELETE,
	ACTION_MSG_EDIT,
	ACTION_MSG_EDIT_ERR,
	ACTION_FAILED,
	OBJ_APP,
	OBJ_ENV,
	OBJ_TOOL,
	OBJ_SETTING
} from '../config/consts'

function getMessage(objName, action, data, resAction) {
	let message = ""
	if(action === ACTION_NEW)					message = `${objName} ${ACTION_MSG_NEW}` 
	if(action === ACTION_DELETE) 				message = `${objName} ${ACTION_MSG_DELETE}`
	if(action === ACTION_EDIT && resAction) 	message = `${objName} ${ACTION_MSG_EDIT}`
	if(action === ACTION_EDIT && !resAction)	message = `${objName} ${ACTION_MSG_EDIT_ERR}`
	if(data === undefined) 						message = `${objName} action '${action}' not exist.`
	return message
}

async function app(action, data, cb) {
	try {
		const idSelected = parseInt(data?.id);
		const {id, ...newData} = data;
		const updateData = {id: idSelected, ...newData}

		switch(action) {
			case ACTION_NEW:
				const idAdded = await db.apps.add(data) 
				cb(getMessage(OBJ_APP, ACTION_NEW, data), idAdded)
			break;
			case ACTION_EDIT:
				await db.apps.update(idSelected, updateData).then(function (updated) {
					cb(getMessage(OBJ_APP, ACTION_EDIT, updateData, updated))
				});	
			break;
			case ACTION_DELETE: 
				await db.apps.delete(idSelected).then(function (deleted) {
					cb(getMessage(OBJ_APP, ACTION_DELETE, updateData))
				})	
			break;
			case ACTION_GET:
				const obj = await db.apps.get(idSelected)
				cb(obj)
			break;
			default:
				cb(getMessage(OBJ_APP, action))
		}		
	} catch (error) {
		cb(`${ACTION_FAILED} ${action} '${data.name}': ${error}`)
	}
}

async function env(action, data, cb) {
	try {
		const objName = OBJ_ENV;
		const idSelected = parseInt(data?.id);
		const {id, ...newData} = data;
		const updateData = {id: idSelected, ...newData}

		switch(action) {
			case ACTION_NEW:
				const idAdded = await db.envs.add(data) 
				cb(getMessage(objName, ACTION_NEW, data),idAdded)
			break;
			case ACTION_EDIT:
				await db.envs.update(idSelected, updateData).then(function (updated) {
					cb(getMessage(objName, ACTION_EDIT, updateData, updated))
				});	
			break;
			case ACTION_DELETE: 
				await db.envs.delete(idSelected).then(function (deleted) {
					cb(getMessage(objName, ACTION_DELETE, updateData))
				})	
			break;
			case ACTION_GET:
				const obj = await db.envs.get(idSelected);
				await app(ACTION_GET, {id: obj.appId}, function(app) {
					obj.app = app
					cb(obj)
				})
			break;
			case ACTION_LIST:
				const list = await db.envs.where({appId: idSelected}).toArray();
				cb(list)
			break;
			default:
				cb(getMessage(objName, action))
		}		
	} catch (error) {
		cb(`${ACTION_FAILED} ${action} '${data.name}': ${error}`)
	}
}

async function tool(action, data, cb) {
	try {
		const objName = OBJ_TOOL;
		const idSelected = action === ACTION_LIST ? data?.id : parseInt(data?.id);
		const {id, ...newData} = data;
		const updateData = {id: idSelected, ...newData}

		switch(action) {
			case ACTION_NEW:
				const idAdded = await db.tools.add(data) 
				cb(getMessage(objName, ACTION_NEW, data),idAdded)
			break;
			case ACTION_EDIT:
				await db.tools.update(idSelected, updateData).then(function (updated) {
					cb(getMessage(objName, ACTION_EDIT, updateData, updated))
				});	
			break;
			case ACTION_DELETE: 
				await db.tools.delete(idSelected).then(function (deleted) {
					cb(getMessage(objName, ACTION_DELETE, updateData))
				})	
			break;
			case ACTION_GET:
				const obj = await db.tools.get(idSelected);
				cb(obj);
			break;
			case ACTION_LIST:
				const list = await db.tools.where({ name : idSelected}).toArray();
				cb(list)
			break;
			default:
				cb(getMessage(objName, action))
		}		
	} catch (error) {
		cb(`${ACTION_FAILED} ${action} '${data.name}': ${error}`)
	}
}

async function setting(action, data, cb) {
	try {
		const table = db.settings
		const objName = OBJ_SETTING;
		const idSelected = action === ACTION_LIST ? data?.id : parseInt(data?.id);
		const {id, ...newData} = data;
		const updateData = {id: idSelected, ...newData}

		switch(action) {
			case ACTION_NEW:
				const idAdded = await table.add(data) 
				cb(getMessage(objName, ACTION_NEW, data),idAdded)
			break;
			case ACTION_DELETE: 
				await table.where(data).delete().then(function (deleted) {
					cb(getMessage(objName, ACTION_DELETE, data), deleted)
				})	
			break;
			case ACTION_LIST:
				const list = await table.where(data).toArray();
				cb(list)
			break;
			default:
				cb(getMessage(objName, action))
		}		
	} catch (error) {
		cb(`${ACTION_FAILED} ${action} '${data.name}': ${error}`)
	}
}

export default {
	app,
	env,
	tool,
	setting
}