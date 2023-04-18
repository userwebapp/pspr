import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import routes from '../config/routes'
import actions from '../utils/actions'
import ToggleLabels from '../components/ToggleLabels'
import FormControl from '../components/FormControl'
import FormButton from '../components/FormButton'
import { 
	ACTION_EDIT,
	ACTION_NEW,
	ACTION_GET,
	ACTION_LIST,
	FORM_TOOL_TITLE_NEW,
	FORM_TOOL_TITLE_EDIT,
	FORM_BUTTON_TYPE_SAVE,
	FORM_BUTTON_TYPE_DELETE,
	FORM_TOOL_NAME_LABEL,
	FORM_TOOL_NAME_PLACEHOLDER,
	FORM_TOOL_SUBNAME_LABEL,
	FORM_TOOL_SUBNAME_PLACEHOLDER,
	FORM_TOOL_WEB_OFICIAL_LABEL,
	FORM_TOOL_WEB_OFICIAL_PLACEHOLDER,
	FORM_TOOL_ACCESS_URL_LABEL,
	FORM_TOOL_ACCESS_URL_PLACEHOLDER,
	FORM_TOOL_DOC_LINK_LABEL,
	FORM_TOOL_DOC_LINK_PLACEHOLDER,
	FORM_TOOL_REF_USER_LABEL,
	FORM_TOOL_REF_USER_PLACEHOLDER,
	FORM_TOOL_REF_PASS_LABEL,
	FORM_TOOL_REF_PASS_PLACEHOLDER,
	FORM_TOOL_COMMENTS_LABEL,
	FORM_TOOL_COMMENTS_PLACEHOLDER,
	LIST_ADD_TOOL,
	FORM_ENV_EMPTY_ENVS,
	OBJ_TOOL
} from '../config/consts'

