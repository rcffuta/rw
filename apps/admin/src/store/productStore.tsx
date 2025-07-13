import {
	saveBook,
	saveGame,
	saveGiftCard,
	saveProduct as saveAProduct
} from '@/actions/form.action'
import { makeAutoObservable } from 'mobx'

class ProductStore {
	// Product Details
	imageUrl = ''
	title = ''
	category = ''
	description = ''
	price = ''
	discountPrice = ''

	// Games Product Details
	platform = ''
	genre = ''
	releaseDate = ''

	// Book Product Details
	author = ''
	bookGenre = ''
	language = ''
	isbn = ''
	pages = ''

	// Giftcard product details
	code = ''
	number = ''
	date = ''

	constructor() {
		makeAutoObservable(this)
	}

	private reset() {
		this.imageUrl = ''
		this.title = ''
		this.category = ''
		this.description = ''
		this.price = ''
		this.discountPrice = ''

		// Games Product Details
		this.platform = ''
		this.genre = ''
		this.releaseDate = ''

		// Book Product Details
		this.author = ''
		this.bookGenre = ''
		this.language = ''
		this.isbn = ''
		this.pages = ''

		// Giftcard product details
		this.code = ''
		this.number = ''
		this.date = ''
	}

	async saveProduct(deliverable: string) {
		const data: any = {
			title: this.title,
			description: this.description,
			categoryId: parseInt(this.category),
			price: parseFloat(this.price),
			discountedPrice: this.discountPrice ? parseFloat(this.discountPrice) : 0,
			images: this.imageUrl ? [this.imageUrl] : [],
			deliverable
		}

		let product

		try {
			product = await saveAProduct(data)
			// toast.success("Product saved!", { id: toastId });
		} catch (err) {
			console.error('Failed to create product:', err)
			// alert("Error creating product");
			// toast.error("Product could not save!", { id: toastId });
			throw new Error('Product could not save!')
		}

		return product
	}

	async saveGameProduct(productId: number) {
		const data: any = {
			platform: this.platform,
			genre: this.genre,
			releaseDate: this.releaseDate ? new Date(this.releaseDate) : new Date(),
			productId
		}

		try {
			await saveGame(data)
			// toast.success("Product saved!", { id: toastId });

			// setTimeout(() => {
			//     if (!props.redirect) return;

			//     navigate(props.redirect);
			// }, 1500);
		} catch (err) {
			console.error('Failed to create game:', err)
			// alert("Error creating product");
			// toast.error("Product could not save!", { id: toastId });
			throw new Error('Game could not save!')
		}
		this.reset()
		return true
	}

	async saveBookProduct(productId: number) {
		const data: any = {
			genre: this.bookGenre,
			productId,
			author: this.author,
			isbn: this.isbn,
			language: this.language,
			pages: parseInt(this.pages)
		}

		try {
			await saveBook(data)
			// toast.success("Product saved!", { id: toastId });

			// setTimeout(() => {
			//     if (!props.redirect) return;

			//     navigate(props.redirect);
			// }, 1500);
		} catch (err) {
			console.error('Failed to create book:', err)
			// alert("Error creating product");
			// toast.error("Product could not save!", { id: toastId });
			throw new Error('Book could not save!')
		}

		this.reset()
		return true
	}

	async saveGiftCardProduct(productId: number) {
		const data: any = {
			code: this.code,
			expiration: new Date(this.date),
			productId,
			value: Number(this.number)
		}

		try {
			await saveGiftCard(data)
			// toast.success("Product saved!", { id: toastId });

			// setTimeout(() => {
			//     if (!props.redirect) return;

			//     navigate(props.redirect);
			// }, 1500);
		} catch (err) {
			console.error('Failed to create gift card:', err)
			// alert("Error creating product");
			// toast.error("Product could not save!", { id: toastId });
			throw new Error('Gift card could not save!')
		}
		this.reset()
		return true
	}

	setField(key: string, value: string) {
		// @ts-ignore
		this[key] = value
	}

	// getField(key:string) {
	//     // @ts-ignore
	//     return this[key]
	// }
}

const productStore = new ProductStore()
export default productStore
