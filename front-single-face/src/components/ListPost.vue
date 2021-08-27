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
            <form>
                <div class="form-control">
                    <input type="text" class="form-control input-lg" v-model="post.title" placeholder="Titulo do post">
                </div>
                <div class="form-control">
                    <textarea rows="2" class="form-control input-lg p-text-area" v-model="post.body" placeholder="assunto de hoje">
                    </textarea>
                
                </div>
                <div class="form-group" v-if="inputUpload">
                    <label for="exampleFormControlFile1">Upload de Imagem</label>
                    <input type="file" ref="image" class="form-control-file" name="image">
                </div>
                
            </form>
            <footer class="panel-footer" style="height:50px">
                

                    <!-- <div class="col"> -->
                        <ul class="nav nav-pills col-md-10" style="padding:12px">
                            <li class="offset-1">
                                <a href="#"><i class="fa fa-map-marker"></i></a>
                            </li>
                            <li class="offset-1">
                                <a href="" @click.prevent="openUpload()" ><i class="fa fa-camera"></i></a>
                            </li>
                            <li class="offset-1">
                                <a href="#"><i class=" fa fa-film"></i></a>
                            </li>
                            <li class="offset-1">
                                <a href="#"><i class="fa fa-microphone"></i></a>
                            </li>

                            <li class="offset-6">
                                <a class="btn btn-sm btn-warning" @click.prevent="addPost()">Postar</a>
                            </li>
                        </ul>
                    <!-- </div> -->

            </footer><br><br>

        </div>
        <div class="panel">
            <div class="bio-graph-heading">
                Na vida na fica tudo passa, tudo vai ,tudo vem mas o certo é que o importante é viver de forma que desejá...
            </div>
            <div class="panel-body bio-graph-info" style="background-color:white">
                <h1 style="padding:10px">Biografia</h1>
                <div class="row" style="padding:10px">
                    <div class="bio-row">
                        <p><span>Nome </span>: {{user.name}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Nacionalidade </span>: {{user.country}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Data de Nascimento</span>: {{user.birthday}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Profissão </span>: {{user.occupation}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Email </span>: {{user.email}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Celular </span>: {{user.fone}}</p>
                    </div>
                    <div class="bio-row">
                        <p><span>Phone </span>: 88 (02) 123456</p>
                    </div>
                </div>
            </div><br><br>
        </div>
        <div>
            <div class="row">
                <div class="col-6 " v-for="post in posts" :key="post.id">
                    <div class="card" v-if="post.userId==user.id">
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
          

</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  data() {
    return {
      inputUpload: false,  
      posts: [],
      title: "",
      user:"",
      post:{
          title:"",
          body:"",
          image:"",
          userId:null,
      }
    };
  },

  created(){
      this.getAllPosts();
      this.getUserLogado()
  },

  methods: {

    openUpload() {
        this.inputUpload = true;
    },  

    getAllPosts() {
      PostDataService.getAll()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getByQty() {
        //alert(this.selected)
        PostDataService.getByQty(this.selected)
           .then(response => {
            this.posts = response.data;
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });

     },

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
    }

  }
}
</script>
