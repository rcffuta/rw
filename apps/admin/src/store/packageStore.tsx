
import { Option } from '@/types/form.types'
import { createPackage, getProducts, MerchPackage, MerchPackageRecord, PackageItem, updatePackage } from '@rcffuta/ict-lib'
import { makeAutoObservable, toJS } from 'mobx'
import toast, { ToastOptions } from 'react-hot-toast'

// "https://res.cloudinary.com/con-so-nant/image/upload/v1752769553/rW/images/mkyfylugetjeofamjdhq.png"


// async function updatePackage(id:string, data: Partial<MerchPackage>) {
// 	return {
// 		success: false,
// 		message: "Package Update Not Implemented",
// 		data: null,
// 	}
// }

class PackageStore {
	// Basic product info
	image = ''
	name = ''
	description = ''
	totalPrice = ''
	_items: PackageItem[] = []

	private id = ''

	options: Option[] = [
		{
			text: '-- Select Item --',
			value: '',
			data: {
				name: '-- Select Item --',
				price: 0,
				productId: '-12',
				quantity: 0
			}
		}
	]

	loading = false

	constructor() {
		makeAutoObservable(this)
		this.loadProductOptions()
	}

	set items(data: PackageItem[]) {
		this._items = data
	}

	get items(): PackageItem[] {
		return this._items
	}

	// Actions
	setField = <K extends keyof this>(key: K, value: this[K]) => {
		this[key] = value
	}

	private async loadProductOptions() {
		const toastConfig: ToastOptions = {
			id: 'toastIdForLoadingProduct',
			duration: 5000
		}

		if (this.loading) return

		this.loading = true

		toast.loading('Loading packages...', { ...toastConfig, duration: 0 })
		const { message, success, data } = await getProducts()

		if (!success) {
			toast.error(`Could not load package: ${message}`, toastConfig)
		} else {
			toast.success('Loaded package', toastConfig)
			this.options = data.map((each) => ({
				text: each.name,
				value: each.id,
				data: {
					name: each.name,
					price: each.price,
					productId: each.id,
					quantity: 0
				}
			}))
		}

		this.loading = false
	}

	addItem = (item: PackageItem) => {
		let updated = false

		const dt = [...toJS(this.items)]

		dt.map((each) => {
			if (each.productId === item.productId) {
				updated = true
				return item
			}

			return each
		})

		if (!updated) {
			dt.push(item)
		}

		this.items = dt
	}

	removeItem = (index: number) => {
		this._items.splice(index, 1);
	}

	updateVariantStock = (index: number, value: string) => {
		const stock = parseInt(value) || 0
		// if (!isNaN(stock)) {
		// 	this.variants[index].stock = stock
		// }
	}

	async savePackage() {
		const data = this.packageInfo

		// console.debug("Saving,", data);

		// await wait(5);

		

		let resp;
		
		if (this.id) {
			resp = updatePackage(this.id, data);
		} else {
			resp = createPackage(data);
		}


		const { success, message, data: prod } = await resp;


		if (!success) {
			throw new Error(message)
		}

		this.reset()

		return prod
	}

	reset = () => {
		this.name = ''
		this.description = ''
		this.totalPrice = ''
		this.items = []
		this.image = ''
	}

	// Computed values
	get packageInfo(): MerchPackage {
		return {
			image: this.image,
			name: this.name,
			description: this.description,
			totalPrice: parseFloat(this.totalPrice) || 0,
			items: toJS(this.items),
			isActive: true
		}
	}

	populatePpkgInfo(info: MerchPackageRecord) {
			this.image = info.image;
			this.name = info.name;
			this.description = info.description || "";
			this.totalPrice = info.totalPrice.toString();
			this.items = info.items;
	
			this.id = info.id;
		}
	
}

const packageStore = new PackageStore()
export default packageStore