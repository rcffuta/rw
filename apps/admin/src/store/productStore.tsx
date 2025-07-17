import { makeAutoObservable } from 'mobx'
class ProductStore {
	// Product Details
	imageUrl = ''
	name = ''
	// category = ''
	description = ''
	price = ''
	// discountPrice = ''

	// Games Product Details
	variantColor = ''
	variantSize = ''
	variatntStock = 0


	constructor() {
		makeAutoObservable(this)
	}

	private reset() {
		this.imageUrl = ''
		this.name = ''
		this.description = ''
		this.price = ''
		

		// Product Variant Details
		this.variantColor = ''
		this.variantSize = ''
		this.variatntStock = 0

	}

	setField(key: string, value: string) {
		// @ts-ignore
		this[key] = value
	}

}

const productStore = new ProductStore()
export default productStore
