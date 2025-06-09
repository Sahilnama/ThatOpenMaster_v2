import * as React from 'react'

interface Props {
    onChange: (value: string) => void;
    placeholder?: string;
}

 export function SearchBox(props: Props) {
    return(
        <div className="search-box" style={{display: "flex", alignItems: "center", width: "100%", maxWidth: "400px", backgroundColor: "var(--background-100)", borderRadius: "5px", padding: "5px", border: "1px solid var(--background-200)"}}>
            <span style={{ margin: 2 }}className="material-symbols-outlined">search</span>
            <input 
            onChange = {(e)=>{props.onChange(e.target.value.toLowerCase())}}
            type="text" 
            placeholder= {props.placeholder || "Search..." }
            style={{width: "100%", 
            height: "20px", 
            backgroundColor:"var(--background-100)"}}/>
            
        </div>
    )
 }