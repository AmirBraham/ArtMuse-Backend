import { invoke } from '@tauri-apps/api/tauri'

export const get_state = () => {
    invoke<string>('get_state')
    .then((state) => {
    alert(state)
      console.log(state)
    })
    .catch(console.error)
}

const change_interval = () => {
    invoke<string>('get_state')
    .then((state) => {
      console.log(state)
    })
    .catch(console.error)
}

