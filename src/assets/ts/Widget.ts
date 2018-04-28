export interface Widget {
	id?: string
	element?: HTMLDivElement
	x?: number
	y?: number
	size?: number
	draggable?: boolean
	type?: string
	content?: any
}
