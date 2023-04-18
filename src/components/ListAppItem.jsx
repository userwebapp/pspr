import { Link } from 'react-router-dom'
import { useLiveQuery } from "dexie-react-hooks"
import routes from '../config/routes'
import { db } from '../utils/db'
import {
    LIST_APP_EDIT,
    LIST_APP_ADD_ENV
} from '../config/consts'

function ListAppItem() {
    const apps  = useLiveQuery(() => db.apps.orderBy("[code+name]").toArray())
    const envs  = useLiveQuery(() => db.envs.toArray())

    return ( 
        <div>       
            <div className="accordion accordion-flush">
                {
                    apps?.map(app => {
                        return <div key={app.id} className="accordion-item bg-dark border-top border-primary">
                            <h2 className="accordion-header">
                                <button 
                                    className="accordion-button collapsed shadow text-primary px-1 py-2 bg-primary bg-opacity-10" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target={"#flush-collapse_" + app.id}
                                    aria-expanded="false" 
                                    aria-controls={"flush-collapse_" + app.id}>
										<div className="row w-100">
											<div className="col-12 col-sm-4 fw-bolder">
                                                <span className="mx-1 list-title">#{app.id < 10 ? '0' + app.id : app.id}</span> {app.code || app.name}
                                            </div>
											<div className="col-12 col-sm-8 text-start text-sm-end">
                                                <span className="py-1 px-1 bg-transparent text-end fw-semibold list-title">{app.name}</span>
                                            </div>
										</div>
                                </button>
                            </h2>
                            <div 
                                id={"flush-collapse_" + app.id} 
                                className="accordion-collapse collapse" 
                                data-bs-parent="#accordionFlushApps">
                                <div className="accordion-body py-1 px-2 bg-primary bg-opacity-10">
                                    {
                                        envs?.map(env => {
                                            return app.id === env.appId && (
                                                <div key={app.id + '-' + env.id} className="text-start">
                                                    <Link 
                                                        className="btn btn-sm btn-link shadow-none"
                                                        to={ routes.env.edit(app.id, env.id) }
                                                    >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
                                                        <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
                                                        <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
                                                    </svg>&nbsp;{env.name}
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="d-flex justify-content-end">
                                        <Link 
                                            className="btn btn-sm border-0 btn-link text-primary rounded-0 shadow-none"  
                                            to={ routes.env.new(app.id) }
                                        >
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16">
												<path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
												<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z"/>
											</svg>&nbsp;{ LIST_APP_ADD_ENV }
										</Link>
                                        <Link
                                            to={ routes.app.edit(app.id) }
                                            className="btn btn-sm border-0 btn-link text-primary rounded-0 shadow-none" 
                                        >
                                            { LIST_APP_EDIT } {app.code}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ListAppItem