function FormTool({isCopy = false}) {
	const { selectedId }                = useParams();

	const [titleForm, setTitleForm]     = useState('')
	const [actionForm, setActionForm]   = useState('')

	const [id, setId] 	                = useState('')
	const [name, setName]               = useState('')
    const [subName, setSubName]   		= useState('')
    const [webOficial, setWebOficial]   = useState('')
    const [accessUrl, setAccessUrl]     = useState('')
    const [docLink, setDocLink]         = useState('')
    const [refUser, setRefUser]         = useState('')
    const [refPass, setRefPass]         = useState('')
	const [comments, setComments]       = useState('')

	const [toolsList, setToolsList]		= useState([])

	const inputName 		= {type: 'text', 		label: FORM_TOOL_NAME_LABEL, 		placeholder: FORM_TOOL_NAME_PLACEHOLDER, 	    value: name, 		onChange: (e) => setName(e.target.value) }
	const inputSubName 		= {type: 'text', 		label: FORM_TOOL_SUBNAME_LABEL, 	placeholder: FORM_TOOL_SUBNAME_PLACEHOLDER, 	value: subName, 	onChange: (e) => setSubName(e.target.value), 	ref: useRef() }
	const inputWebOficial	= {type: 'textopen', 	label: FORM_TOOL_WEB_OFICIAL_LABEL, placeholder: FORM_TOOL_WEB_OFICIAL_PLACEHOLDER, value: webOficial, 	onChange: (e) => setWebOficial(e.target.value), ref: useRef() }
	const inputAccessURL 	= {type: 'textopen', 	label: FORM_TOOL_ACCESS_URL_LABEL, 	placeholder: FORM_TOOL_ACCESS_URL_PLACEHOLDER, 	value: accessUrl, 	onChange: (e) => setAccessUrl(e.target.value), 	ref: useRef() }
	const inputDocLink 		= {type: 'textopen', 	label: FORM_TOOL_DOC_LINK_LABEL, 	placeholder: FORM_TOOL_DOC_LINK_PLACEHOLDER, 	value: docLink, 	onChange: (e) => setDocLink(e.target.value), 	ref: useRef() }
	const inputRefUser 		= {type: 'text', 		label: FORM_TOOL_REF_USER_LABEL, 	placeholder: FORM_TOOL_REF_USER_PLACEHOLDER, 	value: refUser, 	onChange: (e) => setRefUser(e.target.value), 	ref: useRef() }
	const inputRefPass 		= {type: 'text', 		label: FORM_TOOL_REF_PASS_LABEL, 	placeholder: FORM_TOOL_REF_PASS_PLACEHOLDER, 	value: refPass, 	onChange: (e) => setRefPass(e.target.value), 	ref: useRef() }
	const inputComments 	= {type: 'text', 		label: FORM_TOOL_COMMENTS_LABEL, 	placeholder: FORM_TOOL_COMMENTS_PLACEHOLDER, 	value: comments, 	onChange: (e) => setComments(e.target.value), 	ref: useRef() }

	const inputs = {
		name: inputName,
		subName: inputSubName,
		webOficial: inputWebOficial, 
		accessUrl: inputAccessURL,
		docLink: inputDocLink,
		refUser: inputRefUser, 
		refPass: inputRefPass,
		comments: inputComments
	}

	useEffect(() => {
		if(selectedId === undefined) {
			setToolsList([])
			setTitleForm(FORM_TOOL_TITLE_NEW)
		}
		else {
			actions.tool(ACTION_LIST, {id: name}, function(res) {
				setToolsList(res)
				if(res.length === 0) {
					setTitleForm(FORM_TOOL_TITLE_NEW)
				}
				else {
					setTitleForm(FORM_TOOL_TITLE_EDIT + res[0].id)
				}
				
			})
		}
	}, [name])

	useEffect(() => {
		if(selectedId === undefined) {}
		else {
			actions.tool(ACTION_LIST, {id: name}, function(res) {
				setToolsList(res)
			})
		}
	}, [subName, isCopy])

	useEffect(() => {
		actions.setting(ACTION_LIST, {table: 'tools'}, (settingRes) => {
			settingRes.map(setting => {
				inputs[setting.field].ref.current.style.display = setting.hide ? "none" : ""
			})
		})

		if(selectedId === undefined) {
			setTitleForm(FORM_TOOL_TITLE_NEW)
			setActionForm(ACTION_NEW)
		} else {
			actions.tool(ACTION_GET, {id: selectedId}, function(res) {
				setId(selectedId)
				setName(res?.name || '')
				setTitleForm(FORM_TOOL_TITLE_EDIT + selectedId)
				if(!isCopy) {
					setActionForm(ACTION_EDIT)
					setSubName(res?.subName || '')
					setWebOficial(res?.webOficial || '')
					setAccessUrl(res?.accessUrl || '')
					setDocLink(res?.docLink || '')
					setRefUser(res?.refUser || '')
					setRefPass(res?.refPass || '')
					setComments(res?.comments || '')
				} else {
					setActionForm(ACTION_NEW)
				}
				actions.tool(ACTION_LIST, {id: res?.name}, function(res2) {
					setToolsList(res2)
				})
			})
		}

		return () => {
			setName('')
            setSubName('')
            setWebOficial('')
            setAccessUrl('')
            setDocLink('')
			setRefUser('')
            setRefPass('')
			setComments('')
		}
    }, [selectedId, isCopy])

	const dataSave 		= {id, name, subName, webOficial, accessUrl, docLink, refUser, refPass, comments}
	const dataDelete 	= {id, name}
	const classNameButtons 	= 'btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0 shadow-sm'

    return (
		<div className="p-0 border-0 mt-0">
  			<div className="bg-dark text-secondary py-0 border-0 p-1rem">
				<div className="row">
					<div className="col-6">
					{ 
							toolsList.length === 0 ? (
								<div>
									{ titleForm }
								</div>
							)
							: (								
								<div className="dropdown dropend">
									<button className={ classNameButtons + " dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										{titleForm} |
									</button>
									<ul className="dropdown-menu bg-dark border-0 p-0">
										{
											toolsList.map((tool) => {
												let d = isCopy ? isCopy : (parseInt(selectedId) !== tool.id)
												return d && (
														<li key={tool.id} className={"mb-1"}>
															<Link to={routes.tool.edit(tool.id)}  className={"dropdown-item " + classNameButtons}>
																{OBJ_TOOL}: {tool.subName || FORM_ENV_EMPTY_ENVS}
															</Link>
														</li>
													)
											})
										}
										<li>
											<Link 
												className={"dropdown-item " + classNameButtons + ((isCopy) ? ' disabled bg-secondary' : '')}
												to={ routes.tool.copy(selectedId) } >
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
													<path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
													<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
												</svg>&nbsp;{ LIST_ADD_TOOL }
											</Link>
										</li>
									</ul>
								</div>
							)
						}
					</div>
					<div className="col-6 text-end"><ToggleLabels formName="form-env" /></div>
				</div>
  			</div>
  			<div className="bg-dark text-white p-1rem form-env">
			  	<FormControl actionForm={actionForm} setting={inputName} />
			  	<FormControl actionForm={actionForm} setting={inputSubName} />
				<FormControl actionForm={actionForm} setting={inputWebOficial} />
			  	<FormControl actionForm={actionForm} setting={inputAccessURL} />
				<FormControl actionForm={actionForm} setting={inputDocLink} />
			  	<FormControl actionForm={actionForm} setting={inputRefUser} />
				<FormControl actionForm={actionForm} setting={inputRefPass} />
			  	<FormControl actionForm={actionForm} setting={inputComments} />
				<FormButton form='tool' type={FORM_BUTTON_TYPE_SAVE} 	redirect={routes.tool.edit} data={dataSave} actionForm={actionForm}  />
				<FormButton form='tool' type={FORM_BUTTON_TYPE_DELETE}	redirect={routes.home}		data={dataDelete} visible={actionForm === ACTION_EDIT} />
  			</div>
		</div>
    )
}

export default FormTool