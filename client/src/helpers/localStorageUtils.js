import { getAdapter } from "axios"

export const getLocalStorage = (item) => {
    return localStorage.getItem(item)
}

export const saveLocalStorage = (item, data) => {
    localStorage.setItem(item, data)
    return true
}

export const delLocalStorage = (item) => {
    localStorage.removeItem(item)
    return true
}