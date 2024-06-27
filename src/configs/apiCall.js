import axios from 'axios'

export const commonApiCall = async (endPoint, requestType, payload, token) => {
  const authHeader = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  try {
    const { data } = await axios[requestType](
      `${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`,
      payload,
      authHeader,
    )
    if (data) {
      return data
    } else {
      return data
    }
  } catch (e) {
    // message.error("Something is wrong with server")
    console.log('Error', e.message)
  }
}
