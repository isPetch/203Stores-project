import { createRouter, createWebHistory } from 'vue-router'
import AddEditView from '../components/AddEdit.vue'
import HistoryListView from '../components/HistoryList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'AddHistoryList',
            component: AddEditView        
        },
        {
            path: '/historys',
            name: 'HistoryList',
            component: HistoryListView 
        }
    ]
})
export default router