<template>
<!-- <h1>Datalhe de posts</h1> -->
<div class="d-flex col-md-12"> 
    <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
                  <img v-if="user.image" :src="'http://localhost:3000/'+ user.image" alt="user.image">
              </a>
              <h1>{{user.name}}</h1>
              <p>{{user.email}}</p>
          </div>

          <ul class="nav nav-pills nav-stacked">
              <li class="active col-md-12"><a href="/"> <i class="fa fa-user"></i> Perfil</a></li>
              <li class="col-md-12"><a href="/users"> <i class="fa fa-users"></i>comunidade<span class="label label-warning pull-right r-activity"></span></a></li>
              <li class="col-md-12"><a @click="logoutUser()"> <i class="fas fa-sign-out-alt"></i> sair</a></li>
          </ul>
      </div>
    </div>

    <div class="profile-info col-md-9">

        <div class="panel">
            <div class="bio-graph-heading">
                <h5>{{post.title}}</h5>
                
            </div>
            <div class="panel-body bio-graph-info" style="background-color:white">
                <h1 style="padding:10px">Conteúdo do Post</h1>
                <div class="row" style="padding:10px">
                    <div class="bio-row col-md-12">
                        <p> {{post.body}}</p>
                        <span>{{post.createdAt}}</span>
                        <span class="offset-7">
                            <button class="btn btn-sm btn-primary" @click.prevent="openForm()">Comentar</button>
                        </span>
                    </div>

                    <div class="col-md-12">
                        <div v-if="openInput">
                            <div class="col-md-12">
                                <div class="form-control">
                                    <label for="commentPost">Comentário</label>
                                    <input type="text" class="form-control input-lg" v-model="comment.description" 
                                    id="commentPost" placeholder="Que bacana!!!">
                                </div>
                                <div class="form-control">
                                    <button class="btn btn-sm btn-success" @click.prevent="addComment()">Add</button>
                                </div>
                            </div>
                        </div><br>
                        <div class="alert alert-info" >
                            <h6 class="text text-success">Comentários</h6><br>  
                                
                            <div v-for="comment in post.comments" :key="comment.id">
  
                                <div v-for=" u in users" :key="u.id">

                                    <div class="row alert alert-primary" v-if="u.id == comment.userId">
                                        <div class="user-heading round col-md-3">
                                            <div>
                                                <img v-if="user.image" :src="'http://localhost:3000/'+ u.image" alt="u.image" style="height:50px; border-radius:50%;">
                                            </div>
                                            <strong >{{u.name}}</strong>
                                        </div> 
                                        
                                        <div class="col-md-6">
                                            <p>{{comment.description}}  </p>
                                            <span>{{comment.createdAt}}</span>
                                        </div><hr>
                                    </div>                                    
                                </div>

                            </div>

                            
                        </div>

                    </div>

                </div>
            </div><br><br>
        </div>

    </div>      
</div>

</template>

<script>
import PostDataService from "../services/PostDataService";
import UserDataService from "../services/UserDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: 'DetailPost',
    data() {
        return {
            users:[],
            post:{
                id:null,
                title:'',
                body:'',
            },            
            user:'',
            openInput:false,
            comment:{
                description:'',
                postId:'',
                userId:'',
            }
        };
    },
    methods: {
        getPostById(id) {
            PostDataService.get(id)
            .then(response => {
                this.post = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        getAllUser() {
            UserDataService.getAll()
            .then(response => {
                this.users = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        openForm(){
            if (this.openInput == true)
                this.openInput=false;
            else
                this.openInput=true;
        },

        getUserLogado(){
            this.user = localStorage.getItem('dadosUserApp');
            this.user = JSON.parse(this.user)
        },

        addComment(){
            var parametros = {
                description: this.comment.description,
                postId: this.post.id,
                userId: this.user.id,

            };

            CommentDataService.create(parametros)
                .then(response => {
                    this.post = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    },
            
        mounted() {
            this.message = '';
            this.getPostById(this.$route.params.id);
            this.getUserLogado();
            this.getAllUser();
        
        }
}
</script>
