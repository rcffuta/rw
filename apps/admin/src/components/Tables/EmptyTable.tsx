import { Button } from '../ui-elements/button'
import { TableRow, TableCell } from '../ui/table'
import { FileText, Plus } from 'lucide-react'

interface EmptyRowProps {
    message?: string
    actionText?: string
    onAction?: () => void
    colSpan?: number
}

export default function EmptyRow({
    message = 'No items found',
    actionText = 'Add New Entry',
    onAction,
    colSpan = 1
}: EmptyRowProps) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell colSpan={colSpan} className="py-12 text-center">
                <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4">
                    <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                        <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>

                    <div className="space-y-2 text-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {message}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Get started by adding a new entry to populate this table.
                        </p>
                    </div>

                    {onAction && (
                        <Button onClick={onAction} className="mt-2" label=''>
                            <Plus className="mr-2 h-4 w-4" />
                            {actionText}
                        </Button>
                    )}
                </div>
            </TableCell>
        </TableRow>
    )
}
