'use client';
import Link from "next/link";
import React, { FC, useState , KeyboardEvent} from "react";
import { useRouter } from "next/navigation";

const Navbar:FC = () => {
    const [querySearch, setQuerySearch] = useState<string>('')
    const router = useRouter();
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && querySearch.trim() !== ''){
            setQuerySearch('')
            router.push(`/search?query=${querySearch}`)
        }
    }
    return (
        <header>
            <div className="navbar container">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">Marvel App</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                        <summary>
                            Parent
                        </summary>
                        <ul className="p-2 bg-base-100">
                            <li><a>Link 1</a></li>
                            <li><a>Link 2</a></li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </div>
            </div>
        </header>
    )
};

export default Navbar;