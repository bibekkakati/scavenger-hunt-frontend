import { get, post } from "../apiClient";

const getAllNotifications = () => {
	return get(`/notification/all`);
};

const markNotificationAsRead = (id) => {
	return post(`/notification/markread/${id}`);
};

const NotificationManager = {
	getAllNotifications,
	markNotificationAsRead,
};

export default NotificationManager;
