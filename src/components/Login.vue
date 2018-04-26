<template>
  <main>
    <md-card>
      <md-card-header>
        <h1 class="md-title">CraftFolioGotchi</h1>
      </md-card-header>

      <md-card-content>
        <p>Bem vindo ao CraftFolioGotchi!</p>
        <p>Este é um trabalho da disciplina de Programação Web do Cefet-MG</p>
        <p>O trabalho foi feito pelos alunos <b>Lucas Viana</b> e <b>Victor Balbo</b></p>
        <form action="/world">
          <md-field>
            <label for="login">Login</label>
            <md-input name="login" id="login" v-model="login" required/>
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input name="password" id="password" type="password" v-model="password" required/>
          </md-field>
          <md-button class="md-raised md-primary" type="submit">Logar</md-button>
          <p>Ainda não tem um Login? <a href="/signUp">Cadastre-se</a></p>
        </form>
      </md-card-content>
    </md-card>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Login extends Vue {
	private login: string = ''
	private password: string = ''
}
</script>

<style scoped lang="scss">
main {
	display: flex;
	align-items: center;
	height: 100%;
	background-image: url('https://i.imgur.com/R0Zj6Rs.jpg');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	.md-card {
		width: 700px;
		margin: 0 auto;

		.md-card-header {
			text-align: center;
		}
		.md-card-content {
			padding: 30px;
		}
		form {
			max-width: 300px;
			margin: auto;
		}
		.md-button {
			width: 100%;
			margin: 0;
		}
	}
}
</style>
