import moment from "moment";
/**
 * Extracts the YouTube video ID from a given URL.
 * @param {string} url - The URL of the YouTube video.
 * @returns {string|boolean} - Returns the YouTube video ID if it exists, otherwise returns false.
 */
const ExportYoutubeId = (url) => {
    var regExp = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regExp);
    return match && match[1] && match[1].length == 11 ? match[1] : false;
};

/**
 * Formats a given date string into a human-readable format.
 *
 * Example:
 * Input: "2023-10-05T14:48:00.000Z"
 * Output: "Oct 5, 2023"
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string|null} - The formatted date string or null if the input is invalid.
 */
export const FormatDate = (date) => {
    try {
        let reg = /[a-z]/i;
        if (date) {
            let isAlreadyConverted = reg.test(date);
            date = GetUtcJsonDate(date);
            if (!isAlreadyConverted || date.includes("T")) {
                return moment(date).utcOffset(0, true).startOf("day").format("ll");
            }
            return date;
        }
        return null;
    } catch (error) {
        return null;
    }
};

/**
 * Takes a date string as input and returns it in UTC format starting from the start of the day.
 *
 * Example:
 * Input: "2022-01-01"
 * Output: "2022-01-01T00:00:00.000Z"
 *
 * @param {string} date - The date string to be converted.
 * @returns {string} - The date in UTC format.
 */
export const GetUtcJsonDate = (date) => {
    return moment(date).utcOffset(0, true).startOf("day").toJSON();
};

/**
 * Takes a date string as input and returns it in UTC format starting from the start of the day, but only the date part.
 *
 * Example:
 * Input: "2022-01-01"
 * Output: "2022-01-01"
 *
 * @param {string} date - The date string to be converted.
 * @returns {string} - The date in UTC format.
 */
export const GetUtcOnlyDate = (date) => {
    return moment(date).utcOffset(0, true).startOf("day").format("YYYY-MM-DD");
};

/**
 * Takes a date string as input and returns it in a specific format including the time. The time is in UTC.
 *
 * Example:
 * Input: "2022-01-01T00:00:00.000Z"
 * Output: "Jan 1, 2022 12:00 AM"
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date and time.
 */
export const GetUtcDateAndTime = (date) => {
    return moment(date).utcOffset(0, true).format("lll");
};

/**
 * Takes a date string as input and returns it in a specific format including the time.
 *
 * Example:
 * Input: "2022-01-01T00:00:00.000Z"
 * Output: "Jan 1, 2022 12:00 AM"
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date and time.
 */
export const GetDateAndTime = (date) => {
    return moment(date).utcOffset(0, true).format("lll");
};

/**
 * Takes a date string as input and returns a string representing how long ago that date is from the current date.
 *
 * Example:
 * Input: "2022-01-01T00:00:00.000Z"
 * Output: "2 days ago"
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date from now.
 */
export const GetDateFromNow = (date) => {
    const now = moment();
    const inputDate = moment.utc(date);
    const hoursDiff = now.diff(inputDate, "hours");

    if (hoursDiff <= 24) {
        return inputDate.fromNow();
    } else {
        return inputDate.format("lll");
    }
};

/**
 * Takes a start date and a number of weeks as input. It calculates the date of the next Saturday after the given number of weeks from the start date.
 * If the start date is not provided, it returns null.
 *
 * Example:
 * Input: "2022-01-01", 1
 * Output: "2022-01-08T00:00:00.000Z"
 *
 * @param {string} startDate - The start date.
 * @param {number} weeks - The number of weeks to add.
 * @returns {string|null} - The date of the next Saturday in UTC format or null if the start date is not provided.
 */
export const GetNextSaturdayByWeek = (startDate, weeks) => {
    if (!startDate) return null;
    let newDate = moment(startDate).utcOffset(0, true).startOf("day");
    newDate = newDate.add(weeks, "weeks");
    let day = newDate.day();
    if (day == 6) {
        newDate.day(6);
    } else {
        newDate.subtract(1, "weeks");
        newDate.day(6);
    }
    return GetUtcJsonDate(newDate);
};

/**
 * Example:
 * Input: "Hello, World! This is an Example!"
 * Output: "hello-world-this-is-an-example"
 *
 * @param {string} str - The text to be transformed into a URL-friendly slug.
 * @returns {string} - The URL-friendly slug.
 */
export const StringToSlug = (str) => {
    if (!str) return;
    str = str.replace(/^\s+|\s+$/g, "");

    str = str.toLowerCase();

    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñçşğ·/_,:;";
    var to = "aaaaaee-eeiiiioooo-uuuuncsg------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    return str;
};

/**
 * Example:
 * Input: "hello"
 * Output: "Hello"
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} - The capitalized string.
 */
export const StringToCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Filtering function suitable for use with vue-select or similar components.
 * Searches among the specified options and filters countries containing the search term.
 *
 * @param {Array} options - An array containing the countries to be filtered.
 * @param {String} search - The search term to filter countries.
 * @returns {Array} - An array containing the filtered countries.
 */
