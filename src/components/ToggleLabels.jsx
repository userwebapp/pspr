function ToogleLabels({formName}) {
	const textDefault = 'Show labels'
	const classButton = 'btn btn-sm btn-link shadow-none text-end border-0 py-0 px-1 bg-dark' 
	return (
		<button 
			className={classButton}
			onClick={(obj) => {
				const labels = document.querySelectorAll(`.${formName} label`)
				const d = [...labels].map(label => {
					if(label.className.indexOf("d-block") === -1) {
						label.classList.add("d-block")
						obj.target.innerHTML = "Hide labels"
					} else {
						label.classList.remove("d-block")
						obj.target.innerHTML = textDefault
					}									
				})	
			}}
		>{textDefault}</button>
	)
}

export default ToogleLabels