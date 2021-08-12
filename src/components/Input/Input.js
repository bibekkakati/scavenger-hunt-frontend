import React from "react";
import * as styles from "./Input.module.css";

export default function Input({ value, onChange, placeholder = "" }) {
	return (
		<input
			className={styles.inputBox}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			spellCheck={false}
		/>
	);
}
