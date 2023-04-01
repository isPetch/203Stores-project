<script setup>
import { ref,onMounted,computed } from 'vue'

defineEmits(['add', 'edit'])

const props = defineProps({
  historys: { type: Object}
})

const updateHistory = ref({})
onMounted(()=>{
  //Add
  if(props.historys === undefined){
    updateHistory.value={
      numbers: [],
      customerType: '',
      subTotal: '',
      discount: '',
      total: '',
      dateTime: ''
    }
  }
  //Edit
  else{
    updateHistory.value = props.historys
  }
})

//customerType
const customer = computed(() => {
  if (updateHistory.value.customerType === 'Guest') {
    return 'Guest'
  } else if (updateHistory.value.customerType === 'Member') {
    return 'Member'
  } 
})


// discount color
const discount = computed(() => {
  const totalAmount = updateHistory.value.subTotal
  let discountPercentage = 0
  let backgroundColor = '#D7D7D7'

  if (updateHistory.value.customerType === 'Member') {
    if (totalAmount >= 30000) {
      discountPercentage = 30
      backgroundColor = '#9DE3BB'
    } else if (totalAmount >= 15000) {
      discountPercentage = 20
      backgroundColor = '#9DE3BB'
    } else if (totalAmount >= 5000) {
      discountPercentage = 10
      backgroundColor = '#9DE3BB'
    } else if (totalAmount >= 1000) {
      discountPercentage = 5
      backgroundColor = '#9DE3BB'
    }
  }

  return { percentage: discountPercentage, color: backgroundColor }
})

//subTotal
const subTotal = computed(() => {
  return  updateHistory.value.numbers.reduce((acc, cur) => acc + cur.value, 0)
})

//total
const total = computed(() => {
  const sub = subTotal.value
  const dis = (sub * discount.value.percentage) / 100
  return sub - dis
})

//addNumber
const numberValue = ref('')
const addNumber = () => {
  if (numberValue.value !== '') {
    updateHistory.value.numbers.push({ value: Number(numberValue.value) })
    numberValue.value = ''
  }
  updateHistory.value.subTotal = subTotal.value
  updateHistory.value.discount = discount.value.percentage
  updateHistory.value.total = total.value
}

//removeNumber
const removeNumber = (index) =>{
  updateHistory.value.numbers.splice(index, 1);
  updateHistory.value.subTotal = subTotal.value
  updateHistory.value.discount = discount.value.percentage
  updateHistory.value.total = total.value
}

//Confirm
const handleConfirm = () => {
  const now = new Date()
  updateHistory.value.dateTime = now.toLocaleString()
}
const clearForm = () => {
  updateHistory.value={
    numbers: [],
    customerType: '',
    subTotal: '',
    discount: '',
    total: '',
    dateTime: ''
  }
}
</script>
 
<template>
<diV class="flex w-3/6 h-10 ml-auto mr-auto items-center">
    <p class="font-semibold text-xl" style="color: #304477;">Cashier</p>
