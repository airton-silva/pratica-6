<template>
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
        <div class="bio-graph-heading row">
            <div class="col-md-3">
                <img :src="'http://localhost:3000/'+profileUser.image" alt="usr.image" style="height:50px; border-radius:50%;">
            </div>
            <div class="col-md-8">
                <h4>{{profileUser.name}}</h4>
                <span><strong>Email: </strong>{{profileUser.email}}</span>
                <span class="offset-1"><strong>Profissão:</strong> {{profileUser.occupation}}</span>

            </div>
        </div>


        <div><br>
            <div class="row">
                <div class="col-6 " v-for="post in profileUser.posts" :key="post.id">
                    <div class="card">
                        <div class="card-body" style="background-color:white">
                            <div class="bio-chart" >
                                <div style="display:inline;width:100px;height:100px;"><canvas width="100" height="100px"></canvas><input class="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="35" data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(224, 107, 125); padding: 0px; -webkit-appearance: none; background: none;"></div>
                            </div>
                            <div class="bio-desk">
                                <h4 class="red">{{post.title}}</h4>
                                <p>{{post.body}}</p>
                                <p>Data de postagem: {{post.createdAt}}</p>
                            </div>
                            <router-link :to="'/detail-post/' + post.id" class="link link-outline-info">Detalhes</router-link>
                        </div>

                    </div>
                </div>
 
            </div>
        </div>

        </div>

    </div>      
</div>
          

</template>

<script>
import PostDataService from "../services/PostDataService";
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      inputUpload: false,  
      posts: [],
      title: "",
      user:"",
      profileUser:'',
      post:{
          title:"",
          body:"",
          image:"",
          userId:null,
      }
    };
  },

  created(){
      //this.getAllPosts();
      this.getUserLogado()
      this.getUserById(this.$route.params.id);
  },

  methods: {

    openUpload() {
        this.inputUpload = true;
    },  

    // getAllPosts() {
    //   PostDataService.getAll()
    //     .then(response => {
    //       this.posts = response.data;
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },

    addPost() {
        var parametros = {
            title: this.post.title,
            body: this.post.body,                
            userId: this.user.id,
            // image: this.post.image
        };

        PostDataService.create(parametros)
            .then(response => {
                this.post = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    },

    getUserLogado(){
        this.user = localStorage.getItem('dadosUserApp');
        this.user = JSON.parse(this.user)
    },

    logoutUser(){
        localStorage.removeItem('dadosUserApp');
        this.user.email = '';
        this.user.name = '';
        this.user.id = null
        return this.$router.replace("/auth") 
    },

    getUserById(id) {
        UserDataService.get(id)
        .then(response => {
            this.profileUser = response.data;
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    },

  },

    // mounted() {
    //     this.message = '';
    //     this.getUserById(this.$route.params.id);
    // }
}
</script>
