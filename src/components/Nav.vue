<script setup>
import { RouterLink } from 'vue-router'
</script>
 
<template>
<div class=" space-x-6 ml-4">
<RouterLink :to="{name: 'AddHistoryList'}" active-class="active">Cashier</RouterLink>
<RouterLink :to="{name: 'HistoryList'}" active-class="active">History</RouterLink>
</div>
</template>
 
<style scoped>
.active{
    color: #0000ee;
}
</style>