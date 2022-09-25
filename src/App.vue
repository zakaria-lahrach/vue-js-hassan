<template>
  <div id="app">
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" v-if="activeButtonCreate" data-toggle="modal" data-target="#modal-create">Create</button>
                    <button class="btn btn-primary ml-2" @click="AddListeActive" v-if="activeButtonValidate">Validate</button>
                    <button class="btn btn-primary ml-2" v-if="activeButtonCancel">Cancel</button>
                </div>
                <div class="col-12 mt-5">
                    <div class="row">
                        <div class="col-6">
                            <div class="card" style="width: 18rem;">
                                <div class="card-header">
                                    <div class="d-flex justify-content-around">
                                        <div class="p-2">ToDo Active</div>
                                        <div class="p-2">{{listeActive.length}} items</div>
                                    </div>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="(item, index) in listeActive">
                                        <div class="d-flex">
                                            <div class="mr-auto p-2">
                                                {{item.title}}
                                            </div>
                                            <div class="p-2">
                                                <a href="javascript:void(0)" @click="toListTerminated(index)">
                                                    <i class="fa-solid fa-check"></i>
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="javascript:void(0)" @click="deleteItemsListeActive(index)">
                                                    <i class="fa fa-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card" style="width: 18rem;">
                                <div class="card-header"> 
                                    <div class="d-flex justify-content-around">
                                        <div class="p-2">ToDo Terminated</div>
                                        <div class="p-2">{{listeTerminate.length}} items</div>
                                    </div>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="(item, index) in listeTerminate">
                                        <div class="d-flex">
                                            <div class="mr-auto p-2">
                                                {{item.title}}
                                            </div>
                                            <div class="p-2">
                                                <a href="javascript:void(0)" @click="deleteItemsListeTerminate(index)">
                                                    <i class="fa fa-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="modal" id="modal-create" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form @submit="addToListeActive">
                        <div class="form-group">
                          <label for="title">Title</label>
                          <input type="text" class="form-control" id="title" v-model="form.title" placeholder="title">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Description</label>
                          <textarea row="5"  placeholder="Description" v-model="form.description" class="form-control"></textarea>
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelModal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
  data() {
    return {
        form:{
            title:'',
            description:'',
        },
      listeActive: [],
      listeTerminate: [],
      activeButtonCreate:true,
      activeButtonValidate :false,
      activeButtonCancel :false,
    }
  },
  created() {
   // this.getAllListeActive();
  },
  methods:{
    addToListeActive(e){
        if(this.form.title == ""){
            alert("merci de remplire title");
            e.preventDefault();
            return null;
        }
        axios.post
        this.listeActive.push({ title: this.form.title, description: this.form.description });
        this.activeButtonValidate =true;
        this.activeButtonCancel =true;
        this.cancelModal();
        e.preventDefault();
    },
    cancelModal(){
        this.form.title         = "";
        this.form.description   = "";
    },
    toListTerminated(index){
        let title       = this.listeActive[index].title
        let description = this.listeActive[index].description
        this.listeTerminate.push({ title: title, description: description });
        this.listeActive.splice(index,1);
    },
    deleteItemsListeActive(index){
        this.listeActive.splice(index,1);
    },
    deleteItemsListeTerminate(index){
        this.listeTerminate.splice(index,1);
    },
    getAllListeActive(){
        axios.get('/liste.php')
        .then(response => {
            response = JSON.stringify(response.data);
            console.log(response);
            // response.forEach((value) => {
            // this.listeTerminate.push({ title: value.title, description: value.$eventdescription });
            // });
        })
        .catch(error => {
            console.log(error)
        })
    },
    AddListeActive(){
        axios.post('/add.php',{todo:this.listeActive})
        .then(response => {
            response = JSON.stringify(response.data);
            console.log(response);
            // response.forEach((value) => {
            // this.listeTerminate.push({ title: value.title, description: value.$eventdescription });
            // });
        })
        .catch(error => {
            console.log(error)
        })
    }
  }
  
}
</script>
<style>


</style>
