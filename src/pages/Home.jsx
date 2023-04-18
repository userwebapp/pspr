import { useContext } from 'react'
import { useLiveQuery } from "dexie-react-hooks"
import { SettingContext } from '../contexts/SettingProvider'
import { db } from '../utils/db'
import ListApp from '../components/ListApp'
import ListTool from '../components/ListTool'
import Readme from "../components/Readme"
import { 
	HOME_EMPTY_DATA,
	HOME_DISABLED_ALL_SECTION 
} from "../config/consts"

function Home() {
	const {setting} = useContext(SettingContext)
	const toolsCount = useLiveQuery(() => db.tools.count())
    const appsCount = useLiveQuery(() => db.apps.count())
	const Message = ({otherMessage}) => {
		return <div className="container text-muted">
			<div className="fw-bolder text-center mb-4 mt-3">{ otherMessage || HOME_EMPTY_DATA }</div>
			<Readme />
		</div>
	}
	return (
		<div className="Home">
			{ appsCount === 0 && toolsCount === 0 && <Message /> 												}
			{ appsCount > 0 	&& !setting.app.hide 	&& <ListApp count={appsCount} /> 						}
            { toolsCount > 0 	&& !setting.tool.hide 	&& <ListTool count={toolsCount} /> 						}
			{ setting.app.hide 	&& setting.tool.hide 	&& <Message otherMessage={HOME_DISABLED_ALL_SECTION} /> }
		</div>
	)
}

export default Home