import { AUTH_TOKEN } from "@/common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "@/common/utils/handleError.ts"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (arg, api, extraOptions) => {
    const res = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "API-KEY": import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(arg, api, extraOptions)
    handleError(api, res)
    return res
  },
  endpoints: () => ({}),
})
