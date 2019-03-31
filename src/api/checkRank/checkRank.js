import api from "@/libs/api.request";

const baseUrl = "/data-ranking-service/ranking";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 查排名历史记录
export const getResultInfo = ({date, id,keyWord, pageSize, pageNum}) => {
    return post("/result/list/detail", {
        date, id,
        keyWord,
        pageSize,
        pageNum
    });
};
// 查排名列表
export const getResultList = ({companysixiid, billtype}) => {
    return post("/result/list", {
        companysixiid,
        billtype
    });
};
