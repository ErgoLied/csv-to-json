module.exports = {
    normPhone: (phone) => '+38'+phone.replace(/[^0-9]/g, ''),

    normDate: (date) => {
        const dateArr = date.split('/');
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    },

    normCostCenterNum: (cc) => cc.replace(/^ACN/, '')
};
