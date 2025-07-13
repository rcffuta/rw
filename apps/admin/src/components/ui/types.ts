import { ReactNode } from "react"

export type TableRowItem = {
	label: ReactNode;
	side?: 'left' | 'right'
	className?: string
}
