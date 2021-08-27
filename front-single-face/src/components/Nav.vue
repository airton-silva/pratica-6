<template>
  <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="">
              </a>
              <h1>Camila Smith</h1>
              <p>deydey@theEmail.com</p>
          </div>

          <ul class="nav nav-pills nav-stacked">
              <li class="active col-md-12"><a href="#"> <i class="fa fa-user"></i> Profile</a></li>
              <li class="col-md-12"><a href="#"> <i class="fa fa-calendar"></i> Recent Activity <span class="label label-warning pull-right r-activity">9</span></a></li>
              <li class="col-md-12"><a href="#"> <i class="fa fa-edit"></i> Edit profile</a></li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    msg: String
  },
}
</script>