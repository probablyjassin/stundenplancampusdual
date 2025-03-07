import { ref } from "vue";

const baseCampusURL = "https://selfservice.campus-dual.de";
const baseCorsUrl = "https://corsproxy.io/?";

export function useCampus() {
	const username = useCookie("username");
	const password = useCookie("password");

	async function getCampusData(type: "room" | "timeline" | "credits" | "semester" |  "exams") {

		switch (type) {
			case "room":
				var urlPath = "/room/json"; // userid
				break;
			case "timeline":
				var urlPath = "/dash/gettimeline"; // user
				break;
			case "credits":
				var urlPath = "/dash/getcp"; // user
				break;
			case "semester":
				var urlPath = "/dash/getfs"; // user
				break;
			case "exams":
				var urlPath = "/dash/getexamstats" // user
				break;

			default:
				throw new Error("Invalid type");
		}

		const UrlParams = `?${type == 'room' ? 'userid' : 'user'}=${username.value}&hash=${password.value}&t=${Math.floor(Date.now() / 1000)}&_=${Date.now()}`;

		const url = baseCorsUrl + encodeURIComponent(baseCampusURL + urlPath + UrlParams);
		console.log(baseCampusURL + urlPath + UrlParams)
		return await $fetch(url);
	}

	return {
		username,
		password,
		getCampusData,
	};
}
