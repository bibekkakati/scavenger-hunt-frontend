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

	socket.on("notification:message", (message) => {
		const messages = { ...data };
		messages.unreads[message.id] = message;
		setData(messages);
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

	useEffect(() => {
		getAllNotifications();
	}, [getAllNotifications]);

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

		const start = li.length - 1;
		const messages = [];
		for (let i = start; i >= 0; i--) {
			const { message, id, timestamp } = li[i];
			let date = new Date(parseInt(timestamp)).toLocaleDateString();
			let time = new Date(parseInt(timestamp)).toLocaleTimeString();
			messages.push(
				<div key={id} className={styles.message}>
					{message}
					<p className={styles.dt}>
						Time: {time} | Date: {date}
					</p>
					{navTitle === NavTitles.unreads ? (
						<button
							className={styles.markBtn}
							onClick={() => handleMarkAsRead(id)}
						>
							Mark as read
						</button>
					) : null}
				</div>
			);
		}
		return messages;
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
