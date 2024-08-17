import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") {
            toast.error("Please enter a search query");
            return;
        }
        onSubmit(query);
        setQuery("");
    };

    return (
        <header >
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.inputField}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};

export default SearchBar;
