import { createContext, useState, useMemo, useEffect } from "react"
import actions from '../utils/actions'
import { ACTION_LIST } from '../config/consts'

export const SettingContext = createContext();

export const SETTING_DEFAULT = {    
    app: {
        hide: false
    },
    tool: {
        hide: false
    }
}

const SettingProvider = ({children}) => {
    const [setting, setSetting] = useState(SETTING_DEFAULT)
    const value = useMemo(() => ({ setting, setSetting }), [setting] )

    useEffect(() => {
        async function fetchData() {
            const data  = [];
            await actions.setting(ACTION_LIST, { table: '' }, function(res) {
                setSetting({
                    app: {
                        hide: res[0].hide
                    },
                    tool: {
                        hide: res[1].hide
                    }
                })
            })
        }
       fetchData()
    }, [])

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};

export default SettingProvider;