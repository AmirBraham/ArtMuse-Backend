'use client'

import React, { useState, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function ChangeWallpaper() {
  const [isSending, setIsSending] = useState(false)
  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    const res = await fetch('https://artmuse-2b28bb190030.herokuapp.com/api/paintings/?limit=10&page=1', {
      headers: {
        'accept': 'application/json'
      }
    });

    const data = await res.json()
    console.log(data)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    setIsSending(false)
    invoke<string>('greet', { name: JSON.stringify(data) })
      .then((val) => {
        console.log(val)
      })
      .catch(console.error)
  }, [isSending]) // update the callback if the state changes

  // Necessary because we will have to use Greet as a component later.
  return (<button disabled={isSending} onClick={sendRequest}>    
  <Cog6ToothIcon className="h-5 w-5 " />
  </button>)

}