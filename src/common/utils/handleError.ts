import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { isErrorWithMessage } from "@/common/utils/isErrorWithMessage.ts"
import { ResultCode } from "@/common/enums"

export const handleError = (api:  BaseQueryApi, res: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>) => {

  let error = 'Something went wrong'

  if(res.error) {
    switch (res.error.status) {
      case "FETCH_ERROR" :
      case "PARSING_ERROR" :
      case "CUSTOM_ERROR" :
      case "TIMEOUT_ERROR" :
        error = res.error.error
        break

      case 400 :
        if(isErrorWithMessage(res.error.data)) {
          error = res.error.data.message
        } else {
          error = JSON.stringify(res.error.data)
        }
        break
      case 403 :
          error = '403 Forbidden Error. Check API-KEY'
        break
      default:
        if(res.error.status >= 500 && res.error.status < 600 ){
            error = 'Server error occurred. Please try again later.'
        }
    }
    api.dispatch(setAppErrorAC({error}))
  }

  if ((res.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (res.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }


}
//   if (
//     res.error.status === "FETCH_ERROR" ||
//
//     res.error.status === "PARSING_ERROR" ||
//
//     res.error.status === "CUSTOM_ERROR" ||
//
//     res.error.status === "TIMEOUT_ERROR"
//   ) {
//
//     api.dispatch(setAppErrorAC({ error: res.error.error }))
//
//   }
//
//   if (res.error.status === 400) {
//
//     if (isErrorWithMessage(res.error.data)) {
//
//       api.dispatch(setAppErrorAC({ error: res.error.data.message }))
//
//     } else {
//
//       api.dispatch(setAppErrorAC({ error: "Something went wrong" }))
//
//     }
//
//   }
//
//   if (res.error.status === 403) {
//
//     api.dispatch(setAppErrorAC({ error: "Status 403 forbitten Error"}))
//
//   }
//
// }if (res.error) {
//
//   if (
//
//     res.error.status === "FETCH_ERROR" ||
//
//     res.error.status === "PARSING_ERROR" ||
//
//     res.error.status === "CUSTOM_ERROR" ||
//
//     res.error.status === "TIMEOUT_ERROR"
//
//   ) {
//
//     api.dispatch(setAppErrorAC({ error: res.error.error }))
//
//   }
//
//   if (res.error.status === 400) {
//
//     if (isErrorWithMessage(res.error.data)) {
//
//       api.dispatch(setAppErrorAC({ error: res.error.data.message }))
//
//     } else {
//
//       api.dispatch(setAppErrorAC({ error: "Something went wrong" }))
//
//     }
//
//   }
//
//   if (res.error.status === 403) {
//
//     api.dispatch(setAppErrorAC({ error: "Status 403 forbitten Error"}))
//
//   }
//
// }