export const VSelectFilterPhoneCountry = (options, search) => {
    var keys = ["name", "countryCode"];
    var lowSearch = search.toLowerCase();
    return options.filter((country) => keys.some((key) => String(country[key]).toLowerCase().includes(lowSearch)));
};

/**
 * Asynchronously reads a file and returns its content as a binary string.
 *
 * Example:
 * Input: File object
 * Output: "binary string content of the file"
 *
 * @param {File} file - The file to be read.
 * @returns {Promise<string>} - A promise that resolves with the file content as a binary string.
 */
export const ReadFileAsync = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsBinaryString(file);
    });
};

/**
 * Creates a deep copy of the given object.
 *
 * Example:
 * Input: { a: 1, b: { c: 2 } }
 * Output: { a: 1, b: { c: 2 } }
 *
 * @param {Object} obj - The object to be deeply copied.
 * @returns {Object} - The deep copy of the object.
 */
export const DeepObjectCopy = (obj) => {
    let copy;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = DeepObjectCopy(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = DeepObjectCopy(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};

/**
 * This function compares two objects (prev and current) and returns the first difference it finds.
 * It performs a deep comparison, meaning it will traverse nested objects and arrays.
 *
 * @param {Object} prev - The previous state of the object.
 * @param {Object} current - The current state of the object.
 *
 * @returns {Object|null} An object containing the key and value of the first difference found, or null if no difference is found.
 */
export const FindDifference = (prev, current) => {
    for (let key in prev) {
        if (prev[key] instanceof Object && current[key] instanceof Object) {
            if (Array.isArray(prev[key])) {
                for (let i = 0; i < prev[key].length; i++) {
                    if (JSON.stringify(prev[key][i]) !== JSON.stringify(current[key][i])) {
                        return {field: key, value: current[key]};
                    }
                }
            } else if (prev[key] instanceof Date) {
                if (JSON.stringify(prev[key]) !== JSON.stringify(current[key])) {
                    return {field: key, value: current[key]};
                }
            } else {
                let diff = FindDifference(prev[key], current[key]);
                if (diff) {
                    return {field: key, value: diff};
                }
            }
        } else if (prev[key] !== current[key]) {
            return {field: key, value: current[key]};
        }
    }
    return null;
};

/**
 * Filtering function suitable for use with vue-select or similar components.
 *
 * @param {Array} list - An array containing the list to be filtered.
 * @param {String} groupBy - which id will be groupped.
 * @param {String} nameBy - which field will be used as header.
 * Example:
 * SetGrouppedList(BranchList, "branchId", "name")
 * @returns {Array} - An array containing the filtered countries.
 */
export const SetGrouppedList = (list, groupBy, nameBy) => {
    const sortedList = list.sort((a, b) => a[groupBy] - b[groupBy]);
    const grouppedByListId = {};

    sortedList.forEach((item) => {
        const id = item[groupBy];
        if (!grouppedByListId[id]) {
            grouppedByListId[id] = [];
        }
        grouppedByListId[id].push({
            ...item,
            header: item[nameBy],
        });
    });

    const actualOutput = Object.values(grouppedByListId);
    const newListWithHeader = [];

    actualOutput.forEach((group) => {
        const headers = group.filter((item) => item.header != null);

        if (headers.length > 0) {
            const headerOne = {
                header: headers[0].header,
            };
            newListWithHeader.push(headerOne);
        }
        group.forEach((item) => {
            item.header = null;
            newListWithHeader.push(item);
        });
    });

    return newListWithHeader;
};

const CustomDateFunctions = {
    install(app) {
        app.config.globalProperties.$FormatDate = FormatDate;
        app.config.globalProperties.$GetUtcJsonDate = GetUtcJsonDate;
        app.config.globalProperties.$GetUtcOnlyDate = GetUtcOnlyDate;
        app.config.globalProperties.$GetUtcDateAndTime = GetUtcDateAndTime;
        app.config.globalProperties.$GetDateAndTime = GetDateAndTime;
        app.config.globalProperties.$GetDateFromNow = GetDateFromNow;
        app.config.globalProperties.$GetNextSaturdayByWeek = GetNextSaturdayByWeek;
        app.config.globalProperties.$StringToSlug = StringToSlug;
        app.config.globalProperties.$StringToCapitalize = StringToCapitalize;
        app.config.globalProperties.$VSelectFilterPhoneCountry = VSelectFilterPhoneCountry;
        app.config.globalProperties.$ReadFileAsync = ReadFileAsync;
        app.config.globalProperties.$ExportYoutubeId = ExportYoutubeId;
        app.config.globalProperties.$DeepObjectCopy = DeepObjectCopy;
        app.config.globalProperties.$FindDifference = FindDifference;
        app.config.globalProperties.$SetGrouppedList = SetGrouppedList;
    },
};

export default CustomDateFunctions;
