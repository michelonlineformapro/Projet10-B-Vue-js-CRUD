<template>
    <div v-if="!valide" class="container">
        <h3 class="text-center text-warning p-3 bg-success">AJOUTER UN PRODUIT</h3>

        <div class="mt-3">
            <input 
                type="text"
                class="form-control"
                required
                v-model="produits.title"
                placeholder="Nom du produit"
            />
        </div>

        <div class="mt-3">
            <textarea 
                class="form-control"
                required
                v-model="produits.description"
            >Description du produit</textarea>
        </div>

        <div class="mt-3">
            <input 
                type="text"
                class="form-control"
                required
                v-model="produits.picture"
                placeholder="Url de l'image du produit"
            />
        </div>

        <div class="mt-3">
            <input 
                type="number"
                step="0.01"
                class="form-control"
                required
                v-model="produits.price"
                placeholder="Prix du produit"
            />
        </div>

        <div class="mt-3">
            <input 
                type="number"
                class="form-control"
                required
                v-model="produits.stock"
                placeholder="Nombre de produit en stock"
            />
        </div>

        <div class="mt-3">
            <button type="submit" class="btn btn-danger" @click.prevent="sauverProduit">Valider l'ajout</button>
        </div>


    </div>
    <div v-else class="p-3 shadow bg-white">
        <h4 class="text-info text-center">Le produit à bien été ajouté !</h4>
        <button class="btn btn-outline-success" @click.prevent="viderFormulaire">RETOUR</button>
    </div>
</template>

<script>
import ProduitsDataServices from "@/ProduitsDataServices";

export default{
    name:'AjouterProduitComponent',
    data(){
        return{
            //Init du nouvel objet
            produits:{
                'id': '',
                'title': '',
                'description': '',
                'picture': '',
                'price': '',
                'stock': '',
                publier: false
            },
            valide: false
        }
    },
    methods:{
        //Au clic sur le bouton du formulaire
        sauverProduit(){
            //get les champs du fomulaire
            let donnees = {
                title: this.produits.title,
                description: this.produits.description,
                picture: this.produits.picture,
                price: this.produits.price,
                stock: this.produits.stock
            };

        //La classe de services + la promesse
        ProduitsDataServices.ajouterProduit(donnees)
        .then(response => {
            //Creer l'objet
            this.produits.id = response.data.id
            //debug
            console.log('Produit ajouté :' + response.data);
            //Le booléen devient true
            this.valide = true
        })
        .catch(erreur => {
            //sinon on affiche une erreur + debug
            console.log(erreur)
        })

        },

        //A chaque ajout on vide les champs du formulaire
        viderFormulaire(){
            this.valide = false,
            this.produits = {}
        }
    }
}

</script>
