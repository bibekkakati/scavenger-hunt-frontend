import React, { useCallback, useEffect, useState } from "react";
import NotificationManager from "../../apiManager/managers/notificationManager";
import socket from "../../socketManager/socketClient";
import * as styles from "./NotificationPanel.module.css";

const NavTitles = {
	unreads: "Unreads",
	reads: "Reads",
};

export default function NotificationPanel() {
	const [navTitle, setNavTitle] = useState(NavTitles.unreads);
	const [data, setData] = useState({
		reads: {},
		unreads: {},
	});

	const getAllNotifications = useCallback(async () => {
		const [response, error] =
			await NotificationManager.getAllNotifications();
		if (error) return alert(error);
		if (response && response.success) {
			const readsList = response.data.reads;
			const unreadsList = response.data.unreads;
			const reads = {};
			const unreads = {};
			for (let i = 0; i < readsList.length; i++) {
				reads[readsList[i].id] = readsList[i];
			}
			for (let i = 0; i < unreadsList.length; i++) {
				unreads[unreadsList[i].id] = unreadsList[i];
			}
			setData({ reads, unreads });
		}
	}, []);

	const invokeCountListener = useCallback(() => {
		socket.on("notification:message", (message) => {
			const { reads, unreads } = data;
			unreads[message.id] = message;
			setData({ reads, unreads });
		});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAllNotifications();
	}, [getAllNotifications]);

	useEffect(() => {
		invokeCountListener();
	}, [invokeCountListener]);

	const handleMarkAsRead = async (id) => {
		const [response, error] =
			await NotificationManager.markNotificationAsRead(id);
		if (error) return alert(error);
		if (response && response.success) {
			const { reads, unreads } = data;
			const v = unreads[id];
			if (v) reads[id] = v;
			delete unreads[id];
			return setData({ reads, unreads });
		}
		return alert(response?.message || "Couldn't mark it as read");
	};

	const viewMessages = () => {
		const li =
			navTitle === NavTitles.unreads
				? Object.values(data.unreads)
				: Object.values(data.reads);
		if (li.length === 0)
			return <p className={styles.info}>No notifications found</p>;
		return li.map(({ message, id }) => (
			<div key={id} className={styles.message}>
				{message}
				{navTitle === NavTitles.unreads ? (
					<button
						className={styles.markBtn}
						onClick={() => handleMarkAsRead(id)}
					>
						Mark as read
					</button>
				) : null}
			</div>
		));
	};

	return (
		<div className={styles.notificationpanel}>
			<div className={styles.navs}>
				<button
					className={styles.navTitle}
					data-active={navTitle === NavTitles.unreads}
					onClick={() => setNavTitle(NavTitles.unreads)}
				>
					Unreads
				</button>
				<button
					className={styles.navTitle}
					data-active={navTitle === NavTitles.reads}
					onClick={() => setNavTitle(NavTitles.reads)}
				>
					Past
				</button>
			</div>
			<div className={styles.messages}>{viewMessages()}</div>
		</div>
	);
}
