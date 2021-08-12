import React from "react";
import * as styles from "./BranchCard.module.css";

export default function BranchCard({
	branchid,
	branchname,
	address,
	city,
	contact,
	inchargename,
	institutionname,
}) {
	// contact = contact && contact.split(",");
	contact = ["8876058567", "6000173710", "9876524130", "124578993"];
	return (
		<div className={styles.main}>
			<div className={styles.sectionOne}>
				<p className={styles.branchid}>Branch #{branchid}</p>
				<p className={styles.branchname}>{branchname}</p>
			</div>
			<div className={styles.sectionTwo}>
				<p className={styles.address}>
					<span className={styles.label}>Address:</span> {address}
				</p>
				<p className={styles.city}>
					<span className={styles.label}>City:</span> {city}
				</p>
			</div>
			<div className={styles.sectionThree}>
				<p className={styles.inchargename}>
					<span className={styles.label}>In-Charge:</span>{" "}
					{inchargename}
				</p>
				<p className={styles.institutionname}>
					<span className={styles.label}>Institution:</span>{" "}
					{institutionname}
				</p>
			</div>
			{contact && (
				<div className={styles.contacts}>
					{contact.map((number, idx) => (
						<p key={idx} className={styles.number}>
							{number}
						</p>
					))}
				</div>
			)}
		</div>
	);
}
