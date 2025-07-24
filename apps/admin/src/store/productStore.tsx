
import { deleteProfileImage } from '@/actions/storage.action'
import { createProduct, ProductInfo, ProductRecord, ProductVariant, wait } from '@rcffuta/ict-lib'
import { makeAutoObservable, toJS } from 'mobx'
import toast from 'react-hot-toast'

// "https://res.cloudinary.com/con-so-nant/image/upload/v1752769553/rW/images/mkyfylugetjeofamjdhq.png"


async function updateProductInfo(id: string, product: Partial<ProductInfo>) {
	await wait(2)

	return {
		success: false,
		message: 'Product Update not available',
		data: null
	}
}


class ProductStore {
	// Basic product info
	private id = "";
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

	removeVariant = async (index: number) => {
		const variant = this.variants.at(index);

		if (!variant) return;

		try {
			await deleteProfileImage(variant.image);
		} catch(err) {
			console.error("Error", err);

			toast.error("Could not delete variant image");
			return;
		}
		this.variants.splice(index, 1)
		toast.success('Removed variant')
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

		let resp;

		if (this.id) {
			resp = updateProductInfo(this.id, data);
		} else {
			resp = createProduct(data);
		}

		const {
			success,
			message,
			data: prod
		} = await resp;


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

	populateProductInfo(info: ProductRecord) {
		this.name = info.name;
		this.description = info.description || "";
		this.price = info.price.toString();
		this.variants = info.variants;

		this.id = info.id;
	}



}

const productStore = new ProductStore()
export default productStore