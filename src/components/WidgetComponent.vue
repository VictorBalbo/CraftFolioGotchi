<template>
  <div class="widget" @click="preventBubbling">

  </div>
</template>

<script lang="ts">
import { WidgetListener } from '@/assets/ts/WidgetMove'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class WidgetComponent extends Vue {
	@Prop({ type: Number, default: 0 })
	private x: number
	@Prop({ type: Number, default: 0 })
	private y: number
	@Prop({ type: Number })
	private size: number
	@Prop({ type: Boolean })
	private draggable: boolean
	@Prop({ type: String })
	private type: string
	@Prop() private content: {}

	private element: HTMLDivElement

	private mounted() {
		this.element = this.$el as HTMLDivElement
		this.element.style.left = `${this.x}px`
		this.element.style.top = `${this.y}px`
		WidgetListener(this.element)
	}

	private savePosition = () => {
		localStorage.setItem(this.element.id, `${this.x},${this.y}`)
	}

	private preventBubbling(event: Event) {
		event.stopPropagation()
	}
}
</script>
<style lang="scss" scoped>
	.widget {
		width: 100px;
		height: 100px;
		background-color: brown;
		position: absolute;
	}
</style>
