<template>
  	<md-card class="widget" @click="preventBubbling">
	  	<div v-if="widget.type==='textbox'" class="content">
			<md-field v-if="isEditing">
				<label>Conteudo</label>
				<md-textarea v-model="widget.content"></md-textarea>
			</md-field>
			<span v-else>{{widget.content}}</span>
	  	</div>
  	</md-card>
</template>

<script lang="ts">
import { Widget, WidgetListener } from '@/assets/ts'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class WidgetComponent extends Vue {
	@Prop({ type: Object })
	private widget: Widget

	@Prop({ type: Boolean })
	private isEditing: boolean

	private element: HTMLDivElement

	private mounted() {
		this.element = this.$el as HTMLDivElement
		this.element.style.left = `${this.widget.x}px`
		this.element.style.top = `${this.widget.y}px`
		WidgetListener(this.element)
	}

	private savePosition = () => {
		localStorage.setItem(this.element.id, `${this.widget.x},${this.widget.y}`)
	}

	private preventBubbling(event: Event) {
		event.stopPropagation()
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
	width: 90%;
	height: 90%;
	margin: auto;
}
.content span {
	width: auto;
	height: auto;
	margin: auto;
}
</style>
