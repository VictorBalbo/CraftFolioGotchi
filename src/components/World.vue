<template>
  <main id="widget-container" :class="{'editMode': mode === 'edit'}">
	<div id="sky" class="selectable" @click="edit('sky')"></div>
	
	<div v-if="mode === 'view'" class="float-menu">	
    	<md-button @click="mode='edit'" class="md-raised md-primary">Entrar modo de Edição</md-button>
	</div>
	<div v-if="mode === 'edit'" class="float-menu">
    	<md-button @click="mode='view'" class="md-raised md-primary">Entrar modo de Visualização</md-button>
		<md-button class="md-icon-button md-raised md-primary">
			<md-icon>add</md-icon>
			<md-tooltip md-direction="left">Adicionar Widget</md-tooltip>
		</md-button>
	</div>

	<div id="char" class="selectable"></div>
	<div id="board" class="selectable"></div>
	<div id="ground" class="selectable" @click="edit('ground')"></div>

	<backgroundModal v-if="showBackgroundModal" class="front-view" @close="showBackgroundModal = false" @background="changeBackground" :element="editingElement"/>
	<widgetModal v-if="showWidgetModal" class="front-view" @close="showWidgetModal = false" @background="changeBackground" :element="editingElement"/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Character, Widget } from '@/assets/ts'
import BackgroundModal from '@/components/BackgroundModal.vue'
import WidgetModal from '@/components/WidgetModal.vue'
@Component({
	components: {
		BackgroundModal,
		WidgetModal,
	},
})
export default class World extends Vue {
	private mode: string = 'view'
	private showBackgroundModal: boolean = false
	private showWidgetModal: boolean = false
	private editingElement: string = ''
	private sky: HTMLDivElement
	private ground: HTMLDivElement
	private container: HTMLDivElement
	private mounted() {
		this.sky = document.querySelector('#sky') as HTMLDivElement
		this.ground = document.querySelector('#ground') as HTMLDivElement
		this.container = document.querySelector('#widget-container') as HTMLDivElement
		const charDiv = document.querySelector('#char') as HTMLDivElement
		const char = new Character(charDiv, 100)
		this.initWidgets()
	}
	private initWidgets() {
		const widgetsObj = JSON.parse(localStorage.getItem('widgets') || '{ "widgets": [] }')
		widgetsObj.widgets.forEach((widgetObj: any) => {
			const element = document.createElement('div')
			element.setAttribute('id', widgetObj.id)
			this.container.appendChild(element)
			const widget = new Widget(element, widgetObj.size, true, widgetObj.x, widgetObj.y)
		});
	}
	private edit(element: string) {
		if (this.mode === 'edit') {
			this.editingElement = element
			this.showBackgroundModal = true
		}
	}
	private changeBackground(element: string, background: string) {
		if (element === 'sky') {
			this.sky.style.background = background
		} else if (element === 'ground') {
			this.ground.style.background = background
		}
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

	#char {
		height: 100px;
		width: 100px;
		position: absolute;
		bottom: 100px;
		left: 0px;
		/* background-image: url('http://www.pngmart.com/files/4/Android-PNG-HD.png'); */
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

	.widget {
		height: 80px;
		width: 80px;
		background-color: aquamarine;
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
	
	.front-view{
		z-index: 1;
	}
}
</style>
