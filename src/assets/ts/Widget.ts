import { WidgetListener } from '@/assets/ts/WidgetMove'

export class Widget {
	protected element: HTMLDivElement
	protected x: number = 0
	protected y: number = 0
	protected size: number
	protected draggable: boolean

	constructor(element: HTMLDivElement, size: number, draggable: boolean = false, x: number = 0, y: number = 0) {
		this.element = element
		this.size = size
		this.draggable = draggable
		this.setPosition(x, y)
	}

	protected setPosition = (x: number = this.x, y: number = this.y) => {
		this.x = x
		this.y = y
		this.element.style.left = `${this.x}px`
		this.element.style.bottom = `${this.y}px`
	}

	protected savePosition = () => {
		localStorage.setItem(this.element.id, `${this.x},${this.y}`)
	}
}
