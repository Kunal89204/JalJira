"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useUser } from '../../../../packages/hooks/useUser'

const Index = () => {
  const {logout, user} = useUser()
  return (
    <div>
      {user?.email}
      <Button onClick={logout} className='m-20'>Logout</Button>
    </div>
  )
}

export default Index
