import { useState, useRef, useEffect, useContext }  from 'react'
import { SettingContext } from '../contexts/SettingProvider'
import actions from '../utils/actions'
import { Toast } from '../components/Toast'
import {
    ACTION_LIST,
    ACTION_NEW,
    ACTION_DELETE
} from '../config/consts'

function FormSetting() {
    const {setting, setSetting} = useContext(SettingContext)
    const [appHide, setAppHide] = useState(setting.app.hide)
    const [toolHide, setToolHide] = useState(setting.tool.hide)

    const divApps   = useRef()
    const divTools  = useRef()
    const display   = (divName) => {
        if(divName === "tools") {
            divApps.current.className = "fade d-none"
            divTools.current.className = "show"
        } else {
            divTools.current.className = "fade d-none"
            divApps.current.className = "show"
        }
    }

    const labelsApp = {
        code: 'Code',
        githubLink: 'Github Link',
        docLink: 'Doc. Link',
        comments: 'Comments'
    }

    const [fieldsApp, setFieldsApp] = useState([
        {name: 'code', label: labelsApp.code, hide: false},
        {name: 'githubLink', label: labelsApp.githubLink, hide: false},
        {name: 'docLink', label: labelsApp.docLink, hide: false},
        {name: 'comments', label: labelsApp.comments, hide: false}
    ])

    const labelsTool = {
        webOficial: 'Web Oficial',
        accessUrl: 'Access URL',
        docLink: 'Doc. Link',
        refUser: 'Ref. User',
        refPass: 'Ref. Password',
        comments: 'Comments'
    }
    
    const [fieldsTool, setFieldsTool] = useState([
        {name: 'webOficial', label: labelsTool.webOficial, hide: false},
        {name: 'accessUrl', label: labelsTool.accessUrl, hide: false},
        {name: 'docLink', label: labelsTool.docLink, hide: false},
        {name: 'refUser', label: labelsTool.refUser, hide: false},
        {name: 'refPass', label: labelsTool.refPass, hide: false},
        {name: 'comments', label: labelsTool.comments, hide: false}
    ])

    const updateFields = (section, currentIndex) => {
        const fields = section === 'app' ? fieldsApp : fieldsTool
        const newFields = fields.map( (field, fieldIndex) => {
            field.hide = currentIndex === fieldIndex ? !field.hide : field.hide
            return field
        } )
        if(section === 'app') setFieldsApp(newFields)
        if(section === 'tool') setFieldsTool(newFields)
    }

    useEffect(() => { 
        async function fetchData() {
            const dataApp   = [];
            const dataTool  = [];
            await actions.setting(ACTION_LIST, { table: 'apps' }, function(res) {
                res.map(d => dataApp.push({name: d.field, label: labelsApp[d.field], hide: d.hide}))
                if(dataApp.length > 0) setFieldsApp(dataApp)
            })
            await actions.setting(ACTION_LIST, { table: 'tools' }, function(res) {
                res.map(d => dataTool.push({name: d.field, label: labelsTool[d.field], hide: d.hide}))
                if(dataTool.length > 0) setFieldsTool(dataTool)
            })
        }
        fetchData()
    }, [])

    const saveData = (section) => {
        const tableName = section + 's'
        actions.setting(ACTION_DELETE, {table: tableName}, (msg , deleted) => {
        })

        const fields = section === 'app' ? fieldsApp : fieldsTool
        fields.map(field => {
            const sendData = {table: tableName, field: field.name, hide: field.hide};
            actions.setting(ACTION_NEW, sendData, (msg, newId) => {
                Toast(msg)
            })
        })

        actions.setting(ACTION_DELETE, {table: ''}, (msg , deleted) => {})

        actions.setting(ACTION_NEW, {table: '', field: 'section_app', hide: appHide}, (msg, newId) => {
            setSetting({...setting, app: { hide: appHide}})
        })
        
        actions.setting(ACTION_NEW, {table: '', field: 'section_tool', hide: toolHide}, (msg, newId) => {
            setSetting({...setting, tool: { hide: toolHide}})
        })
    }

    return (
		<div className="p-0 border-0 mt-0">
  			<div className="bg-dark text-secondary py-0 border-0 p-1rem">
                <div className="row">
					<div className="col-12">
                        Setting
                    </div>
                </div>
            </div>
            <div className="bg-dark text-white p-1rem form-app">
                <div className="row">
                    <div className="co-12">
                        <p>
                            <a onClick={() => display('apps') }  className="btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0">
                                Apps
                            </a>
                            <button onClick={() => display('tools') } className="btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0 shadow-sm mx-2" type="button">
                                Tools
                            </button>
                        </p>
                        <div className="d-none" ref={divApps}>
                            <div className="card card-body text-secondary bg-dark border-primary">
                                <div className="form-check form-switch">
                                    <input className="form-check-input border-primary" type="checkbox" role="switch" id="hideApps" onChange={() => setAppHide(!appHide)} checked={(appHide ? 'checked' : '')} />
                                    <label className="form-check-label text-secondary d-block" htmlFor="hideApps">Hide Section Apps</label>
                                </div>
                                <hr className="my-1 border-primary" />
                                <div className="my-1">Hide fields</div>
                                {
                                    fieldsApp.map((field, index) => {
                                        return (
                                            <div key={field.name} className="form-check form-switch text-secondary">
                                                <input 
                                                    className="form-check-input border-primary" 
                                                    type="checkbox" 
                                                    role="switch"
                                                    id={"formSetting_" + field.name}  
                                                    onChange={() => updateFields('app',index)}
                                                    checked={field.hide ? 'checked' : ''}
                                                />
                                                <label className="form-check-label text-secondary d-block" htmlFor={"formSetting_" + field.name}>
                                                    {field.label}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <hr className="my-1 border-primary" />
                                <button 
                                    onClick={ () => saveData('app') }
                                    className="form-control btn btn-sm btn-primary bg-primary bg-opacity-50 border-0 shadow-none mb-2 mt-2 text-dark"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="d-none" ref={divTools}>
                            <div className="card card-body text-secondary  bg-dark border-primary">
                                <div className="form-check form-switch">
                                    <input className="form-check-input border-primary" type="checkbox" role="switch" id="hideTools" onChange={() => setToolHide(!toolHide)} checked={(toolHide ? 'checked' : '')} />
                                    <label className="form-check-label text-secondary d-block" htmlFor="hideTools">Hide Section Tools</label>
                                </div>
                                <hr className="my-1 border-primary" />
                                <div className="my-1">Hide fields</div>
                                {
                                    fieldsTool.map((field, index) => {
                                        return (
                                            <div key={field.name} className="form-check form-switch text-secondary">
                                                <input 
                                                    className="form-check-input border-primary" 
                                                    type="checkbox" 
                                                    role="switch"
                                                    id={field.name}  
                                                    onChange={() => updateFields('tool',index)}
                                                    checked={field.hide ? 'checked' : ''}
                                                />
                                                <label className="form-check-label text-secondary d-block" htmlFor={field.name}>{field.label}</label>
                                            </div>
                                        )
                                    })
                                }
                                <hr className="my-1 border-primary" />
                                <button 
                                    onClick={ () => saveData('tool') }
                                    className="form-control btn btn-sm btn-primary bg-primary bg-opacity-50 border-0 shadow-none mb-2 mt-2 text-dark"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSetting