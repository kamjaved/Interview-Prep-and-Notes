import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllProducts=createAsyncThunk(
  'products/getAll',

  async()=>{
    try {
      // fetch the data
    } catch (error) {
     // handle error 
    }
  }
)

const prodcutSlice= createSlice({
  name:'prodcuts',
  initialState:{
    allProducts:[],
    loading:true,
    error:{}
  },
  
  reducers:{

  },

  extraReducers:(builder)=>{
    builder.
  }
})