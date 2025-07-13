import Link from 'next/link'

interface BreadcrumbProps {
	pageName: string

	paths: {
		link?: string
		label: string
	}[]
}

const Breadcrumb = ({ pageName, paths }: BreadcrumbProps) => {
	return (
		<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
				{pageName}
			</h2>

			<nav>
				<ol className="flex items-center gap-2">
					{paths.map((each, i) => (
						<li key={i}>
							{each.link ? (
								<Link className="font-medium text-primary" href={each.link}>
									{each.label}
								</Link>
							) : (
								each.label
							)}
							{i === paths.length - 1 ? '' : '/'}
						</li>
					))}
				</ol>
			</nav>
		</div>
	)
}

export default Breadcrumb