</diV>
<div class="flex flex-col w-full h-full">
      <div class="flex w-3/6 h-5/6 ml-auto mr-auto rounded-lg" style="background-color: #F1F1F1">
        <div class="flex flex-col w-full h-100 m-6 "  >
    <div class="flex flex-row w-full h-16 space-x-2">
      <input type="number" placeholder="Type here" class="w-5/6 h-4/6 rounded-lg" v-model.number="numberValue" @keyup.enter="addNumber" />
      <button class=" w-1/6 h-4/6 rounded-lg text-white" style="background-color: #4263EB " @click="addNumber">Add</button>
    </div>

    
    <div class="flex flex-col w-full h-1/3 bg-white rounded-lg overflow-auto touch-pan-y" >
      <div class="flex w-1/2 h-6 mt-1 ml-2 ">No.</div>
      <div class="flex flex-col w-100 h-32 mt-1 ml-3 mr-3 ">
        <div class="flex w-full h-6 items-start space-x-2 mb-1 border-b  border-black "  v-for="(number, index) in updateHistory.numbers" :key="number.id" >
          <p  class="flex w-full h-full">{{ index+1 }}. {{number.value}} ฿</p>
          <div class="flex w-full h-full justify-end items-center"><img src="./icons/delete.png" alt="logo" class="w-3 h-3"  @click="removeNumber(index)"/></div>
        </div>
      </div>
    </div>

    <div class="flex flex-row w-1/2 h-6 mt-2 ">
      <div class="flex flex-row w-1/4 h-full ">Customer :</div>
      <div class="flex flex-row w-1/4 h-full space-x-1">
        <input type="radio" name="customerType" value="Guest" v-model="updateHistory.customerType" class="radio checked:bg-blue-500 bg-white" :checked="customerType === 'Guest'"  />
        <p>Guest</p>
      </div>
      <div class="flex flex-row w-1/4 h-full space-x-1">
        <input type="radio" name="customerType" value="Member" v-model="updateHistory.customerType" class="radio checked:bg-blue-500 bg-white" :checked="customerType === 'Member'" />
        <p>Member</p>
      </div>
    </div>
    <div class="w-full h-6 mt-1">Discount ({{ updateHistory.customerType }}):</div>


    <div class="flex flex-row w-full h-12 mt-1 space-x-2 ">
      <div class="flex w-20 h-full rounded-md items-center justify-center" :style="{ backgroundColor: discount.percentage >= 5 && discount.percentage <10 ? discount.color : '#D7D7D7' }">
        <p :style="{ color: discount.percentage >= 5 && discount.percentage <10 ? 'black' : '#98999A' }">5%</p>
      </div>
      <div class="flex w-20 h-full rounded-md items-center justify-center" :style="{ backgroundColor: discount.percentage >= 10 && discount.percentage <20 ? discount.color : '#D7D7D7' }">
        <p :style="{ color: discount.percentage >= 10 && discount.percentage <20 ? 'black' : '#98999A' }">10%</p>
      </div>
      <div class="flex w-20 h-full rounded-md items-center justify-center" :style="{ backgroundColor: discount.percentage >= 20 && discount.percentage <30 ? discount.color : '#D7D7D7' }">
        <p :style="{ color: discount.percentage >= 20 && discount.percentage <30 ? 'black' : '#98999A' }">20%</p>
      </div>
      <div class="flex w-20 h-full rounded-md items-center justify-center" :style="{ backgroundColor: discount.percentage >= 30  ? discount.color : '#D7D7D7' }">
        <p :style="{ color: discount.percentage >= 30  ? 'black' : '#98999A' }">30%</p>
      </div>
    </div>


    <div class="flex flex-col w-full h-2/6 mt-6 0">
      <div class="flex flex-col w-full h-1/2 ">
        <div class="flex  w-full h-1/2 items-center justify-end ">
          <p class="font-bold" style="color: #777777;">Sub Total : {{ updateHistory.subTotal }} ฿</p>
        </div>
        <div class="flex  w-full h-1/2 items-center justify-end ">
          <p class="font-bold" style="color: #FF0000;">Discount : {{ updateHistory.subTotal - updateHistory.total }}  ฿</p>
        </div>
      </div>
      <div class="flex  w-full h-1/2 items-center justify-end ">
        <p class="font-bold text-xl" style="color: #007934;">Total : {{ updateHistory.total }} ฿</p>
      </div>
    </div>

    <div class="flex w-full h-16 items-center justify-end ">
      <button @click="$emit('edit', updateHistory)" class=" w-1/6 h-4/6 rounded-lg text-white mt-2 bg-red-600" v-if="updateHistory.id">Edit</button>
      <button @click="$emit('add', updateHistory,handleConfirm(),clearForm())" class=" w-1/6 h-4/6 rounded-lg text-white mt-2" v-else style="background-color: #4263EB">Confirm</button>
    </div>

  </div>
      </div>
</div>




</template>
 
<style scoped>

</style>
