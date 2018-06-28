<template>
  <main :class="{'editMode': isEditing && isDeleting}">
	<div id="sky" class="selectable" @dblclick="editBackground('sky')"></div>

	<widgetComponent v-for="(widget, key) in widgets" :key="key" :widget="widget" :isEditing="isEditing" @saveWorld="saveWidgets" class="selectable"/>

	<div id="board" class="selectable"></div>
	<div id="char" v-if="!isMine"></div>
	<div id="userChar" class="selectable"></div>
	<div id="ground" class="selectable" @dblclick="editBackground('ground')"></div>

	<div v-if="isMine && !isEditing" class="float-menu">	
    	<md-button @click="isEditing=true" class="md-raised md-primary">Entrar modo de Edição</md-button>
    	<md-button @click="shareWorld" @blur="sharedTooltip=false" class="md-raised md-primary">Compartilhar mundo</md-button>
    	<md-button @click="logout" class="md-raised md-primary">Logout</md-button>
		<md-tooltip :md-active="sharedTooltip" md-direction="bottom">Link copiado</md-tooltip>
	</div>
	<div v-if="isMine && isEditing" class="float-menu">
    	<md-button @click="saveWidgets(true)" class="md-raised md-primary">Entrar modo de Visualização</md-button>
		<md-button @click="addWidget" class="md-icon-button md-raised md-primary">
			<md-icon>add</md-icon>
			<md-tooltip :md-active="isEditing" md-direction="left">Adicionar Widget</md-tooltip>
		</md-button>
	</div>
	<div v-if="!isMine" class="float-menu">	
    	<md-button @click="reloadWorld" class="md-raised md-primary">Voltar para minha pagina</md-button>
	</div>

	<backgroundModal v-if="showBackgroundModal" class="front-view" @close="showBackgroundModal = false" :element="editingElement"/>
	<widgetModal v-if="showWidgetModal" class="front-view" @close="showWidgetModal = false" @widget="saveWidget"/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Character, Widget } from '@/assets/ts'
import BackgroundModal from '@/components/BackgroundModal.vue'
import WidgetModal from '@/components/WidgetModal.vue'
import WidgetComponent from '@/components/WidgetComponent.vue'
import { CONSTANTS } from '@/Constants'
import { Action, State } from 'vuex-class'
@Component({
	components: {
		BackgroundModal,
		WidgetModal,
		WidgetComponent,
	},
})
export default class World extends Vue {
	@State private user: any
	@Action private setUser: any
	@Action private setWorld: any
	private isEditing: boolean = false
	private isMine: boolean = true
	private sharedTooltip: boolean = false
	private isDeleting: boolean = false
	private showBackgroundModal: boolean = false
	private showWidgetModal: boolean = false
	private editingElement: HTMLDivElement
	private sky: HTMLDivElement
	private ground: HTMLDivElement
	private widgets: Widget[] = []

	private async created() {
		let world
		// If user not logged in
		if (!this.user || !this.user._id) {
			alert('Usuario não logado')
			this.$router.push('/')
		} else if (
			this.$route.params.userId &&
			this.$route.params.userId !== this.user._id
		) {
			try {
				this.isMine = false
				const response = await fetch(
					`${CONSTANTS.BACKEND_URL}/user/${this.$route.params.userId}`,
				)
				world = await response.json()
			} catch (e) {
				alert('Usuario não encontrado')
				this.$router.push('/')
			}
		} else {
			world = this.user.World
		}

		// Initialize world if exists
		if (world) {
			if (world.Widgets) {
				this.widgets = world.Widgets
			}
			if (world.Sky) {
				this.sky.style.background = world.Sky
			}
			if (world.Ground) {
				this.ground.style.background = world.Ground
			}
		}
	}

	private shareWorld() {
		this.sharedTooltip = true
		// @ts-ignore
		this.$copyText(`${document.URL}/${this.user._id}`)
	}

	private reloadWorld() {
		this.$router.push('/world')
		location.reload()
	}

	private logout() {
		localStorage.setItem('user', '')
		this.$router.push('/')
	}

	/** Prepare world when DOM is ready */
	private mounted() {
		this.sky = document.querySelector('#sky') as HTMLDivElement
		this.ground = document.querySelector('#ground') as HTMLDivElement
		const charDiv = document.querySelector('#userChar') as HTMLDivElement
		const char = new Character(charDiv, 100)
	}

	/** Save widgets on localStorage */
	private saveWidgets(stopEditing: boolean = false) {
		if (this.user) {
			const world = {
				Widgets: this.widgets,
				Sky: this.sky.style.background,
				Ground: this.ground.style.background,
			}
			this.setWorld(world)
		}
		if (stopEditing) {
			this.isEditing = false
		}
	}

	/** Show Modal to edit sky and ground background */
	private editBackground(element: string) {
		if (element === 'sky') {
			this.editingElement = this.sky
		} else if (element === 'ground') {
			this.editingElement = this.ground
		}
		this.showBackgroundModal = true
	}

	/** Show modal to add new widget */
	private addWidget() {
		if (this.isEditing === true) {
			this.showWidgetModal = true
		}
	}

	/** Get new widget from modal and add to list */
	private saveWidget(widget: Widget) {
		this.widgets.push(widget)
	}
}
</script>

<style scoped lang="scss">
main {
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;

	&.editMode .selectable:hover {
		opacity: 0.5;
		outline: #448aff solid 2px;
		cursor: pointer;
	}

	#sky {
		background: url('../assets/imgs/minecraft_sky.png');
		background-repeat: repeat-x;
		background-size: cover;
		flex-grow: 1;
	}

	#ground {
		width: 100%;
		height: 100px;
		background-image: url('../assets/imgs/minecraft_ground.jpg');
		background-repeat: repeat-x;
		background-size: contain;
	}

	#userChar,
	#char {
		height: 100px;
		width: 100px;
		position: absolute;
		bottom: 100px;
		left: 0px;
		background-image: url('../assets/imgs/bb8.gif');
		background-size: contain;
		transition: linear all 200ms;
	}

	#board {
		position: absolute;
		bottom: 100px;
		right: 100px;
		width: 100px;
		height: 100px;
		background-image: url('../assets/imgs/board.png');
		background-size: contain;
	}

	.widgets-container {
		position: absolute;
		height: calc(100% - 100px);
		width: 100%;
	}

	.float-menu {
		position: absolute;
		right: 50px;
		top: 50px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		z-index: 0;
	}

	.front-view {
		z-index: 1;
	}
}
</style>
