import React, { useCallback, useEffect, useRef, useState } from "react";
import BranchManager from "../apiManager/managers/branchManager";
import BranchView from "../components/BranchView/BranchView";
import Layout from "../components/Layout/Layout";
import NotificationPanel from "../components/NotificationPanel/NotificationPanel";
import Roles from "../constants/Roles";
import user from "../helpers/user";
import useOnClickOutside from "../hooks/useOnClickOutside";
import "../socketManager/socketClient";
import socket from "../socketManager/socketClient";
import * as styles from "../styles/DashboardPage.module.css";

export default function DashboardPage() {
	const isAdmin = user.getUserRole() === Roles.admin;
	const notificationIconRef = useRef(null);
	const panelRef = useRef(null);
	const [branches, setBranches] = useState([]);
	const [count, setCount] = useState(0);
	const [showNotificationPanel, setNotificationPanel] = useState(false);

	const fetchData = useCallback(async () => {
		const request = isAdmin
			? BranchManager.getAllBranches
			: BranchManager.getBranchDetails;
		const [response, error] = await request();
		if (error) return alert(error);
		if (response && response.success) {
			return setBranches(response.data);
		}
	}, [isAdmin]);

	socket.on("notification:count", (count) => {
		setCount(count);
	});

	useEffect(() => {
		fetchData();
		notificationIconRef.current.onclick = handleNotificationPanel;
	}, [fetchData]);

	const handleNotificationPanel = () => {
		setNotificationPanel((val) => !val);
	};

	const handleLogout = () => {
		user.logoutUser();
	};

	useOnClickOutside(panelRef, () => setNotificationPanel(false));

	return (
		<Layout>
			<div className={styles.main}>
				<header className={styles.header}>
					<p className={styles.heading}>
						{isAdmin ? "All Branches" : "Branch Details"}
					</p>
					<div ref={panelRef} className={styles.actions}>
						<div className={styles.notification}>
							{count ? (
								<p className={styles.count}>{count}</p>
							) : null}
							{showNotificationPanel && <NotificationPanel />}
							<img
								ref={notificationIconRef}
								src="/images/bell.png"
								alt="Notification"
								height="24"
							/>
						</div>
						<button
							className={styles.logout}
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</header>
				<BranchView branches={branches} />
			</div>
		</Layout>
	);
}
