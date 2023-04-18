import { useNavigate } from 'react-router-dom'
import actions from '../utils/actions'
import { Toast } from '../components/Toast'
import { AlertConfirm } from '../components/AlertConfirm'
import { 
    BUTTON_TEXT_SAVE, 
    BUTTON_TEXT_DELETE 
} from '../config/consts'

function FormButton({form, type, redirect, data, actionForm, visible}) {
    const navigate = useNavigate();

    const classNameButtonSave   = 'form-control btn btn-sm btn-primary bg-primary bg-opacity-50 border-0 shadow-none mb-2 mt-2 text-dark'
    const classNameButtonDelete = 'form-control btn btn-sm btn-warning bg-secondary bg-opacity-50 border-0 shadow-none text-dark'

    if(type === 'save') {
        const {id, ...editData} = data
        return (					
            <button className={classNameButtonSave} onClick={() => {
                    form === 'tool' && actions.tool( actionForm,( actionForm === 'edit' ? {...data} : {...editData} ), (msg, newId) => { Toast(msg); if(actionForm === 'new') navigate(redirect(newId)); } )
                    form === 'env'  && actions.env( actionForm, ( actionForm === 'edit' ? {...data} : {...editData} ), (msg, newId) => { Toast(msg); if(actionForm === 'new') navigate(redirect(editData.appId, newId)); } )
                    form === 'app'  && actions.app( actionForm, ( actionForm === 'edit' ? {...data} : {...editData} ), (msg, newId) => { Toast(msg); if(actionForm === 'new') navigate(redirect(newId)); } )
                }} 
            >
                { BUTTON_TEXT_SAVE }
            </button>
        )
    }

    if(type === 'delete') {
        const {id, name} = data
        return ( 
            visible && <button className={classNameButtonDelete} onClick={() => { 
                    form === 'tool' && AlertConfirm(() => { actions.tool('delete', {id, name}, (msg) => { navigate(redirect); })})
                    form === 'env'  && AlertConfirm(() => { actions.env( 'delete', {id, name}, (msg) => { navigate(redirect); })})
                    form === 'app'  && AlertConfirm(() => { actions.app( 'delete', {id, name}, (msg) => { navigate(redirect); })})
                }}
            >
                { BUTTON_TEXT_DELETE }
            </button>
        )
    }
}

export default FormButton