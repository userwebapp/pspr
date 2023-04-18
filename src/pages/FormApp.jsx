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
	FORM_APP_TITLE_NEW,
	FORM_APP_TITLE_EDIT,
	FORM_BUTTON_TYPE_SAVE,
	FORM_BUTTON_TYPE_DELETE,
	FORM_APP_NAME_LABEL,
	FORM_APP_NAME_PLACEHOLDER,
	FORM_APP_CODE_LABEL,
	FORM_APP_CODE_PLACEHOLDER,
	FORM_APP_GITHUB_LABEL,
	FORM_APP_GITHUB_PLACEHOLDER,
	FORM_APP_DOC_LINK_LABEL,
	FORM_APP_DOC_LINK_PLACEHOLDER,
	FORM_APP_COMMENTS_LABEL,
	FORM_APP_COMMENTS_PLACEHOLDER,
	FORM_ENV_EMPTY_ENVS,
	OBJ_ENV,
	LIST_APP_ADD_ENV
} from '../config/consts'

function FormApp() {
	const { selectedId } = useParams();

	const [titleForm, setTitleForm] = useState('')
	const [actionForm, setActionForm] = useState('')

	const [id, setId] = useState('')
	const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [githubLink, setGithubLink] = useState('')
    const [docLink, setDocLink] = useState('')
	const [comments, setComments] = useState('')

	const [envsList, setEnvsList] = useState([])

	const inputName 	= { type: 'text', 		label: FORM_APP_NAME_LABEL, 	placeholder: FORM_APP_NAME_PLACEHOLDER, 	value: name, 		onChange: (e) => setName(e.target.value) }
	const inputCode 	= { type: 'text', 		label: FORM_APP_CODE_LABEL, 	placeholder: FORM_APP_CODE_PLACEHOLDER, 	value: code, 		onChange: (e) => setCode(e.target.value), 		ref: useRef() }
	const inputGithub 	= { type: 'textopen', 	label: FORM_APP_GITHUB_LABEL, 	placeholder: FORM_APP_GITHUB_PLACEHOLDER, 	value: githubLink, 	onChange: (e) => setGithubLink(e.target.value), ref: useRef() }
	const inputDocLink	= { type: 'textopen', 	label: FORM_APP_DOC_LINK_LABEL, placeholder: FORM_APP_DOC_LINK_PLACEHOLDER, value: docLink, 	onChange: (e) => setDocLink(e.target.value), 	ref: useRef() }
	const inputComments = { type: 'text', 		label: FORM_APP_COMMENTS_LABEL, placeholder: FORM_APP_COMMENTS_PLACEHOLDER, value: comments,	onChange: (e) => setComments(e.target.value), 	ref: useRef() }
	const inputs 		= { 
		name: inputName, 
		code: inputCode, 
		githubLink: inputGithub, 
		docLink: inputDocLink, 
		comments: inputComments 
	}

	useEffect(() => {
		actions.setting(ACTION_LIST, {table: 'apps'}, (settingRes) => {
			settingRes.map(setting => {
				inputs[setting.field].ref.current.style.display = setting.hide ? "none" : ""
			})
		})

		if(selectedId === undefined) {
			setTitleForm(FORM_APP_TITLE_NEW)
			setActionForm(ACTION_NEW)
			setEnvsList([])
		} else {
			actions.env(ACTION_LIST, {id: selectedId}, function(res) {
				setEnvsList(res)
			})
			actions.app(ACTION_GET, {id: selectedId}, function(res) {
				setId(selectedId)
				setName(res?.name || '')
				setCode(res?.code || '')
				setGithubLink(res?.githubLink || '')
				setDocLink(res?.docLink || '')
				setComments(res?.comments || '')

				setTitleForm(FORM_APP_TITLE_EDIT + selectedId)
				setActionForm(ACTION_EDIT)
			})
		}

		return () => {
			setName('')
			setCode('')
			setGithubLink('')
			setDocLink('')
			setComments('')
		}
    }, [selectedId])

	const dataSave 			= {id, name, code, githubLink, docLink, comments}
	const dataDelete 		= {id, name}
	const classNameButtons 	= 'btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0 shadow-sm'

    return (
		<div className="p-0 border-0 mt-0">
  			<div className="bg-dark text-secondary py-0 border-0 p-1rem">
				<div className="row">
					<div className="col-6">
						{ 
							envsList.length === 0 ? (
								<div>
									{ !selectedId && titleForm }
									{ 
										selectedId && <div class="dropdown dropend">
											<button class={ classNameButtons + " dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
												{titleForm} |
											</button>
											<ul class="dropdown-menu bg-dark border-0 p-0">
												<li>
													<Link 
														className={"dropdown-item " + classNameButtons}
														to={ routes.env.new(selectedId) } >
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
															<path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
															<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
														</svg>&nbsp;{ LIST_APP_ADD_ENV }
													</Link>
												</li>
											</ul>
										</div>
									}
								</div>
							)
							: (								
								<div class="dropdown dropend">
									<button class={ classNameButtons + " dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										{titleForm} |
									</button>
									<ul class="dropdown-menu bg-dark border-0 p-0">
										{
											envsList.map((env) => {
												return (
														<li key={env.id} className="mb-1">
															<Link to={routes.env.edit(selectedId, env.id)}  className={"dropdown-item " + classNameButtons}>
																{OBJ_ENV}: {env.name || FORM_ENV_EMPTY_ENVS}
															</Link>
														</li>
													)
											})
										}
										<li>
											<Link 
												className={"dropdown-item " + classNameButtons}
												to={ routes.env.new(selectedId) } >
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
													<path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
													<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
												</svg>&nbsp;{ LIST_APP_ADD_ENV }
											</Link>
										</li>
									</ul>
								</div>
							)
						}
					</div>
					<div className="col-6 text-end"><ToggleLabels formName="form-app" /></div>
				</div>
  			</div>
  			<div className="bg-dark text-white p-1rem form-app"> 
				<FormControl actionForm={actionForm} setting={inputName} />
				<FormControl actionForm={actionForm} setting={inputCode} />
				<FormControl actionForm={actionForm} setting={inputGithub} />
				<FormControl actionForm={actionForm} setting={inputDocLink} />
				<FormControl actionForm={actionForm} setting={inputComments} />
				<FormButton form='app' type={FORM_BUTTON_TYPE_SAVE} 	redirect={routes.app.edit} 	data={dataSave} actionForm={actionForm}  />
				<FormButton form='app' type={FORM_BUTTON_TYPE_DELETE}	redirect={routes.home}		data={dataDelete} visible={actionForm === ACTION_EDIT} />
  			</div>
		</div>
    )
}

export default FormApp