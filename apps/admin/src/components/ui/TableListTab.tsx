import Link from "next/link";
import { DotIcon } from "../Icons";

interface Props {
  pageName: string;
  createLink: string;
  createLinkLabel: string;
}

export default function TableListTab({ pageName, createLink, createLinkLabel }: Props) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    <li className="font-medium text-primary">
                        <Link className="font-medium" href={createLink}>
                            {createLinkLabel}
                        </Link>
                    </li>
                    <li>
                        <DotIcon />
                    </li>
                    <li className="font-medium text-primary">
                        <Link className="font-medium" href="#">
                            Refresh
                        </Link>
                    </li>
                </ol>
            </nav>
        </div>
    );
};
