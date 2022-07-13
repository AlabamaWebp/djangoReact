import React, { useState } from 'react'
export default function Search() {
    const [search, setSearch] = useState('')
    return (
        <div className="container">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for a contact"
                style={{ fontSize: 22 }}
                className="search"
            />
        </div>
    )
}
