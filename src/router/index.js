import { createRouter, createWebHistory } from 'vue-router'
import CentralAjuda from '../pages/CentralAjuda.vue'
import ManualAdmin from '../pages/ManualAdmin.vue'
import ManualGerente from '@/pages/ManualGerente.vue'
import ManualFuncionario from '@/pages/ManualFuncionario.vue'
import ManualFinanceiro from '@/pages/ManualFinanceiro.vue'
import ManualMobile from '@/pages/ManualMobile.vue'

const routes = [
  { path: '/', component: CentralAjuda },
  { path: '/admin', component: ManualAdmin },
   { path: '/gerente', component: ManualGerente },
   { path: '/funcionario', component: ManualFuncionario },
    { path: '/financeiro', component: ManualFinanceiro },
    { path: '/mobile', component: ManualMobile},
  // Podes adicionar as outras rotas depois
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router