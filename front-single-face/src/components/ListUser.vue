<template>
<div class="d-flex col-md-12">
    <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
                  <img v-if="user.image" :src="'http://localhost:3000'+ user.image" alt="user.image">
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
        <div>
            <div class="row">
                <div class="col-6 " v-for="usr in users" :key="usr.id">
                    <div class="card">
                        <div class="card-body" style="background-color:white">
                            <div class="bio-chart" >
                               <div>
                                   <img :src="'http://localhost:3000/'+usr.image" alt="usr.image" style="height:50px; border-radius:50%;">
                               </div>
                            </div>
                            <div class="bio-desk">
                                <h4 class="red">{{usr.name}}</h4>
                                <p>{{usr.email}}</p>
                                <p>Data de Nascimento: {{usr.birthday}}</p>
                            </div>
                            <router-link :to="'/fanpage/' + usr.id" class="link link-outline-info">Detalhes</router-link>
                        </div>

                    </div>
                </div>
 
            </div>
        </div>
    </div>      
</div>
          

</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      users:[],
      user:"",

    };
  },

  created(){
      this.getAllUser();
      this.getUserLogado()
  },

  methods: {

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
