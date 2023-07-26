'use client'

import React from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Settings() {
  return (<Link href="settings">
    <Cog6ToothIcon className="h-5 w-5 " />
  </Link>)

}