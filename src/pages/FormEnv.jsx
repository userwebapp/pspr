import { useEffect, useState } from 'react'
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
	FORM_ENV_TITLE_NEW,
	FORM_ENV_TITLE_EDIT,
	FORM_BUTTON_TYPE_SAVE,
	FORM_BUTTON_TYPE_DELETE,
	FORM_ENV_NAME_LABEL,
	FORM_ENV_NAME_PLACEHOLDER,
	FORM_ENV_URL_LABEL,
	FORM_ENV_URL_PLACEHOLDER,
	FORM_ENV_IP_LABEL,
	FORM_ENV_IP_PLACEHOLDER,
	FORM_ENV_REF_USER_LABEL,
	FORM_ENV_REF_USER_PLACEHOLDER,
	FORM_ENV_REF_PASS_LABEL,
	FORM_ENV_REF_PASS_PLACEHOLDER,
	FORM_ENV_COMMENTS_LABEL,
	FORM_ENV_COMMENTS_PLACEHOLDER,
	LIST_APP_EDIT,
	FORM_ENV_EMPTY_ENVS,
	LIST_APP_ADD_ENV
} from '../config/consts'

function FormEnv() {
	const { selectedId, appId }         = useParams();

	const [titleForm, setTitleForm]     = useState('')
	const [actionForm, setActionForm]   = useState('')
	const [appComment, setAppComment]	= useState('')
	const [appDisplay, setappDisplay]	= useState('')
	const [id, setId] 	                = useState('')
    const [idApp, setIdApp]             = useState(parseInt(appId))
	const [name, setName]               = useState('')
    const [url, setUrl]                 = useState('')
    const [ip, setIp]                   = useState('')
    const [refUser, setRefUser]         = useState('')
    const [refPass, setRefPass]         = useState('')
	const [comments, setComments]       = useState('')
	const [envsList, setEnvsList]		= useState([])

	const inputs = [
		{key: 'name', type: 'text', 	label: FORM_ENV_NAME_LABEL, 	placeholder: FORM_ENV_NAME_PLACEHOLDER, 	value: name, 	onChange: (e) => setName(e.target.value) },
		{key: 'url_', type: 'textopen', label: FORM_ENV_URL_LABEL, 		placeholder: FORM_ENV_URL_PLACEHOLDER, 		value: url, 	onChange: (e) => setUrl(e.target.value) },
		{key: 'ip__', type: 'text', 	label: FORM_ENV_IP_LABEL, 		placeholder: FORM_ENV_IP_PLACEHOLDER, 		value: ip, 		onChange: (e) => setIp(e.target.value) },
		{key: 'refu', type: 'text', 	label: FORM_ENV_REF_USER_LABEL, placeholder: FORM_ENV_REF_USER_PLACEHOLDER, value: refUser, onChange: (e) => setRefUser(e.target.value) },
		{key: 'refp', type: 'text', 	label: FORM_ENV_REF_PASS_LABEL, placeholder: FORM_ENV_REF_PASS_PLACEHOLDER, value: refPass, onChange: (e) => setRefPass(e.target.value) },
		{key: 'comm', type: 'text', 	label: FORM_ENV_COMMENTS_LABEL, placeholder: FORM_ENV_COMMENTS_PLACEHOLDER, value: comments,onChange: (e) => setComments(e.target.value) },
	]

	useEffect(() => {
		
		actions.env(ACTION_LIST, {id: appId}, function(res) {
			setEnvsList(res)
		})

		if(selectedId === undefined) {
			actions.app(ACTION_GET, {id: appId}, function(res) {
				setTitleForm(FORM_ENV_TITLE_NEW)
				setappDisplay((res.code || res.name))
				setActionForm(ACTION_NEW)
				setAppComment((res.name || '') + ':: ' + res.comments)
			})
		} else {
			actions.env(ACTION_GET, {id: selectedId}, function(res) {
				setId(selectedId)
				setappDisplay((res.app.code || res.app.name))
                setIdApp(parseInt(appId))
				setName(res?.name || '')
				setUrl(res?.url || '')
				setIp(res?.ip || '')
				setRefUser(res?.refUser || '')
				setRefPass(res?.refPass || '')
                setComments(res?.comments || '')
				setTitleForm(LIST_APP_EDIT + " " + FORM_ENV_TITLE_EDIT + selectedId)
				setActionForm(ACTION_EDIT)
				setAppComment((res.app.name || '') + ':: ' + res.app.comments)
			})
		}

		return () => {
			setName('')
			setUrl('')
			setIp('')
			setRefUser('')
            setRefPass('')
			setComments('')
			setAppComment('')
			setappDisplay('')
		}
    }, [selectedId])

	const dataSave = {id, appId: idApp, name, url, ip, refUser, refPass, comments}
	const dataDelete = {id, name}
	const classNameButtons 	= 'btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0 shadow-sm'

    return (
		<div className="p-0 border-0 mt-0">
  			<div className="bg-dark text-secondary py-0 border-0 p-1rem">
			  <div className={"row bg-primary bg-opacity-10 " + (appComment === '' ? 'border-bottom border-primary' : '')}>
					<div className="col-12">
						<Link 
							to={ routes.app.edit(idApp) } 
							className="btn btn-sm border-0 px-0 btn-link text-primary rounded-0 shadow-none" >
							{appDisplay}
						</Link>
					</div>
				</div>
			  	<div className={"row bg-primary bg-opacity-10 border-bottom border-primary pb-2 " + (appComment !== '' ? '' : ' d-none')}>
					<div className="col-12">{appComment}</div>
				</div>
				<div className="row mt-2">
					<div className="col-6">
						{ 
							envsList.length === 0 ? ( 
								titleForm
							)
							: (
								<div class="dropdown dropend">
									<button class={ classNameButtons + " dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										{titleForm} |
									</button>
									<ul class="dropdown-menu bg-dark border-0 p-0">
										{
											envsList.map((env) => {
												return parseInt(selectedId) !== env.id && (
														<li key={env.id} className="mb-1">
															<Link to={routes.env.edit(idApp, env.id)}  className={"dropdown-item " + classNameButtons}>
																{env.name || FORM_ENV_EMPTY_ENVS}
															</Link>
														</li>
													)
											})
										}
										{ (selectedId !== undefined) &&
											(<li>
												<Link 
													className={"dropdown-item " + classNameButtons}
													to={ routes.env.new(appId) } >
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
														<path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
														<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
													</svg>&nbsp;{ LIST_APP_ADD_ENV }
												</Link>
											</li>)
										}
									</ul>
								</div>
							)
						}
					</div>
					<div className="col-6 text-end">
						<ToggleLabels formName="form-env" />
					</div>
				</div>
  			</div>
  			<div className="bg-dark text-white p-1rem form-env">
			  	{ inputs.map( i => <FormControl key={i.key} actionForm={actionForm} setting={i} />) }
				<FormButton form='env' type={FORM_BUTTON_TYPE_SAVE} 	redirect={routes.env.edit} 	data={dataSave} 	actionForm={actionForm}  />
				<FormButton form='env' type={FORM_BUTTON_TYPE_DELETE}	redirect={routes.home}		data={dataDelete} 	visible={actionForm === ACTION_EDIT} />
  			</div>
		</div>
    )
}

export default FormEnv