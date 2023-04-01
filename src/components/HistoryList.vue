<script setup>
import { getHistory } from '../composable/getHistory';
import AddEdit from './AddEdit.vue';
import { ref, onMounted } from 'vue'


const history = ref([])

onMounted(async () => {
  history.value = await getHistory()
    console.log(history.value)
})

//delete
const deleteHistory=async(deleteId)=>{
  try{
    const res= await fetch(`http://localhost:4000/history/${deleteId}`,{
      method: 'DELETE'
    })
    if(res.ok){
      history.value=history.value.filter((his) => {
        return his.id!==deleteId
      })
    } else throw new error('Error, cannot delete data!')
  }catch (error){ 
    console.log(error)
  }
}
//PUT
const currentComponent = ref('HistoryList')
const setCurrentComponent = (currentCompo) => {
  currentComponent.value =currentCompo
}

const editHistory = ref(undefined)
const setEditMode=(historys)=>{
  console.log(historys)
  editHistory.value = historys
  setCurrentComponent('Historymanagement')
}

const modifyHistory = async (updatedHistoryList) =>{
  // console.log(updatedQuestion)
  try {
    const res =await fetch(`http://localhost:4000/history/${updatedHistoryList.id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        numbers: updatedHistoryList.numbers,
        customerType: updatedHistoryList.customerType,
        subTotal: updatedHistoryList.subTotal,
        discount: updatedHistoryList.discount,
        total: updatedHistoryList.total,
        dateTime: updatedHistoryList.dateTime
      })
    })
    if (res.status===200) {
      // console.log('Edit successfully')
      const modifyHistory = await res.json()
      history.value=history.value.map((his) =>{
        if (his.id === modifyHistory.id) {
          his.numbers = modifyHistory.numbers
          his.customerType = modifyHistory.customerType
          his.subTotal = modifyHistory.subTotal
          his.discount = modifyHistory.discount
          his.total = modifyHistory.total
          his.dateTime = modifyHistory.dateTime
        }
        return his
      })
      setCurrentComponent('HistoryList')
      editHistory.value = undefined
    } else {
      throw new Error('cannot edit')
    }
  } 
  catch (error) {
    console.log(error)
  }
}

</script>
<template>
<diV class="flex w-3/6 h-10 ml-auto mr-auto items-center">
    <p class="font-semibold text-xl" style="color: #304477;">History</p>
</diV>
<AddEdit @edit="modifyHistory" v-if="currentComponent === 'Historymanagement'" :historys="editHistory"/>
<div v-else class="flex flex-col w-full h-full">
      <div class="flex w-3/6 h-5/6 ml-auto mr-auto rounded-lg" style="background-color: #F1F1F1">
        <div class="flex flex-col w-full h-100 m-6  overflow-x-auto" >
    <table  class="w-full  table table-zebra" >
      <thead >     
        <tr>
          <th></th>
          <th >date</th>
          <th >Customers</th>
          <th >Discount</th>
          <th >Purchase</th>
          <th></th>
        </tr>
      </thead>
      <tbody  v-for="his in history">
        <tr>
          <td ><img src="./icons/delete.png" alt="logo" class="w-3 h-3" @click="deleteHistory(his.id)"/></td>
          <td>{{ his.dateTime }}</td>
          <td>{{ his.customerType }}</td>
          <td class=" text-red-600">{{ his.discount }} %</td>
          <td>{{ his.total }}</td>
          <td><img src="./icons/edit.png" alt="logo" class="w-3 h-3"  @click="setEditMode(his)"/></td>
        </tr>
      </tbody>
    </table>     
  </div>
      </div>
    </div>


</template>
 
<style scoped>

</style>