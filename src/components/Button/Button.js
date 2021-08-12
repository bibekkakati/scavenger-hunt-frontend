import React from "react";
import * as styles from "./Button.module.css";

export default function Button({ label, onClick }) {
	return (
		<button className={styles.btn} onClick={onClick}>
			{label}
		</button>
	);
}
