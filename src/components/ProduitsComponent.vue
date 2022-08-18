<template>
    <div class="container">
        <h3 class="text-danger p-3 bg-warning">NOS PRODUITS</h3>

        <div class="row">

            <div class="col-md-6 col-sm-12">
                <ul class="list-group">
                    <!--On switch de classe css au clic-->
                    <li 
                        class="list-group-item mt-3 game-item"
                        v-bind:class="{active : index === produitIndex}"
                        v-for="(produit, index) in produits" v-bind:key="index"
                        @click.prevent="setProduitsConcerner(produit, index)"
                        >
                        {{produit.title}}
                    </li>

                </ul>    
            </div>

            <div class="col-md-6 col-sm-12 shadow p-3 bg-white rounded">
                <div v-if="produitCourant">
                    <h3 class="bg-warning p-2 text-danger">{{produitCourant.title}}</h3>
                    <img v-bind:src="produitCourant.picture" :alt="produitCourant.title" :title="produitCourant.title"/>
                     <div>
                        <p><b>Description :</b></p>
                        <p>{{ produitCourant.description }}</p>
                    </div>
                    <div>
                        <p><b>Prix :</b></p>
                        <p>{{ produitCourant.price }} €</p>
                    </div>
                    <div>
                        <p><b>Nombre de produit en stock :</b></p>
                        <p>{{ produitCourant.stock }}</p>
                    </div>
                    <div>
                        <a v-bind:href="`/produits/${produitCourant.id}`"  class="btn btn-outline-dark">EDITER : {{produitCourant.title}}</a>
                    </div>
                </div>
                <div v-else>
                    <p class="text-danger">MERCI DE SELECTIONNER UN PRODUIT</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
    //Import du fichier de services + methode
    import ProduitsDataServices from "@/ProduitsDataServices";
    export default {
        name: 'ProduitsComponent',
        //le 2 ways binding = getter et setter
        data(){
            return {
                //tableau de produits vide
                produits:[],
                //Le produits courant
                produitCourant: null,
                //L'index des produit dans le tableau
                produitsIndex: -1,
                //Le critère de recherche
                rechercher: null,
            }
        },
        methods:{
            //cette fonction est appelée apres mounted() dans le cycle de vie
            afficherProduit(){
                //Appel de la methode recupererProduits du fichier (de la classe) de service
                ProduitsDataServices.recupererTousProduits()
                //On creer une promesse qui rempli le tableau de produits depuis db.json via axios
                .then(response => {
                    //On rempli le tableau
                    this.produits = response.data
                    //test de debug
                    console.log(response.data)
                })
                //Sinon on affiche une erreur
                .catch(erreur => {
                    console.log('Erreur : aucun produit touvé ' + erreur)
                })
            },
            //Au clic on affiche les details du produit
            setProduitsConcerner(produit, index){
                //produitsCourant passe de null au produit cliqué
                this.produitCourant = produit;
                //On recupère l'index soustrait de 1
                this.produitsIndex = index
            }
        },
        //Dans le cycle de vie : Vuejs on appel la fonction afficher quand le composant est monté
        //1 -> insatnce de vue main.js
        //2 beforeCreate + created (greffe sur le name du composant) + beforeMount et enfin mounted()
        //3 lors du changement détécté dans le composant beforeUpdate + updated
        mounted() {
            this.afficherProduit();
        }
        
    }
</script>

<style scoped>
    .game-item{
    color: #A62F03;
    font-weight: bold;
    font-size: 20px;
    transition: 0.2s;
}

.game-item:hover{
    color: #fcc100;
    background-color: #A62F03;
    transform: scale(1.05);
    cursor: pointer;
    
}
  .active{
    color: white!important;
    font-weight: bold!important;
    padding: 20px;
    font-size: 30px;
    background-color: #42b983!important;
    border: none;
  }
</style>
