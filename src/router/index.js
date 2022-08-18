
import Vue from 'vue'
import VueRouter from 'vue-router'

//Import des vues => views/
import Accueil from "@/views/Accueil.vue"
import Produits from "@/views/Produits.vue"
import AjouterProduit from "@/views/AjouterProduit.vue"
import DetailsProduit from "@/views/DetailsProduit.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil-vue',
    component: Accueil
  },
  {
    path: '/produits',
    name: 'produits-vue',
    component: Produits
    
  },
  {
    path: '/ajouter-produit',
    name: 'ajouter-produit',
    component: AjouterProduit
    
  },
  {
    path: '/produits/:id',
    name: 'details-produit',
    component: DetailsProduit
    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
