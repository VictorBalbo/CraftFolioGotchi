<template>
	<transition name="modal-fade">
		<div class="modal-backdrop" @click="close">
			<div class="modal" @click="preventClose">
				<header>
					<h1>{{element ? 'Editar' : 'Adicionar'}} Widget</h1>
				</header>
				<section>
					<md-tabs md-alignment="centered" :md-active-tab="currentTab" @md-changed="changeTab">
						<md-tab id="gallery" md-label="Galeria de Imagens">
							<md-chips class="md-primary" v-model="urls" md-placeholder="Adicionar imagens" :md-format="validUrl">
								<label>Urls</label>
							</md-chips>
						</md-tab>
						<md-tab id="textBox" md-label="Caixa de Texto">
							<md-field>
								<label for="textBoxInput">Texto</label>
								<md-input name="textBoxInput" id="textBoxInput" v-model="text" required/>
							</md-field>
						</md-tab>
						<md-tab id="audio" md-label="Audio">
							<md-field>
								<label for="audioSrc">Src</label>
								<md-input name="audioSrc" id="audioSrc" v-model="audio" type="url" required/>
							</md-field>
						</md-tab>
						<md-tab id="video" md-label="Video">
							<md-field>
								<label for="videoSrc">Src</label>
								<md-input name="videoSrc" id="videoSrc" v-model="video" type="url" required/>
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Widget } from '@/assets/ts'
@Component
export default class WidgetModal extends Vue {
	@Prop({ type: HTMLDivElement })
	private element: HTMLDivElement

	private urls: string[] = []
	private text: string = ''
	private audio: string = ''
	private video: string = ''
	private currentTab: string = 'gallery'
	private close() {
		this.$emit('close')
	}
	private preventClose(event: Event) {
		event.stopPropagation()
	}
	private save() {
		const widget: Widget = {
			x: 0,
			y: 0,
			size: 100,
		}
		switch (this.currentTab) {
			case 'gallery':
				widget.type = 'gallery'
				widget.content = this.urls
				break
			case 'textBox':
				widget.type = 'textbox'
				widget.content = this.text
				break
			case 'audio':
				widget.type = 'audio'
				widget.content = this.audio
				break
			case 'video':
				widget.type = 'video'
				widget.content = this.video
				break
		}
		this.$emit('widget', widget)
		this.$emit('close')
	}
	private changeTab(current: string) {
		this.currentTab = current
	}
	private validUrl(url: string) {
		if (!url.startsWith('http')) {
			url = `http://${url}`
		}
		try {
			const value = new URL(url)
			return url
		} catch (_) {
			return false
		}
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
</style>
