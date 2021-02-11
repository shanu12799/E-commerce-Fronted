import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {getData,BaseUrl,postData,postDataAndImage} from '../FetchServices'

export default function Tables() {
    const [stateCol,setStateCol] = React.useState({
        columns: [
            { title: 'Product ID', field: 'productid'  ,editable:'never'},
            { title: 'Category ID', field: 'categoryid'  ,editable:'never'},
            { title: 'SubCategory Id', field: 'subcategoryid',editable:'never' },
            { title: 'Product Name', field: 'productname'  },
            { title: 'Product Description', field: 'productdescription'  },
            { title: 'Quantity', field: 'quantity'  },
            { title: 'Product Price', field: 'price'  },
            {
                field: 'picture',
                title: 'Icon',
                render: rowData => <img src={`${BaseUrl}/images/${rowData.picture}`} style={{width: 35, borderRadius: '50%'}}/>,
                editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])} />)
              }]
              

    })  
  const [state, setState] = React.useState({
     data: []});
   const [getFile,setFile]=React.useState('')
   
  const readAllRecords=async()=>{
    var list=await getData('Product/displayall') 
    setState({data:list})
    }
 useEffect(()=>{
  readAllRecords()

 },[]) 
 const handleEdit=async(newData)=>{
   
   if(getFile==='')
   {
     console.log(newData)
    let body={ 'productId':newData.productid,
                'productname':newData.productname, 
                'productdescription':newData.productdescription, 
                'quantity':newData.quantity, 
                'price':newData.price,   
              }
        let result=await postData('Product/editdata',body)
        if(result.RESULT)
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
         formData.append('oldpicture',newData.picture)
         formData.append('productid',newData.productid)
         formData.append('picture',getFile)
         const config={headers:{'content-type':'multipart/form-data'}}
          var result =await postDataAndImage('Product/editIcon',formData,config)
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
      let body={'productid':oldData.productid}
      let result=await postData('Product/deleteRecord',body) 
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
