import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return 0
        default:
            return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, counterDispatch] = useReducer(notificationReducer, 0)

    return (
        <NotificationContext.Provider value={[notification, counterDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDisptach = useContext(NotificationContext)
    return notificationAndDisptach[0]

}


export const useNotificationDispatch = () => {
    const notificationAndDisptach = useContext(NotificationContext)
    return notificationAndDisptach[1]

}

export default NotificationContext