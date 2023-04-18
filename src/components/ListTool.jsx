import { Link } from 'react-router-dom'
import { useLiveQuery }	from "dexie-react-hooks"
import routes from '../config/routes'
import { db } from '../utils/db'
import { HOME_TOOLS } from '../config/consts'

function ListTool ({count}) {
	const tools = useLiveQuery(() => db.tools.orderBy("[name+subName]").toArray())

	const formatData = (t) => {
		const result = []
		t?.map(tool => {
			if(result[tool.name] === undefined) {
				result[tool.name] = []
			}
			result[tool.name].push(tool)
		})
		return result
	}

	const AccordionItems = () => {
		let items = [] 
		for (const [key, value] of Object.entries(formatData(tools))) {
			items.push(<AccordionItem key={key} title={key} items={value} />)
		}
		return items
	}

	const Accordion = ({children}) => {
		console.log('-------------- accordion ------------')
		const id = "accordionFlushTools"
		return (
			<div className="accordion accordion-flush" id={id} >
				{children}
			</div>
		)
	}
	
	const AccordionItem = ({title, items}) => {
		const parent = "accordionFlushTools"
		const id = "flush-heading" + title
		const target = "flush-collapse" + title

		return (			
			items.length > 1 ?
			<div className="accordion-item bg-dark border-0 border-top border-primary">
				<h2 className="accordion-header" id={id}>
					<button className="accordion-button collapsed shadow text-primary px-1 py-2 bg-primary bg-opacity-10" type="button" 
						data-bs-toggle="collapse" data-bs-target={"#" + target} 
						aria-expanded="false" aria-controls={target}>
							<div className="row w-100 fw-bolder">
								<div className="col-9"><span className="list-title">#</span>{title}</div>
								<div className="col-3 text-end"><span className="list-title">{items.length}</span></div>
							</div>
					</button>
				</h2>
				<div id={target} className="accordion-collapse collapse" 
					aria-labelledby={id} data-bs-parent={"#" + parent}>
					<div className="accordion-body py-1 px-2 bg-primary bg-opacity-10">
						{ 
							items.map( item => {
								return (
									<Link 
										key={item.id}
										className="btn btn-sm btn-link shadow-none"
										to={ routes.tool.edit(parseInt(item.id)) }
									>
									{item.subName}
									</Link>
								)
							}) 
						}
					</div>
				</div>
			</div>
			: <div className="list-group list-group-flush text-start border-top border-primary">
				<Link 
					to={ routes.tool.edit(parseInt(items[0].id)) }
					className="list-group-item list-group-item-action text-primary rounded-0 px-1 py-1 bg-primary bg-opacity-10 fw-bolder">					
					<span className="list-title">#</span>{title}
				</Link>
			</div>
		)
	}

    return (
        <div className="listTool container-fluid">
			<div className="row mb-2">
				<div className="col-6">
					<h5 className="text-start d-inline text-secondary">{ HOME_TOOLS } <sup>({count})</sup></h5>
				</div>
				<div className="col-6 text-end"></div>
			</div>
			<div className="row">
				<div className="col-12">
					<Accordion>
						<AccordionItems />			
					</Accordion>
				</div>
			</div>
        </div>
    )
}

export default ListTool