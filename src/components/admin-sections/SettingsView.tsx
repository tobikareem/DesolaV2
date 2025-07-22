
import { SettingsTabs } from './AdminUIComp/SettingsTabs'
import { Text } from '../ui/TextComp'

const SettingsView = () => {
  return (
    <div>
      <Text as='h2' size='2xl' weight='semibold' fontStyle='font-grotesk' className='mb-4'>
        Admin Settings
      </Text>
    <SettingsTabs />
    </div>
  ) 
}

export default SettingsView
