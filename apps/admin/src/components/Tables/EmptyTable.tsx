import { Button } from '../ui-elements/button'
import { FileText, Plus } from 'lucide-react'

interface EmptyRowProps {
    message?: string
    actionText?: string;
    description?: string;
    onAction?: () => void
    colSpan?: number
}

export default function EmptyRow({
    message = 'No items found',
    actionText = 'Add New Entry',
    description = "Get started by adding a new entry to populate this table.",
    onAction,
    colSpan = 1
}: EmptyRowProps) {
    return (
        <div className="mx-auto flex flex-col items-center justify-center space-y-4 my-5">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{message}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>

            {onAction && (
                <Button onClick={onAction} className="mt-2" label="">
                    <Plus className="mr-2 h-4 w-4" />
                    {actionText}
                </Button>
            )}
        </div>
    )
}
