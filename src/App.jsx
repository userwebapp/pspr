import { Routes, Route } from 'react-router-dom'

import './App.css'

import routes from './config/routes'
import Layout from './components/Layout'
import Home from './pages/Home'
import FormApp from './pages/FormApp'
import FormEnv from './pages/FormEnv'
import FormTool from './pages/FormTool'
import FormSetting from './pages/FormSetting'
import SettingProvider from './contexts/SettingProvider'

function App() {
  return (
    <div className="App">
      <SettingProvider>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.app.PATH} element={<FormApp />} />
            <Route path={routes.env.PATH} element={<FormEnv />} />
            <Route path={routes.tool.PATH} element={<FormTool />} />
			<Route path={routes.tool.PATH_COPY} element={<FormTool isCopy={true} />} />
            <Route path={routes.setting.PATH} element={<FormSetting />} />
          </Route>
        </Routes>
       </SettingProvider>
    </div>
  )
}

export default App