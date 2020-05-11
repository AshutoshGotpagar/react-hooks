import Context from '../context'
import { useContext } from 'react'

export const useAppContext = () => {
    return useContext(Context)
}