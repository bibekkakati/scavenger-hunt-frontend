import { get } from "../apiClient";

const searchBranchByPincode = (pincode) => {
	return get(`/branch/search?pincode=${pincode}`);
};

const getAllBranches = () => {
	return get(`/branch/all`);
};

const getBranchDetails = () => {
	return get(`/branch/details`);
};

const BranchManager = {
	searchBranchByPincode,
	getAllBranches,
	getBranchDetails,
};

export default BranchManager;
