<script setup>
import Nav from './components/Nav.vue'
import { RouterView } from 'vue-router'

const addNewHistory= async(newHistory)=>{
 
  try{
    const res=await fetch('http://localhost:4000/history', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        numbers: newHistory.numbers,
        customerType: newHistory.customerType,
        subTotal: newHistory.subTotal,
        discount: newHistory.discount,
        total: newHistory.total,
        dateTime: newHistory.dateTime
      })
    })
    if(res.status===201){
      // console.log('add successfully')
      const addedHistory = await res.json()
      history.value.push(addedHistory)
      console.log(history.value)
    }
    else throw Error('cannot add!')
  }
  catch(err) {
    console.log(err)
  }
}
</script>

<template>
<div class="w-screen h-screen ">
  <div class="flex flex-col w-full h-full">

    <diV class="flex flex-row w-full h-10 "  style="background-color: #DFE6F9">
      <div class="flex w-1/6 h-full items-center justify-center" style="background-color: #304477">
        <p class="font-semibold text-lg" style="color: #FFC635;">203 Store</p>
      </diV>
      <div class="flex items-center font-semibold "><Nav /></div>
    </diV>

    <RouterView @add="addNewHistory"/>

  </div>

</div>
</template>

<style scoped></style>
