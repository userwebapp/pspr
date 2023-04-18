import { useContext } from 'react'
import { Link } from 'react-router-dom'
import routes from '../config/routes'
import { SettingContext } from '../contexts/SettingProvider'
import { 
	APP_NAME,
	NAV_BUTTON_APP,
	NAV_BUTTON_TOOL,
	NAV_BUTTON_NEW
} from '../config/consts'

function Nav() {
    const {setting, } = useContext(SettingContext)
	const Logo = () => {
		return (
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width="42" 
				height="42" 
				fill="currentColor" 
				className="bi bi-regex" 
				viewBox="0 0 16 16">
  				<path fillRule="evenodd" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 1 1 .707.707Zm9.9-.707a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.314.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707ZM6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5 7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617V4.5Z"/>
			</svg>
		)
	}

	const classNameButtons = 'btn btn-sm pb-2 btn-primary bg-primary bg-opacity-10 text-primary border-0 shadow-sm'
	const classNameHome = 'navbar-brand text-secondary bg-secondary bg-opacity-10 px-3'

  	return (
		<div className="bg-dark">
			<nav className="navbar bg-dark fixed-top shadow">
				<div className="container-fluid">
					<Link to={routes.home} className={classNameHome}><Logo /><span> { APP_NAME }</span></Link>
					<div className="d-flex">
						{
							setting.app.hide && !setting.tool.hide &&
								<Link to={routes.tool.new}  className={classNameButtons}>{ NAV_BUTTON_TOOL }</Link>
						}
						{
							setting.tool.hide && !setting.app.hide && 
								<Link to={routes.app.new}  className={classNameButtons}>{ NAV_BUTTON_APP }</Link>
						}
						{
							!setting.app.hide && !setting.tool.hide && 
								<div className="dropdown dropstart">
									<button className={ classNameButtons + " dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										{ NAV_BUTTON_NEW }
									</button>
									<ul className="dropdown-menu bg-dark border-0 p-0">
										<li className="mb-1"><Link to={routes.app.new}  className={"dropdown-item " + classNameButtons}>{ NAV_BUTTON_APP }</Link></li>
										<li className="mb-0"><Link to={routes.tool.new}  className={"dropdown-item " + classNameButtons}>{ NAV_BUTTON_TOOL }</Link></li>
									</ul>
								</div>
						}
					</div>
				</div>
			</nav>
		</div>
  	)
}

export default Nav