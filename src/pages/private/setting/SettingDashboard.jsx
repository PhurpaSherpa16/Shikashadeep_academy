import { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import { Bell, BellRing, ChevronDown, Monitor, Settings, Shield, ShieldUser, User, UserRoundPen, UserRoundPlus, Users2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from "@/lib/utils";

export default function SettingDashboard() {
  const userString = localStorage.getItem("user")
  const userData = userString ? JSON.parse(userString) : null
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
    const headerProps = {
        title: 'Settings',
        description: 'Manage your account settings and preferences.',
        icon: <Settings className='text-blue-dark size-4' />,
    }
    const settingsOptions = [
        {
            title: 'Manage Your Profile',
            description: 'Update your personal information and profile settings.',
            link: 'manage_profile',
            icon: <User className='text-blue-dark size-4' />
        },
        // {
        //     title: 'Account Security',
        //     description: 'Change your password and manage security settings.',
        //     link: 'manage_security',
        //     icon: <Shield className='text-blue-dark size-4' />
        // },
        // {
        //     title: 'Notification Preferences',
        //     description: 'Customize your notification settings and preferences.',
        //     link: 'admin/settings/manage_notifications',
        //     icon: <BellRing className='text-blue-dark size-4' />
        // },
        // {
        //     title: 'Add User',
        //     description: 'Add new users to your account.',
        //     icon: <UserRoundPlus className='text-blue-dark size-4' />,
        //     more:[
        //         {
        //             name: 'Admin',
        //             permissions: "Admin can add new users to the account and manage their permissions.",
        //             role: 'admin',
        //             icon: <ShieldUser className='text-blue-dark size-4' />
        //         },
        //         {
        //             name: 'Moderator',
        //             permissions: "Moderator can add new users to the account and manage their permissions.",
        //             role: 'moderator',
        //             icon: <UserRoundPen className='text-blue-dark size-4' />

        //         }
        //       ]
        // }
    ]

    const toggleMore = () => {
        setOpen((prev)=>!prev)
    }

    const handleNavigate = (role) => {
        navigate(`${'/admin/settings/new_user'}/${userData.id}`, {state: {role}})
    }

  return (
    <div className='dashboard_layout animate_in'>
        <DashboardHeader {...headerProps} />

        <div className='bg-gray-50 p-8 rounded-lg space-y-4'>
          {settingsOptions.map((option, index) => (
              <div className='border-b border-gray-200 pb-4 last:border-0'>
                <div to={option.link} key={index} className={'cursor-pointer'} onClick={option.more ? toggleMore : () => navigate(`${option.link}/${userData.id}`)}>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        {option.icon}
                        <h3 className='text-lg font-semibold'>{option.title}</h3>
                      </div>
                      {option.more && <ChevronDown className={cn('ml-2 text-gray-500', open ? 'rotate-180' : '')}/>}
                    </div>
                    <p className='text-sm text-gray-600 pl-6'>{option.description}</p>
                </div>

                {option.more && open && 
                  <div className='w-full lg:w-fit grid lg:grid-cols-2 gap-4'>
                    {option.more && option.more.map((subOption, subIndex) => (
                      <div key={subIndex} className='w-full lg:w-sm mt-4 p-2 rounded-md cursor-pointer bg-gray-100 transition-colors'
                      onClick={() => handleNavigate(subOption.role)}>
                        <div className='p-2'>
                          <div className='flex items-center gap-2'>
                            {subOption.icon}
                            <h3 className='text-lg font-semibold'>{subOption.name}</h3>
                          </div>
                          <span className='text-sm text-gray-500'>{subOption.permissions}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
          ))}
        </div>
    </div>
  )
}
