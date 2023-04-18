import ListAppItem from './ListAppItem'
import { HOME_APPS } from '../config/consts'

function ListApp ({count}) {
	const classNameAccordion = 'accordion accordion-flush'

    return (
        <div className="container-fluid mb-4">
			<div className="row mb-2">
				<div className="col-6">
					<h5 className="text-start d-inline text-secondary">{ HOME_APPS } <sup>({count})</sup></h5>
				</div>
				<div className="col-6 text-end"></div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className={classNameAccordion} id="accordionFlushApps">
						<ListAppItem />
					</div>
				</div>
			</div>
        </div>
    )
}

export default ListApp