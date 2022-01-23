import axios from 'axios'
import { useState } from 'react'
import { errorToast, successToast } from '../components/Toast'

const getRegion = (url) => {
  console.log(url.split('/'))
  return url.split('/').pop()
}


export const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false)

  async function requestAPI(callback, toastMessage) {
    try {
      setIsLoading(true)
      const data = await callback()
      return data
    } catch (error) {
      errorToast('Request Failed! Try again later.')
    } finally {
      setIsLoading(false)
      if (toastMessage) {
        successToast(toastMessage)
      }
    }
  }

  async function getData() {
    return requestAPI(async () => {
      const response = await axios.get(url)
      
      return response.data
    })
  }

  async function postData(newItem) {
    return requestAPI(async () => {
      const response = await axios.post(url, newItem)
      
      return response.data
    }, `${newItem.name} added to your ${getRegion(url)}`)
  }

  async function deleteData(id) {
    return requestAPI(async () => {
      const response = await axios.delete(`${url}/${id}`)
      if (response.status === 204) {
        return 'success'
      }
    }, `Removed from ${getRegion(url)}`)
  }

  return { isLoading, getData, postData, deleteData }
}
