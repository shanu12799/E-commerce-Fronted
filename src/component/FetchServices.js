const axios=require('axios')
const BaseUrl='http://localhost:3001'
// const BaseUrl='https://ecomm-server09.herokuapp.com'
// const BaseUrlImages='https://ecomm-server09.herokuapp.com/images'
const BaseUrlImages='https://localhost:3001/images'
const postDataAndImage=async(url,formData,config)=>{
    try{

        const response=await axios.post(`${BaseUrl}/${url}`,formData,config)
        var result=response.data.RESULT
        return(result)
    }
    catch(e)
    {
      return(false)
    }
  }

  const postData=async(url,body)=>{
    try{
      var response=await fetch(`${BaseUrl}/${url}`,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(body),
        headers:{'content-type':"application/json;charset=utf-8"}
    })
    var result=await response.json()
    return (result)
  }
  catch(e)
  {
    return false
  }
}



  const getData=async(url)=>{
    try{
      var response=await fetch(`${BaseUrl}/${url}`,{
        method:'GET',
        mode:'cors',
        headers:{'content-type':"application/json;charset=utf-8"}
    })
    var result=await response.json()
    return (result)
  }
  catch(e)
  {
    return false
  }
}


export {postData,postDataAndImage,getData,BaseUrl,BaseUrlImages}

