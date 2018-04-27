import Rx from 'rxjs/Rx'
import { Widget } from '@/assets/ts/Widget'

export class Character {
	public element: HTMLDivElement;
	public x: number;
	public y: number;
	public size: number;
	public maxX = 0
	public stepSize = 80

	constructor(divElement: HTMLDivElement, size: number) {
		this.element = divElement
		this.size = size
		const position = (localStorage.getItem(this.element.id) || '0,100').split(',')
		this.setPosition(parseInt(position[0], 10), parseInt(position[1], 10))
		this.listenKeys()
	}

	private resizeWorld = () => {
		this.maxX = window.innerWidth - this.size
	}
	private listenKeys = () => {
		Rx.Observable.fromEvent(window, 'resize').subscribe(this.resizeWorld)
		this.resizeWorld()

		Rx.Observable.merge(
			Rx.Observable.fromEvent(document, 'keydown'),
			Rx.Observable.fromEvent(this.element, 'touchmove'),
		)
			.throttleTime(100)
			.subscribe((event: any) => {
				event.stopPropagation() // Prevent event bubbling
				const currentX = this.x
				if (event.type === 'touchmove') {
					this.x = event.touches[0].clientX - this.size / 2
				} else if (event.key === 'ArrowLeft' && currentX - this.stepSize >= 0) {
					this.x = currentX - this.stepSize
				} else if (
					event.key === 'ArrowRight' &&
					currentX + this.stepSize <= this.maxX
				) {
					this.x = currentX + this.stepSize
				}
				this.element.style.left = `${this.x}px`
				this.element.style.transform = `rotateY(${currentX >= this.x ? '0' : '180'}deg)`
				localStorage.setItem(this.element.id, `${this.x},${this.y}`)
			})

		Rx.Observable.merge(
			Rx.Observable.fromEvent(this.element, 'click'),
			Rx.Observable.fromEvent(this.element, 'touchstart'),
		)
			.throttleTime(500)
			.subscribe((event: any) => {
				event.stopPropagation() // Prevent event bubbling
				this.element.style.bottom = `200px`
				setTimeout(() => {
					this.element.style.bottom = `100px`
				}, 200)
			})
	}

	private setPosition = (x: number = this.x, y: number = this.y) => {
		this.x = x
		this.y = y
		this.element.style.left = `${this.x}px`
		this.element.style.bottom = `${this.y}px`
	}
}
