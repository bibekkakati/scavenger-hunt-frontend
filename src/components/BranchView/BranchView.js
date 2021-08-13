import React from "react";
import BranchCard from "../BranchCard/BranchCard";
import * as styles from "./BranchView.module.css";

export default function BranchView({ branches }) {
	return (
		<div className={styles.cards}>
			{branches.map((data, idx) => (
				<BranchCard key={idx} {...data} />
			))}
		</div>
	);
}
