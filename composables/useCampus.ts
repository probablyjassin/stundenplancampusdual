import { ref } from 'vue';

const baseCampusURL = "https://selfservice.campus-dual.de"
const baseCorsUrl = "https://corsproxy.io/?"

export function useCampus() {
    const username = useCookie("username");
    const password = useCookie("password");

    async function getCampusData(type: 'room' | 'timeline' | 'credits' | 'semester') {

        const UrlParams = `?userid=${username.value}&hash=${password.value}&t=${Math.floor(Date.now() / 1000)}&_=${Date.now()}`

        switch (type) {

            case 'room':
                var urlPath = "/room/json"
                break;
            case 'timeline':
                var urlPath = "/dash/gettimeline"
                break;
            case 'credits':
                var urlPath = "/dash/getcp"
                break;
            case 'semester':
                var urlPath = "/dash/getfs"
                break;

            default:
                throw new Error('Invalid type');
        }

        const url = baseCorsUrl + encodeURIComponent(baseCampusURL + urlPath + UrlParams)

        return await $fetch(url);
    }

    return {
        username,
        password,
        getCampusData
    };
}