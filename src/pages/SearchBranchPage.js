import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BranchManager from "../apiManager/managers/branchManager";
import BranchView from "../components/BranchView/BranchView";
import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import * as styles from "../styles/SearchBranchPage.module.css";

function SearchBranchPage(props) {
	const history = useHistory();
	const params = new URLSearchParams(props.location.search);
	const pincode = params.get("pincode");

	const [pincodeInput, setPincodeInput] = useState(pincode || "");
	const [branches, setBranches] = useState([]);

	const getBranches = useCallback(async () => {
		if (pincode) {
			setBranches([]);
			const [response, error] = await BranchManager.searchBranchByPincode(
				pincode
			);
			if (error) return error;
			if (response && response.success) {
				const data = response.data;
				return setBranches(data);
			}
			return alert(`We are not serving in the pincode ${pincode}`);
		}
	}, [pincode]);

	useEffect(() => {
		getBranches();
	}, [getBranches]);

	const handlePincodeInput = (e) => {
		let val = e.target.value;
		if (val === "") return setPincodeInput(val);
		try {
			val = parseInt(val);
			if (!isNaN(val) && val > 0 && val < 999999)
				return setPincodeInput(val);
		} catch (error) {
			return error;
		}
	};

	const onSearch = () => {
		if (pincodeInput) {
			history.push(`/search?pincode=${pincodeInput}`);
		}
	};

	return (
		<Layout>
			<div className={styles.main}>
				<img
					src="/images/hero.png"
					alt="Hero"
					className={styles.heroImg}
				/>
				<div className={styles.searchPanel}>
					<Link to="/login" className={styles.loginBtn}>
						Login
					</Link>

					<p className={styles.heading}>Search Branch By Pincode</p>
					<div className={styles.searchBox}>
						<input
							className={styles.inputBox}
							value={pincodeInput}
							onChange={handlePincodeInput}
							spellCheck={false}
							placeholder="210054"
						/>
						<Button label="Search" onClick={onSearch} />
					</div>
					{branches.length ? (
						<BranchView branches={branches} />
					) : null}
				</div>
			</div>
		</Layout>
	);
}

export default SearchBranchPage;
