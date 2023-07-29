'use client'

import React from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Settings() {
  return (<Link to="/settings">
    <Cog6ToothIcon className="h-5 w-5 " />
  </Link>)

}