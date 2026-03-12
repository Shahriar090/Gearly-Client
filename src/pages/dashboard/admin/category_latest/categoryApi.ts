import useAxios from "@/hooks/useAxios"


// category related API calles
// in this file no UI logic, no form logic

export const useCategoryApi = ()=>{
  const {api} = useAxios()

  const createCategory = async(formData:FormData)=>{
    const res = await api.post("/categories/create-category", formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    return res.data
  }

   const getCategories = async () => {
    const res = await api.get("/categories")
    return res.data
  }

   const getAttributeTemplates = async () => {
    const res = await api.get("/attribute-templates")
    return res.data
  }

   return {
    createCategory,
    getCategories,
    getAttributeTemplates,
  }
}