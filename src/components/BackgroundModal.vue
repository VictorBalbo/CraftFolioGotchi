<template>
	<transition name="modal-fade">
		<div class="modal-backdrop" @click="close">
			<div class="modal" @click="preventClose">
				<header>
					<h1>Configurar {{element.id === 'sky' ? 'Ceu' : 'Terra'}}</h1>
				</header>
				<section>
					<md-tabs md-alignment="centered" :md-active-tab="currentTab" @md-changed="changeTab">
						<md-tab id="color" md-label="Cor">
							<chrome-picker v-model="background" />
						</md-tab>
						<md-tab id="gradient" md-label="Gradient">
							<md-field>
								<label for="skyBackground">Estilo do gradiente</label>
								<md-input name="skyBackground" id="skyBackground" v-model="background" required/>
								 <span class="md-helper-text">Utilize o estilo do gradiente. Ex: linear-gradient(#e66465, #9198e5)</span>
							</md-field>
						</md-tab>
						<md-tab id="img" md-label="Imagem">
							<md-field>
								<label for="skyBackground">Url</label>
								<md-input name="skyBackground" id="skyBackground" v-model="background" required/>
							</md-field>
						</md-tab>
					</md-tabs>
				</section>
				<footer>
					<md-button class="md-primary" @click="close">Fechar</md-button>
					<md-button class="md-primary" @click="save">Salvar</md-button>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
// @ts-ignore
import { Chrome } from 'vue-color'
@Component({
	components: {
		'chrome-picker': Chrome,
	},
})
export default class BackgroundModal extends Vue {
	@Prop({type: HTMLDivElement})
	private element: HTMLDivElement

	private background: any = {}
	private currentTab: string = 'color'

	@Watch('background', { immediate: true, deep: true })
	private onBackgroundChange() {
		if (this.currentTab === 'color') {
			this.element.style.background = this.background.hex || ''
		} else if (this.currentTab === 'gradient') {
			this.element.style.background = this.background
		} else if (this.currentTab === 'img') {
			this.element.style.background = this.background
		}
	}

	private mounted() {
		this.background = this.element.style.background || ''
		if (this.background.includes('url(')) {
			this.currentTab = 'img'
		} else if (this.background.includes('-gradient(')) {
			this.currentTab = 'gradient'
		} else {
			this.currentTab = 'color'
		}
	}

	private close() {
		this.$emit('close')
	}
	private preventClose(event: Event) {
		event.stopPropagation()
	}
	private save() {
		this.$emit('close')
	}
	private changeTab(current: string) {
		if (this.currentTab !== current) {
			this.background = ''
		}
		this.currentTab = current
	}
}
</script>

<style scoped lang="scss">
.modal-fade-enter,
.modal-fade-leave-active {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.5s ease;
}
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #ffffff;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	width: 500px;
	max-width: 100%;
}

header,
footer {
	padding: 15px;
	display: flex;
}

header {
	border-bottom: 1px solid #eeeeee;
	justify-content: space-between;
}

footer {
	border-top: 1px solid #eeeeee;
	justify-content: flex-end;
}

section {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	border: none;
	font-size: 20px;
	padding: 20px;
	cursor: pointer;
	font-weight: bold;
	color: #4aae9b;
	background: transparent;
}

.btn-green {
	color: white;
	background: #4aae9b;
	border: 1px solid #4aae9b;
	border-radius: 2px;
}
.md-content {
	height: auto !important;
}

#color {
	display: flex;
	justify-content: center;
}
</style>
