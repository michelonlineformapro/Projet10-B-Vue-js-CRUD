<template>
    <div v-if="produitCourant" class="container">
        <h3 class="text-center text-success bg-dark p-3">Détail du produit</h3>
        <div class="mt-3">
            <input 
                type="text"
                class="form-control"
                required
                v-model="produitCourant.title"
                placeholder="Nom du produit"
            />
        </div>

        <div class="mt-3">
            <textarea 
                class="form-control"
                required
                v-model="produitCourant.description"
            >Description du produit</textarea>
        </div>

        <div class="mt-3">
            <input 
                type="text"
                class="form-control"
                required
                v-model="produitCourant.picture"
                placeholder="Url de l'image du produit"
            />
        </div>

        <div class="mt-3">
            <input 
                type="number"
                step="0.01"
                class="form-control"
                required
                v-model="produitCourant.price"
                placeholder="Prix du produit"
            />
        </div>

        <div class="mt-3">
            <input 
                type="number"
                class="form-control"
                required
                v-model="produitCourant.stock"
                placeholder="Nombre de produit en stock"
            />
        </div>

        <div class="mt-3">
            <!--Message de succès-->
            <div class="alert alert-success">
                {{message}}
            </div>
            <button @click.prevent="mettreJourProduit" type="submit" class="btn btn-outline-danger">METTRE A JOUR</button>
            <button @click.prevent="supprimerProduit" type="submit" class="btn btn-outline-success mx-3">SUPPRIMER</button>
            <div class="mt-3" v-if="valide">
                <button type="submit" class="btn btn-outline-info mx-3" >
                    <router-link to="/produits">Retour au produit</router-link>
                </button>
            </div>
            
        </div>
    </div>
     <!--Si id n'est pas connu = page 404 + message alert-->

    <div v-else class="container">
        <p class="alert alert-danger">Aucun jeux vidéo ne possède cette identifiant !</p>
        <button class="btn btn-outline-danger">
        <router-link to="/produits">Retour</router-link>
        </button>
    </div>
</template>

<script>
import ProduitsDataServices from "@/ProduitsDataServices";
export default{
    name: 'DetailsproduitComponent',
    data(){
        return{
            //Init de l'objet courant
            produitCourant: null,
            //message de mise a jour
            message: '',
            //status
            valide: false
           
        }
    },

    methods:{
        produitParId(id){
            ProduitsDataServices.recupererProduitParId(id)
            .then(response => {
                this.produitCourant = response.data;
                console.log(response.data)
            })
            .catch(erreur => {
                console.log('pas de produit pour cet id : ' + erreur)
            })
        },
        //Supprimer le produit
        supprimerProduit(){
            //La promesse
            ProduitsDataServices.supprimerProduit(this.produitCourant.id)
            .then(response => {
                console.log(response.data)
                //si ca marche : on effectue une redirection
                this.$router.push('../produits')
            })
            .catch(erreur => {
                console.log('Impossible de supprime ce produits : ' + erreur)
            })
        },

        //Mettre a jour le produit
        mettreJourProduit(){
            //Appel des services
            ProduitsDataServices.mettreAJourProduit(this.produitCourant.id, this.produitCourant)
            .then(response => {
                console.log(response.data);
                this.valide = true;
                this.message = "Le produit a bien été mis a jour !";
            })
            .catch(erreur => console.log("Erreur " + erreur))
        }



    },
       //Dans le cycle de vie Vuejs on declénche la fonction produitParId quand le composant est monté
  //instance de vue + beforeCreate + created (data-binding getter et setter= puis beforeMounted et monted() intercepte les modifications dur la page (beforeUpdated et updated)
  mounted() {
    this.message = '';
    this.produitParId(this.$route.params.id) //localhost:3000/produits/:id
  }  
}

</script>

<style scoped>
    a{
        text-decoration: none;
        color: brown;
    }
</style>
