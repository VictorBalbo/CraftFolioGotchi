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
				<md-field>
					<label for="login">Login</label>
					<md-input name="login" id="login" v-model="login" required/>
				</md-field>
				<md-field>
					<label for="password">Password</label>
					<md-input name="password" id="password" type="password" v-model="password" required/>
				</md-field>
				<md-button class="md-raised md-primary" @click="loginUser">Logar</md-button>
				<p>Ainda não tem um Login? <a href="/#/signUp">Cadastre-se</a></p>
      </md-card-content>
    </md-card>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CONSTANTS } from '@/Constants'
import { Action } from 'vuex-class'

@Component
export default class Login extends Vue {
	@Action private setUser: any
	private login: string = ''
	private password: string = ''

	public async loginUser() {
		const data = { Login: this.login, Password: btoa(this.password) }
		const response = await fetch(`${CONSTANTS.BACKEND_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const userData = await response.json()
		if (userData) {
			this.setUser(userData)
			this.$router.push('world')
		} else {
			alert('Usuario não encontrado')
		}
	}
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
