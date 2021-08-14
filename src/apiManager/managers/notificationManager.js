import { get, post } from "../apiClient";

const getAllNotifications = () => {
	return get(`/notification/all`);
};

const getNotificationCount = () => {
	return get(`/notification/count`);
};

const markNotificationAsRead = (id) => {
	return post(`/notification/markread/${id}`);
};

const NotificationManager = {
	getAllNotifications,
	markNotificationAsRead,
	getNotificationCount,
};

export default NotificationManager;
