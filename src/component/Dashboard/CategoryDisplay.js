import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {getData,BaseUrl,postData,postDataAndImage} from '../FetchServices'

export default function Tables() {
    const [stateCol, setStateCol] = React.useState({
        columns: [
            { title: 'Category ID', field: 'categoryid'  ,editable:'never'},
            { title: 'Category Name', field: 'categoryname' },
            {
                field: 'categoryicon',
                title: 'Icon',
                render: rowData => <img src={`${BaseUrl}/images/${rowData.categoryicon}`} style={{width: 35, borderRadius: '50%'}}/>,
                editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])} />)
              }]
              

    })  
  const [state, setState] = React.useState({
     data: []});
   const [getFile,setFile]=React.useState('')
   
  const readAllRecords=async()=>{
    var list=await getData('category/displayall') 
    setState({data:list})
    }
 useEffect(()=>{
  readAllRecords()

 },[]) 
 const handleEdit=async(newData)=>{
   
   if(getFile==='')
   {
     console.log(newData)
    let body={ 'categoryId':newData.categoryid,
                'categoryName':newData.categoryname,   
              }
        let result=await postData('category/editdata',body)
        if(result)
        {
           alert ('record update')
        }     
        else
       {
           alert('Fail to Update')
       }   
    }
      
    else{
      // alert(newData.categoryicon)
         let formData=new FormData()
         formData.append('oldpicture',newData.categoryicon)
         formData.append('categoryId',newData.categoryid)
         formData.append('categoryIcon',getFile)
         const config={headers:{'content-type':'multipart/form-data'}}
          var result =await postDataAndImage('category/editIcon',formData,config)
          if(result)
          {
            alert('Icon updated')
          }
          else{
             alert('failed to update icon')
          }
        }      
        readAllRecords() 
    }
  
    const handleDelete=async(oldData)=>
    {
      let body={'categoryId':oldData.categoryid}
      let result=await postData('category/deleteRecord',body) 
      if(result.RESULT)
        alert('Record Deleted')
      else
        alert('Fail to Delete Record')
       readAllRecords()
    
    }
  
    // const handleAdd=async(newData)=>
    // {
    //   console.log(newData)
    //   let formData=new FormData()
    //   formData.append('categoryName',newData.categoryname)
    //   formData.append('categoryDescription',newData.catergorydescription)
    //   formData.append('categoryIcon',getFile)
    //   const config={headers:{'content-type':'multipart/form-data'}}
    //    var result =await postDataAndImage('category/addNewRecord',formData,config)
    //    if(result)
    //    {
    //      alert("Record Submitted....")
    //   }
    //    else
    //    {
    //      alert("Record not submitted...")
    //    }
    //    readAllRecords()
    // }
  const View=()=>{
  return(
<MaterialTable
      title="Category Table"
      columns={stateCol.columns}
      data={state.data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       const data = [...state.data];
        //       data.push(newData);
        //       setState({ ...state, data });handleAdd(newData)
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });handleEdit(newData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });handleDelete(oldData)
            }, 600);
          }),
      }}
    />
    
  )}

  return (
      <div> {View()} </div>
    
  );
}
