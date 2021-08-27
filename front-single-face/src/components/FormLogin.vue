<template>

  <!--Login-->
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
                  <p v-if="errors.length">
                    <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                    <ul class="alert alert-warning">
                      <li v-for="error in errors" :key="error.id">{{ error }}</li>
                    </ul>
                  </p>
            <form>
              <div class="form-floating mb-3">
                <input type="email"  class="form-control" v-model="user.email" id="floatingInput" placeholder="E-mail">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" v-model="user.password" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                <label class="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="button" @click="login ()">
                  Entrar
                </button>
              </div>
              <hr class="my-4">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- login-->
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: 'FormLogin',
  props: {
    msg: String
  },
  data() {
    return {
      errors: [],
      user: {
        id:'',
        email: '',  
        password: '',
      },
      //dadosUser: '',
      
    }
  },
  methods: {
      login (){

        if( this.checkValidate()){
          let parametros = { 
            email: this.user.email,
            password: this.user.password,          
          }
        UserDataService.getAuth(parametros)
          .then((result) =>{
            this.user = result.data  
            this.saveUser(this.user)         
            this.redirectRouter()         
          })
        }else{
          alert("inputs invalidos")
        }
       

      },
      redirectRouter (){
        if(this.user.id > 0){
          return this.$router.replace("/") 
        }else{
          alert("usuario ou senha inválidos")
        }
      },
      checkValidate(e){
        this.errors = [];
          
            if (!this.user.email) {
              this.errors.push('O email é obrigatório.');
            }
            if (!this.user.password) {
              this.errors.push(' O campo senha é obrigatório.');
            }
            if (!this.errors.length) {
              
              return true;
            }
            e.preventDefault();
        
      },
                 
      saveUser(user){
            let dadosUser = localStorage.getItem('dadosUserApp');
            dadosUser = user
            localStorage.setItem('dadosUserApp', JSON.stringify(dadosUser))
      },
      
  },
}
</script>