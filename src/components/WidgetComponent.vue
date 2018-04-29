<template>
  	<md-card class="widget">
	  	<div v-if="widget.type==='textbox'" class="content">
			<md-field v-if="isEditing">
				<label>Conteudo</label>
				<md-textarea v-model="widget.content"></md-textarea>
			</md-field>
			<span v-else>{{widget.content}}</span>
	  	</div>
		<div v-else-if="widget.type==='gallery'" class="content">
			<md-field v-if="isEditing">
				<md-chips class="md-primary" v-model="widget.content" md-placeholder="Adicionar imagens" :md-format="validUrl">
					<label>Urls</label>
				</md-chips>
			</md-field>
			<div v-else class="slider">
				<div class="arrow" @click="slide(-1)">
					<md-icon class="md-size-2x">keyboard_arrow_left</md-icon>
				</div>
				<md-card-media-cover>
					<md-card-media>
						<img :src="widget.content[currentImage]" alt="Skyscraper">
					</md-card-media>
				</md-card-media-cover>
				<div class="arrow" @click="slide(1)">
					<md-icon class="md-size-2x">keyboard_arrow_right</md-icon>
				</div>
			</div>
	  	</div>
  	</md-card>
</template>

<script lang="ts">
import { Widget } from '@/assets/ts'
import { Component, Prop, Vue } from 'vue-property-decorator'
import interact from 'interactjs'

@Component
export default class WidgetComponent extends Vue {
	@Prop({ type: Object })
	private widget: Widget
	@Prop({ type: Boolean })
	private isEditing: boolean

	private element: HTMLDivElement
	private currentImage: number = 0

	private mounted() {
		this.element = this.$el as HTMLDivElement
		this.element.style.left = `${this.widget.x}px`
		this.element.style.top = `${this.widget.y}px`
		this.element.dataset.x = `${this.widget.x}`
		this.element.dataset.y = `${this.widget.y}`
		this.startDragListener()
	}

	private startDragListener() {
		// target elements with the "draggable" class
		interact(this.element).draggable({
			// enable inertial throwing
			inertia: true,
			// keep the element within the area of it's parent
			restrict: {
				restriction: 'parent',
				endOnly: true,
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
			},
			// enable autoScroll
			autoScroll: true,

			// call this function on every dragmove event
			onmove: (event: any) => {
				const target = event.target
				// keep the dragged position in the data-x/data-y attributes
				const x = (parseFloat(target.dataset.x) || 0) + event.dx
				const y = (parseFloat(target.dataset.y) || 0) + event.dy
				this.setPosition(x, y)
			},
			// call this function on every dragend event
			onend: (event) => {
				const textEl = event.target.querySelector('p')

				return (
					textEl &&
					(textEl.textContent =
						'moved a distance of ' +
						Math.sqrt(
							Math.pow(event.pageX - event.x0, 2) +
								Math.pow(event.pageY - event.y0, 2) || 0,
						).toFixed(2) +
						'px')
				)
			},
		})

		// this is used later in the resizing and gesture demos
		// window.dragMoveListener = dragMoveListener;
	}
	private setPosition(x: number, y: number) {
		this.widget.x = x
		this.widget.y = y
		// translate the element
		this.element.style.left = `${x}px`
		this.element.style.top = `${y}px`

		// update the posiion attributes
		this.element.dataset.x = `${x}`
		this.element.dataset.y = `${y}`
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

	private slide(i: number) {
		this.currentImage += i
		if (this.currentImage >= this.widget.content.length) {
			this.currentImage = 0
		} else if (this.currentImage < 0) {
			this.currentImage = this.widget.content.length - 1
		}
	}
}
</script>
<style lang="scss" scoped>
$maxSize: 320px;
$minSize: 60px;
.widget {
	max-width: $maxSize;
	max-height: $maxSize;
	min-width: $minSize;
	width: auto;
	height: auto;
	padding: 5px;
	position: absolute;
}
.content {
	width: 100%;
	height: 100%;
	display: flex;
}
.content .md-field {
	margin: auto;
}
.content span {
	width: auto;
	height: auto;
	margin: auto;
}
.slider, .arrow {
	display: flex;
}
</style>
<style lang="scss">
.md-chip {
	overflow: hidden;
}
.md-ripple {
	text-overflow: ellipsis;
}
</style>