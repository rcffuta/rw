
import { createProduct, ProductInfo, ProductVariant } from '@rcffuta/ict-lib'
import { makeAutoObservable, toJS } from 'mobx'

// "https://res.cloudinary.com/con-so-nant/image/upload/v1752769553/rW/images/mkyfylugetjeofamjdhq.png"

class ProductStore {
	// Basic product info
	name = ''
	description = ''
	price = ''
	_variants: ProductVariant[] = []

	constructor() {
		makeAutoObservable(this)
	}


	set variants(data: ProductVariant[]) {
		this._variants = data;
	}

	get variants(): ProductVariant[] {
		return this._variants;
	}

	// Actions
	setField = <K extends keyof this>(key: K, value: this[K]) => {
		this[key] = value
	}

	addVariant = (variant: ProductVariant) => {
		
		let updated = false;

		const dt = [...toJS(this.variants)];


		dt.map((each)=>{
			if (each.color === variant.color) {
				updated = true;
				return variant;
			}

			return each;
		});

		if (!updated) {
			dt.push(variant);
		}

		this.variants = dt;
	}

	removeVariant = (index: number) => {
		this.variants.splice(index, 1)
	}

	updateVariantStock = (index: number, value: string) => {
		const stock = parseInt(value) || 0
		// if (!isNaN(stock)) {
		// 	this.variants[index].stock = stock
		// }
	}


	async saveProduct() {
		const data = this.productInfo;

		// console.debug("Saving,", data);


		// await wait(5);

		const {
			success,
			message,
			data: prod
		} = await createProduct(data);


		if (!success) {
			throw new Error(message);
		}


		this.reset();

		return prod;
	}



	get isVariantRequired() {
		return (this.name.length >= 1) && (this.variants.length < 1)
	}

	reset = () => {
		this.name = ''
		this.description = ''
		this.price = ''
		this.variants = []
	}

	// Computed values
	get productInfo(): ProductInfo {
		return {
			// images: this.images,
			name: this.name,
			description: this.description,
			price: parseFloat(this.price) || 0,
			variants: toJS(this.variants)
		}
	}

}

const productStore = new ProductStore()
export default productStore