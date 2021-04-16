import axios from "axios"
import { useState } from "react"
import { errorToast, successToast } from "../components/Toast"

const getRegion = (url) => url.split("/")[2]

export const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false)

  async function requestAPI(callback, toastMessage) {
    try {
      setIsLoading(true)
      console.log("api checked")
      const data = await callback()
      console.log({ data })
      return data
    } catch (error) {
      errorToast("Request Failed! Try again later.")
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
      return response.data[`${getRegion(url)}Items`]
    })
  }

  async function postData(newItem) {
    return requestAPI(async () => {
      const response = await axios.post(url, newItem)
      return response.data[`${getRegion(url)}Items`]
    }, `${newItem.name} added to your ${getRegion(url)}List`)
  }

  async function deleteData(id) {
    return requestAPI(async () => {
      const response = await axios.delete(`${url}/${id}`)
      if (response.status === 204) {
        return "success"
      }
    }, `Removed from ${getRegion(url)}`)
  }

  return { isLoading, getData, postData, deleteData }
}
