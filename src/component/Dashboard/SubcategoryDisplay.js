import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {getData,BaseUrl,postData,postDataAndImage} from '../FetchServices'

export default function SubTables() {
    const [stateCol, setStateCol] = React.useState({
        columns: [
            { title: 'SubCategory ID', field: 'subcategoryid',editable:'never' },
            {title: 'Category ID',field:'categoryid',editable:'never'},
            { title: 'Sub Category Name', field: 'subcategoryname' },
         
            {
                field: 'subcategoryicon',
                title: 'Icon',
                render: rowData => <img src={`${BaseUrl}/images/${rowData.subcategoryicon}`} style={{width: 35, borderRadius: '50%'}}/>,
                editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])} />)
              }]

    })  
  const [state, setState] = React.useState({
     data: []});
   
     const [getFile,setFile]=React.useState('')
  const readAllRecords=async()=>{
    var list=await getData('subcategory/displayall') 
    setState({data:list})
    }
 useEffect(()=>{
  readAllRecords()

 },[]) 
   const handleEdit=async(newData)=>{
  if(getFile==='')
  {
    console.log(newData)
   let body={ 'subcategoryId':newData.subcategoryid,
               'subcategoryName':newData.subcategoryname, 
             }
       let result=await postData('subcategory/editdata',body)
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
        let formData=new FormData()
        formData.append('oldpicture',newData.subcategoryicon)
        formData.append('subcategoryId',newData.subcategoryid)
        formData.append('subcategoryIcon',getFile)
        const config={headers:{'content-type':'multipart/form-data'}}
         var result =await postDataAndImage('subcategory/editIcon',formData,config)
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
      let body={'subcategoryId':oldData.subcategoryid}
      let result=await postData('subcategory/deleteRecord',body) 
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
    //   formData.append('categoryId',newData.subcategoryid);
    //   formData.append('Subcategoryname',newData.subcategoryname)
    //   formData.append('Subcategorydescription',newData.subcatergorydescription)
    //   formData.append('Subcategoryicon',getFile)
    //   const config={headers:{'content-type':'multipart/form-data'}}
    //    var result =await postDataAndImage('subcategory/addNewRecord',formData,config)
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
      title="SubCategory Table"
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
