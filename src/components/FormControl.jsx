import { BUTTON_TEXT_OPEN } from '../config/consts'

function FormControl({actionForm, setting}) {
    const i             = setting
    const inputType     = 'text'
    const inputValue    = i.value
    const classInput    = 'form-control form-control-sm border-primary shadow-none bg-dark text-primary'
	const classLabel    = 'form-label mb-0'
	const classbOpen    = 'btn btn-outline-primary'

    return (
        <div className="mb-2" ref={i?.ref} >
            <label className={classLabel}>{i.label}</label>
            { i.type === 'text'		&&  <input type={inputType} className={classInput} placeholder={i.placeholder} value={inputValue} onChange={ (e) => i.onChange(e)} /> }
            { i.type === 'textopen' && 
                <div className="input-group input-group-sm">
                    <input type="text" className={classInput} placeholder={i.placeholder}
                        value={i.value} onChange={ (e) => i.onChange(e)} />
                        { actionForm === 'edit' && <a href={i.value} className={classbOpen} type="button" target="_blank">{ BUTTON_TEXT_OPEN }</a>}
                </div>
            }
        </div>
    )
}

export default FormControl